import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class SubscriptionEventModel {
  private readonly state = new Map<string, unknown>();
  fromNotification(input:any={}): any { return input; }
  impact(input:any={}): any { return input?.value ?? input?.impact ?? input?.productId ?? input?.state ?? null; }
  message(input:any={}): any { return input?.value ?? input?.message ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
