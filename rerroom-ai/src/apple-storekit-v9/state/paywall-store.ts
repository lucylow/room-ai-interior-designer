import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PaywallStore {
  private readonly state = new Map<string, unknown>();
  open(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'open'); this.state.set(key,input); return input; }
  close(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'close'); this.state.set(key,input); return input; }
  select(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'select'); this.state.set(key,input); return input; }
  dismiss(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'dismiss'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
