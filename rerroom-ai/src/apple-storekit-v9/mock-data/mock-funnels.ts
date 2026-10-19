import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockFunnels {
  private readonly state = new Map<string, unknown>();
  free(input:any={}): any { return input; }
  pro(input:any={}): any { return input; }
  studio(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
