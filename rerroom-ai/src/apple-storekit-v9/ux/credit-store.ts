import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CreditStoreUi {
  private readonly state = new Map<string, unknown>();
  packs(input:any={}): any { return input; }
  selected(input:any={}): any { return input?.value ?? input?.selected ?? input?.productId ?? input?.state ?? null; }
  summary(input:any={}): any { return input?.value ?? input?.summary ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
