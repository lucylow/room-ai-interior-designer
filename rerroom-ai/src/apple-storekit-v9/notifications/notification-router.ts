import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class NotificationRouter {
  private readonly state = new Map<string, unknown>();
  route(input:any={}): any { return input?.value ?? input?.route ?? input?.productId ?? input?.state ?? null; }
  dedupe(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'dedupe'); this.state.set(key,input); return input; }
  severity(input:any={}): any { return input?.value ?? input?.severity ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
