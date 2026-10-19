import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class AppStoreServerApiClient {
  private readonly state = new Map<string, unknown>();
  history(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'history'); this.state.set(key,input); return input; }
  status(input:any={}): any { return input?.value ?? input?.status ?? input?.productId ?? input?.state ?? null; }
  finish(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'finish'); this.state.set(key,input); return input; }
  consumption(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'consumption'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
