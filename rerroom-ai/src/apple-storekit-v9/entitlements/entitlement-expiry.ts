import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class EntitlementExpiry {
  private readonly state = new Map<string, unknown>();
  daysRemaining(input:any={}): any { return input; }
  isExpired(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  nextTransition(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
