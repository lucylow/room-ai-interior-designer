import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class StorefrontPolicy {
  private readonly state = new Map<string, unknown>();
  resolve(input:any={}): any { return input; }
  fallback(input:any={}): any { return input; }
  label(input:any={}): any { return input?.value ?? input?.label ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
