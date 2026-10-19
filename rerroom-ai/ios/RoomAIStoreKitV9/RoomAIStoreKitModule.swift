import ExpoModulesCore
import StoreKit

public class RoomAIStoreKitModule: Module {
    private lazy var bridge = RoomAIStoreKitBridge()

    public func definition() -> ModuleDefinition {
        Name("RoomAIStoreKit")

        AsyncFunction("loadProducts") { (ids: [String]) async throws -> [[String: String]] in
            try await bridge.productDTOs(ids: ids).map { product in
                ["id": product.id, "displayName": product.displayName, "description": product.description, "price": product.price, "currencyCode": product.currencyCode, "kind": product.kind]
            }
        }

        AsyncFunction("purchase") { (productID: String) async -> String in
            await bridge.purchase(productID: productID)
        }

        AsyncFunction("restore") { () async -> [String] in
            await bridge.restore()
        }

        Function("entitlements") { bridge.entitlements() }
    }
}
