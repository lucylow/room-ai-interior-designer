import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class TransactionVerifier {
  private readonly state = new Map<string, unknown>();
  verifyShape(input:any={}): any { return input; }
  classify(input:any={}): any { return input; }
  toEntitlement(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
