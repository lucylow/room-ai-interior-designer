import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class ServerAuthBoundary {
  private readonly state = new Map<string, unknown>();
  requiredHeaders(input:any={}): any { return input?.value ?? input?.requiredHeaders ?? input?.productId ?? input?.state ?? null; }
  scope(input:any={}): any { return input?.value ?? input?.scope ?? input?.productId ?? input?.state ?? null; }
  reject(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'reject'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
