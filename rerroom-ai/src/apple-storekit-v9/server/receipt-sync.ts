import { PurchaseTransaction, Entitlement } from '../types';

export class ReceiptSync {
  private readonly records = new Map<string, unknown>();
  apply(input:any={}): any { const key=String(input?.key ?? input?.transactionId ?? 'apply'); this.records.set(key,input); return input; }
  dedupe(input:any={}): boolean { const key=String(input?.key ?? input?.transactionId ?? 'dedupe'); if(this.records.has(key)) return false; this.records.set(key,input); return true; }
  syncState(input:any={}): string { return String(input?.status ?? input?.state ?? 'pending'); }
  snapshot(): Record<string,unknown> { return Object.fromEntries(this.records.entries()); }
}
