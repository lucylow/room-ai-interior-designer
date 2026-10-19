import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class JwsEnvelope {
  private readonly state = new Map<string, unknown>();
  parseHeader(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'parseHeader'); this.state.set(key,input); return input; }
  payloadShape(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'payloadShape'); this.state.set(key,input); return input; }
  safeFields(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'safeFields'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
