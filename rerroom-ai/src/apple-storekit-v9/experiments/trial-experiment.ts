import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class TrialExperiment {
  private readonly state = new Map<string, unknown>();
  variant(input:any={}): any { return input; }
  eligible(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  measure(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'measure'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
