import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class RetentionModel {
  private readonly state = new Map<string, unknown>();
  riskSignals(input:any={}): any { return input; }
  intervention(input:any={}): any { return input; }
  cooldown(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
