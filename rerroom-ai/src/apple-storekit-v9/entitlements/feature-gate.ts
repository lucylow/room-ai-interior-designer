import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class FeatureGate {
  private readonly state = new Map<string, unknown>();
  allows(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  explain(input:any={}): any { return input?.value ?? input?.explain ?? input?.productId ?? input?.state ?? null; }
  requiredPlan(input:any={}): any { return input?.value ?? input?.requiredPlan ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
