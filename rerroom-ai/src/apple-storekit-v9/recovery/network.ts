import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CommerceNetworkRecovery {
  private readonly state = new Map<string, unknown>();
  classify(input:any={}): any { return input; }
  queue(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'queue'); this.state.set(key,input); return input; }
  resume(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'resume'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
