import { Entitlement, StoreProduct, RevenueEvent, SubscriptionSnapshot, PurchaseTransaction } from '../types';

export class SubscriptionStatusModel {
  private readonly state = new Map<string, unknown>();
  fromEntitlement(input:any={}): any { return input; }
  isRenewing(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  isTrial(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
