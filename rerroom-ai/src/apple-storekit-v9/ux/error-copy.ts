import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CommerceErrorCopy {
  private readonly state = new Map<string, unknown>();
  title(input:any={}): any { return input?.value ?? input?.title ?? input?.productId ?? input?.state ?? null; }
  body(input:any={}): any { return input?.value ?? input?.body ?? input?.productId ?? input?.state ?? null; }
  cta(input:any={}): any { return input?.value ?? input?.cta ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
