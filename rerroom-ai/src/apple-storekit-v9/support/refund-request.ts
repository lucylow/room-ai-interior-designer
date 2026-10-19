import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class RefundRequestFlow {
  private readonly state = new Map<string, unknown>();
  start(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'start'); this.state.set(key,input); return input; }
  reason(input:any={}): any { return input?.value ?? input?.reason ?? input?.productId ?? input?.state ?? null; }
  result(input:any={}): any { return input?.value ?? input?.result ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
