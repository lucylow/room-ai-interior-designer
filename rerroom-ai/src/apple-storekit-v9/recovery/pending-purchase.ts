import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PendingPurchaseRecovery {
  private readonly state = new Map<string, unknown>();
  detect(input:any={}): any { return input; }
  resume(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'resume'); this.state.set(key,input); return input; }
  timeout(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
