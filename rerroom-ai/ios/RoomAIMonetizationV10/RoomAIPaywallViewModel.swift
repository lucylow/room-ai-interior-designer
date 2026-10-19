import Foundation
import StoreKit

struct RoomAIPaywallPlan: Identifiable {
    let id: String
    let title: String
    let subtitle: String
    let price: String
    let badge: String?
    let featureHighlights: [String]
}

@MainActor
final class RoomAIPaywallViewModel: ObservableObject {
    @Published private(set) var plans: [RoomAIPaywallPlan] = []
    @Published private(set) var selectedProductID: String?

    func build(from products: [Product], featuredProductID: String?) {
        let sorted = products.sorted { lhs, rhs in
            rank(lhs.id) < rank(rhs.id)
        }
        plans = sorted.map { product in
            let isFeatured = product.id == featuredProductID
            return RoomAIPaywallPlan(
                id: product.id,
                title: product.displayName,
                subtitle: product.description,
                price: product.displayPrice,
                badge: isFeatured ? "Recommended" : nil,
                featureHighlights: highlights(for: product.id)
            )
        }
        selectedProductID = featuredProductID ?? plans.first?.id
    }

    private func rank(_ id: String) -> Int {
        if id.contains("pro.yearly") { return 1 }
        if id.contains("pro.monthly") { return 2 }
        if id.contains("plus.yearly") { return 3 }
        if id.contains("plus.monthly") { return 4 }
        if id.contains("studio") { return 5 }
        return 10
    }

    private func highlights(for id: String) -> [String] {
        if id.contains("studio") {
            return ["CAD/BIM workflows", "3DGS capture", "Unlimited projects", "Commercial workflow"]
        }
        if id.contains("pro") {
            return ["Advanced AI", "HD rendering", "3DGS tools", "Project exports"]
        }
        if id.contains("plus") {
            return ["More AI generations", "Design templates", "Retail shopping"]
        }
        return ["Flexible add-on"]
    }
}
