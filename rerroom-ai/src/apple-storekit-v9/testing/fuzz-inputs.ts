import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class FuzzInputs {
  private readonly state = new Map<string, unknown>();
  products(input:any={}): any { return input?.value ?? input?.products ?? input?.productId ?? input?.state ?? null; }
  transactions(input:any={}): any { return input; }
  notifications(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
