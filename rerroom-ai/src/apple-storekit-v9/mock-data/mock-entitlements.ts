import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockEntitlements {
  private readonly state = new Map<string, unknown>();
  pro(input:any={}): any { return input; }
  studio(input:any={}): any { return input; }
  expired(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
