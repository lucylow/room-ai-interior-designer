import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class BillingRetryPolicy {
  private readonly state = new Map<string, unknown>();
  isRetrying(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  retryMessage(input:any={}): any { return input; }
  recoveryPath(input:any={}): any { return input?.value ?? input?.recoveryPath ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
