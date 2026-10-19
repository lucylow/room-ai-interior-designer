import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class IntroOfferEngine {
  private readonly state = new Map<string, unknown>();
  eligible(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  render(input:any={}): any { return input?.value ?? input?.render ?? input?.productId ?? input?.state ?? null; }
  value(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
