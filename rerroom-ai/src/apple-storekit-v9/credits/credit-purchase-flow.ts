import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CreditPurchaseFlow {
  private readonly state = new Map<string, unknown>();
  canBuy(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  preview(input:any={}): any { return input; }
  complete(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'complete'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
