import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class ManageSubscriptionFlow {
  private readonly state = new Map<string, unknown>();
  steps(input:any={}): any { return input?.value ?? input?.steps ?? input?.productId ?? input?.state ?? null; }
  deepLink(input:any={}): any { return input?.value ?? input?.deepLink ?? input?.productId ?? input?.state ?? null; }
  confirmation(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
