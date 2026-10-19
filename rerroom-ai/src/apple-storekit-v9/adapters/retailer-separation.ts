import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class RetailerSeparation {
  private readonly state = new Map<string, unknown>();
  digital(input:any={}): any { return input; }
  physical(input:any={}): any { return input; }
  rejectMismatch(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
