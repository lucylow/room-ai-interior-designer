import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class ReviewConfig {
  private readonly state = new Map<string, unknown>();
  demoAccounts(input:any={}): any { return input; }
  reviewNotes(input:any={}): any { return input; }
  featureAccess(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
