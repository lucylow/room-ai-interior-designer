import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CheckoutTotal {
  private readonly state = new Map<string, unknown>();
  compute(input:any={}): any { return input; }
  validate(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'validate'); this.state.set(key,input); return input; }
  explain(input:any={}): any { return input?.value ?? input?.explain ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
