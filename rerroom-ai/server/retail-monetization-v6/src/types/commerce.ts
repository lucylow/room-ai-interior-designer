export type Currency = 'CAD' | 'USD';
export type FulfillmentMethod = 'ship' | 'pickup' | 'retailer_checkout';
export type PaymentMethod = 'card' | 'wallet' | 'provider_checkout' | 'demo';
export type CartLineSource = 'ai_concept' | 'manual' | 'room_set' | 'replacement';
export type OrderStatus = 'draft' | 'pending_payment' | 'paid' | 'processing' | 'shipped' | 'ready_for_pickup' | 'completed' | 'cancelled' | 'refunded' | 'failed';
export type Provider = 'shopify' | 'stripe' | 'affiliate' | 'demo';
export interface Money { amount: number; currency: Currency; }
export interface ProductVariant { id: string; sku: string; title: string; price: Money; widthM: number; depthM: number; heightM: number; available: boolean; inventory: number; url?: string; }
export interface CommerceProduct { id: string; retailer: string; handle: string; title: string; category: string; tags: string[]; styleTags: string[]; colors: string[]; materialTags: string[]; variants: ProductVariant[]; imageUrl?: string; sourceUpdatedAt: string; }
export interface CartLine { id: string; variantId: string; productId: string; title: string; quantity: number; unitPrice: Money; source: CartLineSource; conceptId?: string; roomId?: string; placementId?: string; projectId?: string; inventoryAtAdd?: number; commissionEligible: boolean; affiliateRate?: number; }
export interface Discount { code: string; amount: Money; description: string; }
export interface ShippingQuote { method: FulfillmentMethod; amount: Money; etaDays: number; label: string; }
export interface TaxQuote { jurisdiction: string; amount: Money; rate: number; }
export interface CartTotals { subtotal: Money; discount: Money; shipping: Money; tax: Money; total: Money; commissionEstimate: Money; }
export interface CommerceCart { id: string; userId: string; projectId?: string; currency: Currency; lines: CartLine[]; discount?: Discount; shippingQuote?: ShippingQuote; taxQuote?: TaxQuote; totals: CartTotals; budgetCap?: Money; budgetHeadroom: Money; version: number; status: 'open' | 'locked' | 'checkout_started' | 'converted' | 'abandoned'; updatedAt: string; }
export interface Address { line1: string; line2?: string; city: string; region: string; postalCode: string; country: string; }
export interface CheckoutRequest { cartId: string; provider: Provider; fulfillment: FulfillmentMethod; email?: string; shippingAddress?: Address; returnUrl: string; cancelUrl: string; idempotencyKey: string; }
export interface CheckoutSession { id: string; provider: Provider; cartId: string; checkoutUrl?: string; clientSecret?: string; status: 'open' | 'complete' | 'expired'; expiresAt: string; orderIntentId: string; }
export interface OrderIntent { id: string; cartId: string; userId: string; provider: Provider; expectedTotal: Money; currency: Currency; status: 'created' | 'checkout_created' | 'authorized' | 'paid' | 'failed' | 'cancelled'; idempotencyKey: string; createdAt: string; }
export interface CommerceOrder { id: string; orderIntentId: string; externalOrderId?: string; provider: Provider; status: OrderStatus; lines: CartLine[]; totals: CartTotals; customerEmail?: string; shippingAddress?: Address; createdAt: string; updatedAt: string; }
export interface WebhookEvent { id: string; provider: Provider; eventType: string; payload: unknown; receivedAt: string; verified: boolean; }
export interface AffiliateAttribution { sessionId: string; productId: string; retailer: string; source: string; campaign?: string; clickId: string; createdAt: string; }
export interface MonetizationEvent { id: string; type: 'product_view'|'try_in_room'|'add_to_cart'|'checkout_started'|'purchase'|'commission_recorded'|'affiliate_click'; userId?: string; projectId?: string; productId?: string; cartId?: string; orderId?: string; value?: Money; metadata: Record<string, string>; at: string; }
