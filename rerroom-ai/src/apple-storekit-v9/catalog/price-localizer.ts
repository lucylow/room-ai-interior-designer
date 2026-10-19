import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class PriceLocalizer {
  private readonly state = new Map<string, unknown>();
  format(input:any={}): any { return input; }
  compareAnnualized(input:any={}): any { return input; }
  discountPercent(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
