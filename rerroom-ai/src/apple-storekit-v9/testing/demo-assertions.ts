import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class DemoAssertions {
  private readonly state = new Map<string, unknown>();
  equal(input:any={}): any { return input; }
  truthy(input:any={}): any { return input; }
  within(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
