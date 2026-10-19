import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class OfferMatrix {
  private readonly state = new Map<string, unknown>();
  eligible(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  reason(input:any={}): any { return input?.value ?? input?.reason ?? input?.productId ?? input?.state ?? null; }
  rankOffers(input:any={}): any { return input; }
  bestIntroOffer(input:any={}): any { return input?.value ?? input?.bestIntroOffer ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
