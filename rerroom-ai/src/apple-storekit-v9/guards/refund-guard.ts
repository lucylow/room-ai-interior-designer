import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class RefundGuard {
  private readonly state = new Map<string, unknown>();
  eligible(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  disclosures(input:any={}): any { return input; }
  ready(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
