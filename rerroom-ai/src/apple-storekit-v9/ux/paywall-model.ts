import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PaywallModel {
  private readonly state = new Map<string, unknown>();
  title(input:any={}): any { return input?.value ?? input?.title ?? input?.productId ?? input?.state ?? null; }
  cards(input:any={}): any { return input; }
  cta(input:any={}): any { return input?.value ?? input?.cta ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
