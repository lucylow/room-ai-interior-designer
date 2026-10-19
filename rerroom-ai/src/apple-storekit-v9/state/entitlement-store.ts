import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class EntitlementStore {
  private readonly state = new Map<string, unknown>();
  hydrate(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'hydrate'); this.state.set(key,input); return input; }
  sync(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'sync'); this.state.set(key,input); return input; }
  features(input:any={}): any { return input?.value ?? input?.features ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
