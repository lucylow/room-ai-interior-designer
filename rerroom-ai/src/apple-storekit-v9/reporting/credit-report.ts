import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class CreditReport {
  private readonly state = new Map<string, unknown>();
  sold(input:any={}): any { return input; }
  consumed(input:any={}): any { return input; }
  unused(input:any={}): any { return input; }
  breakageProxy(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
