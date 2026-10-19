import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PaywallRouting {
  private readonly state = new Map<string, unknown>();
  route(input:any={}): any { return input?.value ?? input?.route ?? input?.productId ?? input?.state ?? null; }
  shouldShow(input:any={}): any { return input; }
  reason(input:any={}): any { return input?.value ?? input?.reason ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
