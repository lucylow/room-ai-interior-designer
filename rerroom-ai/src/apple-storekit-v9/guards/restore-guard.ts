import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class RestoreGuard {
  private readonly state = new Map<string, unknown>();
  ready(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  issues(input:any={}): any { return input; }
  canRestore(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
