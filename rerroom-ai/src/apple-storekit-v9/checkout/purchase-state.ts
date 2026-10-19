import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class PurchaseStateMachine {
  private readonly state = new Map<string, unknown>();
  transition(input:any={}): any { return input; }
  canTransition(input:any={}): any { return input; }
  terminal(input: any = {}): boolean { const v = input?.value ?? input?.state ?? true; return Boolean(v !== false && v !== 'expired' && v !== 'revoked'); }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
