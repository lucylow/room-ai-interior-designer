import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class EntitlementLedger {
  private readonly state = new Map<string, unknown>();
  grant(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'grant'); this.state.set(key,input); return input; }
  revoke(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'revoke'); this.state.set(key,input); return input; }
  replace(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'replace'); this.state.set(key,input); return input; }
  activeKeys(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
