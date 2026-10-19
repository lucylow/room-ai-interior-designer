import Foundation
import StoreKit

@MainActor
final class RoomAIMonetizationStore: ObservableObject {
    @Published private(set) var products: [Product] = []
    @Published private(set) var purchasedProductIDs: Set<String> = []
    @Published private(set) var lastError: String?
    @Published private(set) var isLoading = false

    private let productIDs: Set<String> = [
        "com.reroom.ai.plus.monthly",
        "com.reroom.ai.plus.yearly",
        "com.reroom.ai.pro.monthly",
        "com.reroom.ai.pro.yearly",
        "com.reroom.ai.studio.monthly",
        "com.reroom.ai.render.credits.10",
        "com.reroom.ai.render.credits.50",
        "com.reroom.ai.generation.credits.25",
        "com.reroom.ai.cad.export",
        "com.reroom.ai.commercial"
    ]

    private var updatesTask: Task<Void, Never>?

    func start() async {
        updatesTask?.cancel()
        updatesTask = Task { [weak self] in
            guard let self else { return }
            for await result in Transaction.updates {
                await self.handle(result)
            }
        }
        await refresh()
    }

    func refresh() async {
        isLoading = true
        defer { isLoading = false }
        do {
            products = try await Product.products(for: Array(productIDs))
            await refreshEntitlements()
            lastError = nil
        } catch {
            lastError = error.localizedDescription
        }
    }

    func purchase(_ product: Product) async -> Product.PurchaseResult? {
        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                await handle(verification)
                return result
            case .userCancelled:
                return result
            case .pending:
                return result
            @unknown default:
                return nil
            }
        } catch {
            lastError = error.localizedDescription
            return nil
        }
    }

    func restorePurchases() async {
        do {
            try await AppStore.sync()
            await refreshEntitlements()
        } catch {
            lastError = error.localizedDescription
        }
    }

    func hasEntitlement(_ productID: String) -> Bool {
        purchasedProductIDs.contains(productID)
    }

    private func refreshEntitlements() async {
        var ids = Set<String>()
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result {
                ids.insert(transaction.productID)
            }
        }
        purchasedProductIDs = ids
    }

    private func handle(_ verification: VerificationResult<Transaction>) async {
        switch verification {
        case .verified(let transaction):
            purchasedProductIDs.insert(transaction.productID)
            await transaction.finish()
        case .unverified(_, let error):
            lastError = error.localizedDescription
        }
    }
}
