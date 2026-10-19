import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CheckoutErrorNormalizer {
  private readonly state = new Map<string, unknown>();
  normalize(input:any={}): any { return input; }
  userMessage(input:any={}): any { return input?.value ?? input?.userMessage ?? input?.productId ?? input?.state ?? null; }
  retryable(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
