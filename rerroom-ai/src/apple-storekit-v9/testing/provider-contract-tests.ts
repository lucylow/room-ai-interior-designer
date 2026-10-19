import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class ProviderContractTests {
  private readonly state = new Map<string, unknown>();
  storeKit(input:any={}): any { return input; }
  server(input:any={}): any { return input; }
  physicalBoundary(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
