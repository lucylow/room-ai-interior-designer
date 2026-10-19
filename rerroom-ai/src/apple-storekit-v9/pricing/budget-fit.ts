import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class BudgetFit {
  private readonly state = new Map<string, unknown>();
  fit(input:any={}): any { return input; }
  remaining(input:any={}): any { return input; }
  explain(input:any={}): any { return input?.value ?? input?.explain ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
