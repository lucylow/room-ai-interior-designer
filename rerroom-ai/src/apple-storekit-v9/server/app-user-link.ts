import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class AppUserLink {
  private readonly state = new Map<string, unknown>();
  bind(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'bind'); this.state.set(key,input); return input; }
  unlink(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'unlink'); this.state.set(key,input); return input; }
  lookup(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'lookup'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
