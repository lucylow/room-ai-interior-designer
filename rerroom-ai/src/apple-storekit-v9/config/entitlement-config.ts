import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class EntitlementConfig {
  private readonly state = new Map<string, unknown>();
  features(input:any={}): any { return input?.value ?? input?.features ?? input?.productId ?? input?.state ?? null; }
  plans(input:any={}): any { return input?.value ?? input?.plans ?? input?.productId ?? input?.state ?? null; }
  credits(input:any={}): any { return input?.value ?? input?.credits ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
