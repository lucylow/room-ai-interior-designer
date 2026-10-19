import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class CancelFlow {
  private readonly state = new Map<string, unknown>();
  steps(input:any={}): any { return input?.value ?? input?.steps ?? input?.productId ?? input?.state ?? null; }
  deepLinkTarget(input:any={}): any { return input?.value ?? input?.deepLinkTarget ?? input?.productId ?? input?.state ?? null; }
  retentionMessage(input:any={}): any { return input?.value ?? input?.retentionMessage ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
