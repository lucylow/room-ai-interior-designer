import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class FeaturePreview {
  private readonly state = new Map<string, unknown>();
  preview(input:any={}): any { return input; }
  blurred(input:any={}): any { return input; }
  unlock(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
