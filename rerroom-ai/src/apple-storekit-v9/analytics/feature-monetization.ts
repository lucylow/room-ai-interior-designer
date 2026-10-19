import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class FeatureMonetization {
  private readonly state = new Map<string, unknown>();
  gateValue(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  usage(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  revenueLift(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
