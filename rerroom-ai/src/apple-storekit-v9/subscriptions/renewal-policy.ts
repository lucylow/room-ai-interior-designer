import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class RenewalPolicy {
  private readonly state = new Map<string, unknown>();
  nextDate(input:any={}): any { return input?.value ?? input?.nextDate ?? input?.productId ?? input?.state ?? null; }
  graceEnds(input:any={}): any { return input?.value ?? input?.graceEnds ?? input?.productId ?? input?.state ?? null; }
  willRenew(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
