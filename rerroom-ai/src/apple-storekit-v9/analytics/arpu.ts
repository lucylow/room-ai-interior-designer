import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class ArpuModel {
  private readonly state = new Map<string, unknown>();
  arpu(input:any={}): number { const value=Number(input?.value ?? input?.base ?? 0); return Number.isFinite(value)?Math.max(0,Math.min(1,value/1000)):0; }
  paidShare(input:any={}): any { return input; }
  revenuePerProject(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
