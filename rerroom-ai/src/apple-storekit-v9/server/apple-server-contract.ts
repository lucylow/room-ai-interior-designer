import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class AppleServerContract {
  private readonly state = new Map<string, unknown>();
  historyRequest(input:any={}): any { return input; }
  subscriptionStatusRequest(input:any={}): any { return input; }
  consumeRequest(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
