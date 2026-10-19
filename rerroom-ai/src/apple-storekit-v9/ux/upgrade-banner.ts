import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class UpgradeBanner {
  private readonly state = new Map<string, unknown>();
  show(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  copy(input:any={}): any { return input?.value ?? input?.copy ?? input?.productId ?? input?.state ?? null; }
  cta(input:any={}): any { return input?.value ?? input?.cta ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
