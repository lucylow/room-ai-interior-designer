import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PurchaseStore {
  private readonly state = new Map<string, unknown>();
  begin(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'begin'); this.state.set(key,input); return input; }
  pending(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'pending'); this.state.set(key,input); return input; }
  success(input:any={}): any { return input; }
  error(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
