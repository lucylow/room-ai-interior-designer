import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CustomerTokenPolicy {
  private readonly state = new Map<string, unknown>();
  hash(input:any={}): any { return input; }
  normalize(input:any={}): any { return input; }
  safeForMetadata(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
