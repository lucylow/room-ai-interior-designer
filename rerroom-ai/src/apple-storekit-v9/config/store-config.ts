import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class StoreConfig {
  private readonly state = new Map<string, unknown>();
  products(input:any={}): any { return input?.value ?? input?.products ?? input?.productId ?? input?.state ?? null; }
  environment(input:any={}): any { return input; }
  capabilities(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
