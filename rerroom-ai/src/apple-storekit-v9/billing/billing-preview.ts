import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class BillingPreview {
  private readonly state = new Map<string, unknown>();
  subtotal(input:any={}): any { return input; }
  tax(input:any={}): any { return input; }
  total(input:any={}): any { return input; }
  renewalLabel(input:any={}): any { return input?.value ?? input?.renewalLabel ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
