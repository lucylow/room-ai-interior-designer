import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class EntitlementDiff {
  private readonly state = new Map<string, unknown>();
  compare(input:any={}): any { return input; }
  added(input:any={}): any { return input; }
  removed(input:any={}): any { return input; }
  changed(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
