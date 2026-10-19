import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PricingConfig {
  private readonly state = new Map<string, unknown>();
  tiers(input:any={}): any { return input; }
  currency(input:any={}): any { return input; }
  experiments(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
