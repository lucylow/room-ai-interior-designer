import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class ManageSubscriptionUi {
  private readonly state = new Map<string, unknown>();
  button(input:any={}): any { return input; }
  helper(input:any={}): any { return input?.value ?? input?.helper ?? input?.productId ?? input?.state ?? null; }
  status(input:any={}): any { return input?.value ?? input?.status ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
