import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class ProductCopy {
  private readonly state = new Map<string, unknown>();
  headline(input:any={}): any { return input?.value ?? input?.headline ?? input?.productId ?? input?.state ?? null; }
  benefitBullets(input:any={}): any { return input?.value ?? input?.benefitBullets ?? input?.productId ?? input?.state ?? null; }
  trialLabel(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
