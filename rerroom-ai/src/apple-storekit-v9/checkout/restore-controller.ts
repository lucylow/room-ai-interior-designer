import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class RestoreController {
  private readonly state = new Map<string, unknown>();
  start(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'start'); this.state.set(key,input); return input; }
  accept(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'accept'); this.state.set(key,input); return input; }
  finish(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'finish'); this.state.set(key,input); return input; }
  summary(input:any={}): any { return input?.value ?? input?.summary ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
