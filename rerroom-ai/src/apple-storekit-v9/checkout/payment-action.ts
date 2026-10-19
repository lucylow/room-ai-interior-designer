import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PaymentAction {
  private readonly state = new Map<string, unknown>();
  requiresAction(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  status(input:any={}): any { return input?.value ?? input?.status ?? input?.productId ?? input?.state ?? null; }
  resume(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'resume'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
