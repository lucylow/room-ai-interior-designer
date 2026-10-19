import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class EventRedactor {
  private readonly state = new Map<string, unknown>();
  redact(input:any={}): any { return input; }
  hashUser(input:any={}): any { return input; }
  safeProperties(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
