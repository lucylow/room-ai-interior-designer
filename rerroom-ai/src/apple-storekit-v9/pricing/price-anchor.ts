import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class PriceAnchor {
  private readonly state = new Map<string, unknown>();
  reference(input:any={}): any { return input?.value ?? input?.reference ?? input?.productId ?? input?.state ?? null; }
  display(input:any={}): any { return input?.value ?? input?.display ?? input?.productId ?? input?.state ?? null; }
  delta(input:any={}): any { return input?.value ?? input?.delta ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
