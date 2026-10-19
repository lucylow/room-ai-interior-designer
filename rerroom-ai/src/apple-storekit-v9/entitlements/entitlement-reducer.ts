import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class EntitlementReducer {
  private readonly state = new Map<string, unknown>();
  reduce(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'reduce'); this.state.set(key,input); return input; }
  applyTransaction(input:any={}): any { return input; }
  applyServerSync(input:any={}): any { return input; }
  applyRefund(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
