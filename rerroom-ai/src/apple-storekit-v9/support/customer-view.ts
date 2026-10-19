import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CustomerPurchaseView {
  private readonly state = new Map<string, unknown>();
  summary(input:any={}): any { return input?.value ?? input?.summary ?? input?.productId ?? input?.state ?? null; }
  activePlans(input:any={}): any { return input; }
  purchaseHistory(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
