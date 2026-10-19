import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class PaywallReport {
  private readonly state = new Map<string, unknown>();
  impressions(input:any={}): any { return input; }
  ctaRate(input:any={}): any { return input; }
  purchaseRate(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
