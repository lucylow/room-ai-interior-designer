import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class MonetizationFunnel {
  private readonly state = new Map<string, unknown>();
  record(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'record'); this.state.set(key,input); return input; }
  conversion(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  dropOff(input:any={}): any { return input; }
  cohort(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
