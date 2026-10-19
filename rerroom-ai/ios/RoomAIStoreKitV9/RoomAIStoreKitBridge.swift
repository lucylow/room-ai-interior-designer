import Foundation
import StoreKit

public struct RoomAIProductDTO: Codable {
    public let id: String
    public let displayName: String
    public let description: String
    public let price: String
    public let currencyCode: String
    public let kind: String
}

@MainActor
public final class RoomAIStoreKitBridge {
    private let manager = RoomAIStoreKitManager()
    private let decoder = JSONDecoder()

    public init() {}

    public func productDTOs(ids: [String]) async throws -> [RoomAIProductDTO] {
        try await manager.loadProducts(ids: ids)
        return manager.products.map {
            RoomAIProductDTO(id: $0.id, displayName: $0.displayName, description: $0.description, price: $0.displayPrice, currencyCode: $0.priceFormatStyle.currencyCode, kind: Self.kind(of: $0))
        }
    }

    public func purchase(productID: String) async -> String { await manager.purchase(productID: productID).rawValue }
    public func restore() async -> [String] { await manager.restorePurchases(); return Array(manager.entitlements).sorted() }
    public func entitlements() -> [String] { Array(manager.entitlements).sorted() }

    private static func kind(of product: Product) -> String {
        switch product.type { case .autoRenewable: return "auto-renewable"; case .nonConsumable: return "non-consumable"; case .consumable: return "consumable"; case .nonRenewable: return "non-renewing"; @unknown default: return "unknown" }
    }
}
