export type BillingPeriod = 'week' | 'month' | 'year';
export type ProductKind = 'auto-renewable' | 'non-consumable' | 'consumable';
export type Environment = 'demo' | 'sandbox' | 'production';
export type PurchaseState = 'idle' | 'loading' | 'pending' | 'purchased' | 'failed' | 'cancelled' | 'restored';
export type EntitlementState = 'active' | 'grace' | 'billing-retry' | 'expired' | 'revoked' | 'missing';
export type VerificationState = 'verified' | 'unverified' | 'server-pending' | 'server-verified' | 'server-rejected';
export type OfferType = 'introductory' | 'promotional' | 'win-back' | 'offer-code' | 'none';
export interface StoreProduct { id:string; kind:ProductKind; displayName:string; description:string; price:number; currencyCode:string; billingPeriod?:BillingPeriod; trialDays?:number; family:string; rank:number; featureFlags:string[]; }
export interface PurchaseTransaction { id:string; originalId:string; productId:string; environment:Environment; purchasedAt:string; expiresAt?:string; revocationDate?:string; state:PurchaseState; verification:VerificationState; offerType:OfferType; }
export interface Entitlement { key:string; productId:string; state:EntitlementState; source:'apple'|'server'|'demo'; startedAt:string; expiresAt?:string; transactionId?:string; }
export interface CustomerProfile { appUserId:string; appAccountHash?:string; storefront:string; environment:Environment; createdAt:string; }
export interface PurchaseContext { appUserId:string; productId:string; sourceScreen:string; designProjectId?:string; experimentId?:string; campaignId?:string; }
export interface RevenueEvent { name:string; timestamp:string; amount?:number; currency?:string; productId?:string; experimentId?:string; properties:Record<string,string|number|boolean>; }
export interface SubscriptionSnapshot { family:string; productId?:string; state:EntitlementState; renewalDate?:string; willAutoRenew?:boolean; isTrial?:boolean; isIntroOffer?:boolean; offerType:OfferType; }
export interface StoreKitCapability { iOS:string; storeKitVersion:'2'; supported:boolean; nativeBridgeReady:boolean; }
