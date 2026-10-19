import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CheckoutUiState {
  private readonly state = new Map<string, unknown>();
  status(input:any={}): any { return input?.value ?? input?.status ?? input?.productId ?? input?.state ?? null; }
  blocking(input:any={}): any { return input?.value ?? input?.blocking ?? input?.productId ?? input?.state ?? null; }
  message(input:any={}): any { return input?.value ?? input?.message ?? input?.productId ?? input?.state ?? null; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
