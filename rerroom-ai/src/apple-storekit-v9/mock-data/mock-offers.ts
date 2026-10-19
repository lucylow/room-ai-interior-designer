import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockOffers {
  private readonly state = new Map<string, unknown>();
  intro(input:any={}): any { return input; }
  promo(input:any={}): any { return input; }
  winback(input:any={}): any { return input; }
  code(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
