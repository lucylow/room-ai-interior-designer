import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PurchaseContextStore {
  private readonly state = new Map<string, unknown>();
  set(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'set'); this.state.set(key,input); return input; }
  get(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'get'); this.state.set(key,input); return input; }
  clear(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'clear'); this.state.set(key,input); return input; }
  merge(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'merge'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
