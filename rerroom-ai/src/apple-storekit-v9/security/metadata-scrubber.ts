import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class MetadataScrubber {
  private readonly state = new Map<string, unknown>();
  sanitize(input:any={}): any { return input; }
  allowlist(input:any={}): any { return input; }
  removeSensitive(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
