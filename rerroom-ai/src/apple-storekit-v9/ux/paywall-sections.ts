import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PaywallSections {
  private readonly state = new Map<string, unknown>();
  hero(input:any={}): any { return input; }
  features(input:any={}): any { return input?.value ?? input?.features ?? input?.productId ?? input?.state ?? null; }
  proof(input:any={}): any { return input; }
  legal(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
