export interface MetricRow { key:string; value:number; label:string; }

export class StorefrontHealth {
  private readonly audit: MetricRow[] = [];

  catalogFreshness(input:any={}): any { const row={key:'catalogFreshness',value:Number(input?.value ?? 0),label:'catalogFreshness'}; this.audit.push(row); return row; }
  priceFreshness(input:any={}): any { const row={key:'priceFreshness',value:Number(input?.value ?? 0),label:'priceFreshness'}; this.audit.push(row); return row; }
  transactionLag(input:any={}): any { const row={key:'transactionLag',value:Number(input?.value ?? 0),label:'transactionLag'}; this.audit.push(row); return row; }
  entitlementLag(input:any={}): any { const row={key:'entitlementLag',value:Number(input?.value ?? 0),label:'entitlementLag'}; this.audit.push(row); return row; }
  score(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  status(input:any={}): any { return input?.status ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
