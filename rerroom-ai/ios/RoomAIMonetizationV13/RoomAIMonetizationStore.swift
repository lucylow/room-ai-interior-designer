import Combine
import Foundation
import StoreKit
import UIKit

/// App-backend boundary. Implementations must verify Apple's signed transaction on the server,
/// deduplicate by transaction ID, and durably deliver consumables before returning true.
@MainActor
protocol RoomAIMonetizationServerBridge: AnyObject {
    func processVerifiedTransaction(jws: String, transactionID: String, productID: String) async throws -> Bool
    func reconcileEntitlement(jws: String, productID: String) async throws -> Bool
}

@MainActor
final class RoomAIMonetizationStore: ObservableObject {
    enum PurchaseOutcome: Equatable {
        case delivered
        case cancelled
        case pending
        case unavailable
    }

    @Published private(set) var products: [Product] = []
    @Published private(set) var entitledProductIDs: Set<String> = []
    @Published private(set) var lastErrorCode: String?
    @Published private(set) var isLoading = false

    private let server: any RoomAIMonetizationServerBridge
    private let productIDs: Set<String> = [
        "com.reroom.ai.plus.monthly",
        "com.reroom.ai.plus.yearly",
        "com.reroom.ai.pro.monthly",
        "com.reroom.ai.pro.yearly",
        "com.reroom.ai.studio.monthly",
        "com.reroom.ai.studio.yearly",
        "com.reroom.ai.generation.credits.25",
        "com.reroom.ai.credits.100",
        "com.reroom.ai.credits.500",
        "com.reroom.ai.render.credits.10",
        "com.reroom.ai.render.credits.50",
        "com.reroom.ai.cad.export",
        "com.reroom.ai.commercial",
        "com.reroom.ai.export.pack",
        "com.reroom.ai.pro.templates",
        "com.reroom.ai.3dgs.capture.unlock",
        "com.reroom.ai.virtual.tour.unlock"
    ]
    private var updatesTask: Task<Void, Never>?

    init(server: any RoomAIMonetizationServerBridge) {
        self.server = server
    }

    func start() async {
        guard updatesTask == nil else { return }
        updatesTask = Task { [weak self] in
            for await verification in Transaction.updates {
                guard !Task.isCancelled, let self else { return }
                await self.process(verification)
            }
        }
        await loadProducts()
        await processUnfinishedTransactions()
        await refreshEntitlements()
    }

    func stop() {
        updatesTask?.cancel()
        updatesTask = nil
    }

    func loadProducts() async {
        isLoading = true
        defer { isLoading = false }
        do {
            products = try await Product.products(for: productIDs).sorted {
                $0.displayName.localizedStandardCompare($1.displayName) == .orderedAscending
            }
            lastErrorCode = nil
        } catch {
            lastErrorCode = "product_load_failed"
        }
    }

    func purchase(_ product: Product, appAccountToken: UUID? = nil) async -> PurchaseOutcome {
        guard productIDs.contains(product.id) else {
            lastErrorCode = "unknown_product"
            return .unavailable
        }
        do {
            let result = try await product.purchase(options: appAccountToken.map { [.appAccountToken($0)] } ?? [])
            switch result {
            case .success(let verification):
                return await process(verification) ? .delivered : .unavailable
            case .userCancelled:
                return .cancelled
            case .pending:
                return .pending
            @unknown default:
                lastErrorCode = "unknown_purchase_result"
                return .unavailable
            }
        } catch {
            lastErrorCode = "purchase_failed"
            return .unavailable
        }
    }

    /// Restoring is a StoreKit sync followed by a fresh entitlement reconciliation, not a local grant.
    func restorePurchases() async -> Bool {
        do {
            try await AppStore.sync()
            await refreshEntitlements()
            return lastErrorCode == nil
        } catch {
            lastErrorCode = "restore_failed"
            return false
        }
    }

    func refreshEntitlements() async {
        var reconciled = Set<String>()
        var sawUnverifiedTransaction = false
        for await verification in Transaction.currentEntitlements {
            guard case .verified(let transaction) = verification else {
                sawUnverifiedTransaction = true
                continue
            }
            do {
                if try await server.reconcileEntitlement(jws: verification.jwsRepresentation, productID: transaction.productID) {
                    reconciled.insert(transaction.productID)
                }
            } catch {
                lastErrorCode = "entitlement_sync_failed"
                return
            }
        }
        entitledProductIDs = reconciled
        lastErrorCode = sawUnverifiedTransaction ? "unverified_entitlement" : nil
    }

    /// StoreKit marks transactions finished only after the server has durably reconciled/delivered them.
    @discardableResult
    private func process(_ verification: VerificationResult<Transaction>) async -> Bool {
        guard case .verified(let transaction) = verification else {
            lastErrorCode = "unverified_transaction"
            return false
        }
        do {
            let acknowledged = try await server.processVerifiedTransaction(
                jws: verification.jwsRepresentation,
                transactionID: String(transaction.id),
                productID: transaction.productID
            )
            guard acknowledged else {
                lastErrorCode = "server_acknowledgement_missing"
                return false
            }
            await transaction.finish()
            if transaction.productType != .consumable {
                if transaction.revocationDate != nil || (transaction.expirationDate.map { $0 <= Date() } ?? false) {
                    entitledProductIDs.remove(transaction.productID)
                } else {
                    entitledProductIDs.insert(transaction.productID)
                }
            }
            lastErrorCode = nil
            return true
        } catch {
            // Leave the transaction unfinished so StoreKit can redeliver it after a retry.
            lastErrorCode = "transaction_sync_failed"
            return false
        }
    }

    private func processUnfinishedTransactions() async {
        for await verification in Transaction.unfinished {
            guard !Task.isCancelled else { return }
            _ = await process(verification)
        }
    }

    func manageSubscriptions(in scene: UIWindowScene) async -> Bool {
        do {
            try await AppStore.showManageSubscriptions(in: scene)
            return true
        } catch {
            lastErrorCode = "manage_subscriptions_failed"
            return false
        }
    }

    func requestRefund(for transaction: Transaction, in scene: UIWindowScene) async -> Transaction.RefundRequestStatus? {
        do {
            return try await transaction.beginRefundRequest(in: scene)
        } catch {
            lastErrorCode = "refund_request_failed"
            return nil
        }
    }
}
