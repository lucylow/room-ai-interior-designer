export type Money = {
  amount: number;
  currency: string;
};

export type MonetizationTier = 'free' | 'plus' | 'pro' | 'studio';

export type MonetizationFeature =
  | 'ai_generation'
  | 'advanced_ai'
  | 'hd_render'
  | 'gaussian_splats'
  | 'cad_bim_tools'
  | 'project_exports'
  | 'team_projects'
  | 'priority_support'
  | 'unlimited_projects'
  | 'commercial_use'
  | 'design_templates'
  | 'retail_shopping';

export type OfferKind = 'introductory' | 'promotional' | 'win-back' | 'offer-code' | 'bundle' | 'none';
export type PurchaseOutcome = 'success' | 'pending' | 'cancelled' | 'failed' | 'deferred';

export interface RevenueProduct {
  id: string;
  name: string;
  tier: MonetizationTier;
  kind: 'subscription' | 'non-consumable' | 'consumable';
  price: Money;
  period?: 'month' | 'year';
  featureIds: MonetizationFeature[];
  credits?: number;
  rank: number;
}

export interface PaywallContext {
  source: string;
  projectCount: number;
  generationsUsed: number;
  trialEligible: boolean;
  locale: string;
  experimentId?: string;
}

export interface OfferDecision {
  eligible: boolean;
  kind: OfferKind;
  productId?: string;
  discountPercent?: number;
  reason: string;
  expiresAt?: string;
}

export interface EntitlementGrant {
  feature: MonetizationFeature;
  state: 'active' | 'grace' | 'retry' | 'expired' | 'revoked';
  productId: string;
  source: 'apple' | 'server' | 'demo';
  expiresAt?: string;
}

export interface UsageMeter {
  feature: MonetizationFeature;
  used: number;
  included: number;
  resetAt?: string;
}

export interface PurchaseContext {
  appUserId: string;
  productId: string;
  source: string;
  projectId?: string;
  experimentId?: string;
  offerKind?: OfferKind;
  /** Reuse for duplicate taps within one purchase attempt; generate a new value for a new attempt. */
  idempotencyKey?: string;
}

export interface RevenueEvent {
  name: string;
  at: string;
  productId?: string;
  amount?: Money;
  properties: Record<string, string | number | boolean>;
}
