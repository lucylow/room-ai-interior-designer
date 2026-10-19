import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class WebhookState {
  private readonly state = new Map<string, unknown>();
  accept(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'accept'); this.state.set(key,input); return input; }
  reject(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'reject'); this.state.set(key,input); return input; }
  replay(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
