import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent, SubscriptionSnapshot } from '../types';

export class RenderCreditWallet {
  private readonly state = new Map<string, unknown>();
  balance(input:any={}): any { return input; }
  reserve(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'reserve'); this.state.set(key,input); return input; }
  consume(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'consume'); this.state.set(key,input); return input; }
  refund(input:any={}): any { const key=String(input?.key ?? input?.id ?? input?.productId ?? 'refund'); this.state.set(key,input); return input; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
