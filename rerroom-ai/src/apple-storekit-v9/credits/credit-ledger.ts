import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class CreditLedger {
  private readonly state = new Map<string, unknown>();
  append(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'append'); this.state.set(key,input); return input; }
  balance(input:any={}): any { return input; }
  replay(input:any={}): any { return input; }
  audit(input:any={}): any { return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
