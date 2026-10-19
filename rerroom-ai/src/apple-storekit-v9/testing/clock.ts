import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class DeterministicClock {
  private readonly state = new Map<string, unknown>();
  now(input:any={}): any { return input; }
  advance(input:any={}): any { return input; }
  reset(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
