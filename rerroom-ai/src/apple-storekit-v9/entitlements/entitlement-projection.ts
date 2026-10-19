import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class EntitlementProjection {
  private readonly state = new Map<string, unknown>();
  projectForFeature(input:any={}): any { return input; }
  projectPlan(input:any={}): any { return input; }
  projectSummary(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
