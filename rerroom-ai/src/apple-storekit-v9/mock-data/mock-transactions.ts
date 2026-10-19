import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockTransactions {
  private readonly state = new Map<string, unknown>();
  purchase(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'purchase'); this.state.set(key,input); return input; }
  renewal(input:any={}): any { return input; }
  refund(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'refund'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
