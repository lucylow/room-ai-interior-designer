import type { CommerceCart, CommerceOrder, Money, ProductVariant, Provider, Address, CartTotals, CartLine } from '../types/commerce';

export type CheckoutMode = 'hosted' | 'embedded' | 'retailer_handoff' | 'wallet' | 'demo';
export type TransactionState = 'created'|'quoted'|'validated'|'checkout_ready'|'payment_pending'|'authorized'|'paid'|'failed'|'cancelled'|'refunded';
export type QuoteState = 'draft'|'fresh'|'stale'|'expired'|'invalid';
export type PaymentAttemptState = 'created'|'requires_action'|'processing'|'succeeded'|'failed'|'cancelled';
export type FraudDecision = 'allow'|'review'|'block';
export type ReturnState = 'requested'|'approved'|'label_ready'|'in_transit'|'received'|'refunded'|'rejected';
export type SubscriptionTier = 'free'|'studio'|'pro';
export type SubscriptionStatus = 'trialing'|'active'|'past_due'|'paused'|'cancelled';
export type RevenueEventType = 'platform_fee'|'affiliate_commission'|'subscription'|'designer_payout'|'refund'|'chargeback';
export type MerchantCapability = 'checkout'|'inventory'|'shipping'|'tax'|'pickup'|'returns'|'webhooks'|'affiliate';
export interface QuoteLine { lineId:string; variantId:string; unitAmount:number; quantity:number; lineTotal:number; currency:string; lockedUntil:string; }
export interface CommerceQuote { id:string; cartId:string; version:number; currency:string; state:QuoteState; lines:QuoteLine[]; subtotal:number; discount:number; shipping:number; tax:number; total:number; generatedAt:string; expiresAt:string; hash:string; }
export interface PaymentAttempt { id:string; orderIntentId:string; provider:Provider; amount:Money; state:PaymentAttemptState; attemptNumber:number; idempotencyKey:string; nextAction?:string; createdAt:string; updatedAt:string; }
export interface PaymentMethodToken { id:string; provider:Provider; type:'card'|'wallet'|'bank'; brand?:string; last4?:string; reusable:boolean; }
export interface Transaction { id:string; cartId:string; orderIntentId:string; quoteId:string; state:TransactionState; checkoutMode:CheckoutMode; total:Money; customerId:string; createdAt:string; updatedAt:string; }
export interface CheckoutContext { cart:CommerceCart; quote:CommerceQuote; address?:Address; email:string; checkoutMode:CheckoutMode; provider:Provider; requestId:string; }
export interface FraudSignal { key:string; weight:number; value:number; reason:string; }
export interface FraudAssessment { score:number; decision:FraudDecision; signals:FraudSignal[]; generatedAt:string; }
export interface ShippingOption { id:string; merchantId:string; method:'standard'|'express'|'white_glove'|'pickup'; price:Money; etaDays:number; available:boolean; carrier?:string; }
export interface TaxBreakdown { jurisdiction:string; rate:number; taxable:number; tax:number; inclusive:boolean; }
export interface SettlementLine { orderId:string; merchantId:string; gross:Money; platformFee:Money; affiliate:Money; refund:Money; net:Money; }
export interface RevenueEvent { id:string; type:RevenueEventType; orderId?:string; userId?:string; merchantId?:string; amount:Money; createdAt:string; metadata:Record<string,string>; }
export interface MerchantProfile { id:string; name:string; currencies:string[]; capabilities:MerchantCapability[]; provider:Provider; checkoutHost:string; commissionRate:number; }
export interface ReturnRequest { id:string; orderId:string; lineId:string; state:ReturnState; quantity:number; reason:string; refundAmount:Money; createdAt:string; updatedAt:string; }
export interface SupportCase { id:string; orderId:string; category:'payment'|'shipping'|'return'|'product'|'other'; priority:'low'|'normal'|'high'; status:'open'|'pending'|'resolved'; messages:string[]; createdAt:string; }
export interface MonetizationTier { tier:SubscriptionTier; monthly:Money; generationLimit:number; concierge:boolean; commerceFeeRate:number; }
export interface CustomerEntitlement { customerId:string; tier:SubscriptionTier; status:SubscriptionStatus; features:string[]; renewsAt?:string; }
export interface ExperimentAssignment { experimentId:string; userId:string; variant:string; exposureAt:string; }
export interface AnalyticsEvent { id:string; name:string; userId:string; sessionId:string; value?:Money; metadata:Record<string,string|number|boolean>; at:string; }
export interface CheckoutGuardResult { allowed:boolean; blockers:string[]; warnings:string[]; checkedAt:string; quoteHash:string; }
export interface IdempotencyRecord { key:string; endpoint:string; responseHash:string; createdAt:string; expiresAt:string; }
export interface WebhookReceipt { provider:Provider; eventId:string; signatureValid:boolean; receivedAt:string; duplicate:boolean; eventType:string; }
export interface InventorySnapshot { variantId:string; available:number; reserved:number; observedAt:string; source:'merchant'|'demo'; }
export interface PriceSnapshot { variantId:string; amount:number; currency:string; observedAt:string; source:'merchant'|'demo'; }
export interface AddressValidation { valid:boolean; normalized?:Address; issues:string[]; confidence:number; }
export interface CheckoutLink { provider:Provider; url:string; expiresAt:string; sessionId:string; mode:CheckoutMode; }
export interface ReconciliationResult { orderId:string; matched:boolean; expected:Money; actual?:Money; discrepancies:string[]; status:'matched'|'review'|'mismatch'; }
export interface CustomerOrderSummary { orderId:string; status:string; total:Money; itemCount:number; merchantCount:number; createdAt:string; }

export function money(amount:number, currency:string='CAD'):Money { return { amount:Math.round(amount*100)/100, currency:currency as Money['currency'] }; }
export function sumMoney(values:Money[], currency:string='CAD'):Money { return money(values.reduce((s,v)=>s+v.amount,0),currency); }
export function roundMoney(amount:number):number { return Math.round(amount*100)/100; }
export function nowIso(seed='2026-10-02T20:00:00.000Z'):string { return seed; }
