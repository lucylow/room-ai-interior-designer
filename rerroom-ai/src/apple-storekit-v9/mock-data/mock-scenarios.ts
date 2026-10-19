import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MockScenarios {
  private readonly state = new Map<string, unknown>();
  newUser(input:any={}): any { return input; }
  trialUser(input:any={}): any { return input; }
  powerUser(input:any={}): any { return input; }
  lapsedUser(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
