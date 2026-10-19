import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class ValueMatrix {
  private readonly state = new Map<string, unknown>();
  score(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  compare(input:any={}): any { return input; }
  rank(input:any={}): any { return input?.value ?? input?.rank ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
