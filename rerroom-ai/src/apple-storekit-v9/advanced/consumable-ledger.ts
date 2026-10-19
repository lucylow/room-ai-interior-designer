export interface CreditAudit { id:string; delta:number; reason:string; timestamp:string; }
export class ConsumableLedger {
  private readonly rows:CreditAudit[]=[];
  creditBalance(input:any={}): number { return Number(input?.balance ?? 0); }
  purchase(input:any={}): CreditAudit { const row={id:String(input?.id ?? `purchase-${this.rows.length}`),delta:Number(input?.credits ?? 0),reason:'purchase',timestamp:new Date().toISOString()}; this.rows.push(row); return row; }
  consume(input:any={}): CreditAudit { const row={id:String(input?.id ?? `consume-${this.rows.length}`),delta:-Math.abs(Number(input?.credits ?? 0)),reason:'consume',timestamp:new Date().toISOString()}; this.rows.push(row); return row; }
  refund(input:any={}): CreditAudit { const row={id:String(input?.id ?? `refund-${this.rows.length}`),delta:Math.abs(Number(input?.credits ?? 0)),reason:'refund',timestamp:new Date().toISOString()}; this.rows.push(row); return row; }
  reconcile(): number { return this.rows.reduce((s,r)=>s+r.delta,0); }
  audit(): CreditAudit[] { return this.rows.map(r=>({...r})); }
}
