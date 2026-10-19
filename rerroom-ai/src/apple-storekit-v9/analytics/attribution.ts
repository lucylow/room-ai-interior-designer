import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class PurchaseAttribution {
  private readonly state = new Map<string, unknown>();
  touch(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'touch'); this.state.set(key,input); return input; }
  checkout(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'checkout'); this.state.set(key,input); return input; }
  attribute(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'attribute'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
