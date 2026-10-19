import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class ConsumptionEventModel {
  private readonly state = new Map<string, unknown>();
  fromNotification(input:any={}): any { return input; }
  impact(input:any={}): any { return input?.value ?? input?.impact ?? input?.productId ?? input?.state ?? null; }
  creditAction(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
