import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class AccountMergePolicy {
  private readonly state = new Map<string, unknown>();
  canMerge(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  merge(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'merge'); this.state.set(key,input); return input; }
  conflicts(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
