import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class TaxDisclosure {
  private readonly state = new Map<string, unknown>();
  label(input:any={}): any { return input?.value ?? input?.label ?? input?.productId ?? input?.state ?? null; }
  estimate(input:any={}): any { return input; }
  requiredCopy(input:any={}): any { return input?.value ?? input?.requiredCopy ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
