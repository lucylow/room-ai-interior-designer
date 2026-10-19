import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class AppleIdempotency {
  private readonly state = new Map<string, unknown>();
  keyForPurchase(input:any={}): any { return input; }
  seen(input:any={}): any { return input; }
  remember(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'remember'); this.state.set(key,input); return input; }
  prune(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'prune'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
