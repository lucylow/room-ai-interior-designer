import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockProducts {
  private readonly state = new Map<string, unknown>();
  all(input:any={}): any { return input; }
  byFamily(input:any={}): any { return input; }
  search(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
