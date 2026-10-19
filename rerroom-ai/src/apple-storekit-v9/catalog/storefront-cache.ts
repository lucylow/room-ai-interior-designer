import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class StorefrontCache {
  private readonly state = new Map<string, unknown>();
  warmCatalog(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'warmCatalog'); this.state.set(key,input); return input; }
  invalidateCatalog(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'invalidateCatalog'); this.state.set(key,input); return input; }
  isFresh(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  snapshotHash(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
