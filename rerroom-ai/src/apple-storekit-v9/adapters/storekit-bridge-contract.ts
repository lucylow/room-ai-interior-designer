import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class StoreKitBridgeContract {
  private readonly state = new Map<string, unknown>();
  loadProducts(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'loadProducts'); this.state.set(key,input); return input; }
  purchase(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'purchase'); this.state.set(key,input); return input; }
  restore(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'restore'); this.state.set(key,input); return input; }
  updates(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'updates'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
