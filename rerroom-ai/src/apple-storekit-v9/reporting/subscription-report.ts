import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class SubscriptionReport {
  private readonly state = new Map<string, unknown>();
  active(input:any={}): any { return input; }
  trial(input:any={}): any { return input; }
  renewing(input:any={}): any { return input; }
  expired(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
