import { StoreProduct, PurchaseTransaction, Entitlement, RevenueEvent } from '../types';

export class CommerceStore {
  private readonly state = new Map<string, unknown>();
  reduce(input:any={}): any { const key=String(input?.key ?? input?.id ?? 'reduce'); this.state.set(key,input); return input; }
  hydrate(input:any={}): any { const key=String(input?.key ?? input?.id ?? 'hydrate'); this.state.set(key,input); return input; }
  clear(input:any={}): boolean { this.state.clear(); return true; }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.state.entries()); }
}
