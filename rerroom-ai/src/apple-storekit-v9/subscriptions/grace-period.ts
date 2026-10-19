import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class GracePeriodPolicy {
  private readonly state = new Map<string, unknown>();
  isGrace(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  daysRemaining(input:any={}): any { return input; }
  message(input:any={}): any { return input?.value ?? input?.message ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
