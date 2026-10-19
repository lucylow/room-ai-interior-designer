import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class RevenueReport {
  private readonly state = new Map<string, unknown>();
  gross(input:any={}): any { return input; }
  netProxy(input:any={}): any { return input; }
  mix(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
