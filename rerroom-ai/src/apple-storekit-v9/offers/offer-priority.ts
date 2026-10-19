import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class OfferPriority {
  private readonly state = new Map<string, unknown>();
  rank(input:any={}): any { return input?.value ?? input?.rank ?? input?.productId ?? input?.state ?? null; }
  dedupe(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'dedupe'); this.state.set(key,input); return input; }
  winner(input:any={}): any { return input?.value ?? input?.winner ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
