import Foundation
import StoreKit

@MainActor
public final class RoomAIStoreKitManager: ObservableObject {
    @Published public private(set) var products: [Product] = []
    @Published public private(set) var entitlements: Set<String> = []
    @Published public private(set) var purchaseState: PurchaseState = .idle

    public enum PurchaseState: String { case idle, loading, pending, purchased, failed, cancelled, restored }
    private var updatesTask: Task<Void, Never>?

    public init() {
        updatesTask = Task { await self.listenForTransactions() }
    }

    deinit { updatesTask?.cancel() }

    public func loadProducts(ids: [String]) async throws {
        products = try await Product.products(for: ids)
        products.sort { $0.id < $1.id }
        await refreshEntitlements()
    }

    public func purchase(productID: String, appUserID: String? = nil) async -> PurchaseState {
        purchaseState = .loading
        guard let product = products.first(where: { $0.id == productID }) else {
            purchaseState = .failed
            return purchaseState
        }
        do {
            var options = Set<Product.PurchaseOption>()
            if let appUserID, !appUserID.isEmpty {
                options.insert(.appAccountToken(UUID(uuidString: appUserID) ?? UUID()))
            }
            let result = try await product.purchase(options: options)
            switch result {
            case .success(let verification):
                switch verification {
                case .verified(let transaction):
                    entitlements.insert(transaction.productID)
                    await transaction.finish()
                    purchaseState = .purchased
                case .unverified:
                    purchaseState = .failed
                }
            case .userCancelled:
                purchaseState = .cancelled
            case .pending:
                purchaseState = .pending
            @unknown default:
                purchaseState = .failed
            }
        } catch {
            purchaseState = .failed
        }
        return purchaseState
    }

    public func refreshEntitlements() async {
        var next = Set<String>()
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result {
                next.insert(transaction.productID)
            }
        }
        entitlements = next
    }

    public func restorePurchases() async {
        purchaseState = .loading
        do {
            try await AppStore.sync()
            await refreshEntitlements()
            purchaseState = .restored
        } catch {
            purchaseState = .failed
        }
    }

    public func hasEntitlement(_ productID: String) -> Bool { entitlements.contains(productID) }

    private func listenForTransactions() async {
        for await result in Transaction.updates {
            guard case .verified(let transaction) = result else { continue }
            entitlements.insert(transaction.productID)
            await transaction.finish()
        }
    }
}
