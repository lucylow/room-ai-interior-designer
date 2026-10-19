import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class RestorePurchasesUi {
  private readonly state = new Map<string, unknown>();
  label(input:any={}): any { return input?.value ?? input?.label ?? input?.productId ?? input?.state ?? null; }
  status(input:any={}): any { return input?.value ?? input?.status ?? input?.productId ?? input?.state ?? null; }
  result(input:any={}): any { return input?.value ?? input?.result ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
