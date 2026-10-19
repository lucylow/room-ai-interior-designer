import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class SubscriptionVerifier {
  private readonly state = new Map<string, unknown>();
  verifyRenewal(input:any={}): any { return input; }
  verifyStatus(input:any={}): any { return input; }
  toSnapshot(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
