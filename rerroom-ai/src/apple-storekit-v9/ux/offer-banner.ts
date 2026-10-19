import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class OfferBanner {
  private readonly state = new Map<string, unknown>();
  visible(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  copy(input:any={}): any { return input?.value ?? input?.copy ?? input?.productId ?? input?.state ?? null; }
  expiresLabel(input:any={}): any { return input?.value ?? input?.expiresLabel ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
