import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockProjects {
  private readonly state = new Map<string, unknown>();
  roomProjects(input:any={}): any { return input; }
  projectValue(input:any={}): any { return input; }
  featureUsage(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
