export interface MetricRow { key:string; value:number; label:string; }

export class PurchaseSupport {
  private readonly audit: MetricRow[] = [];

  lookup(input:any={}): any { const row={key:'lookup',value:Number(input?.value ?? 0),label:'lookup'}; this.audit.push(row); return row; }
  timeline(input:any={}): any { return input?.timeline ?? input?.value ?? input?.items ?? null; }
  entitlements(input:any={}): any { return input?.entitlements ?? input?.value ?? input?.items ?? null; }
  refundInfo(input:any={}): any { return input?.refundInfo ?? input?.value ?? input?.items ?? null; }
  subscriptionInfo(input:any={}): any { return input?.subscriptionInfo ?? input?.value ?? input?.items ?? null; }
  safeSummary(input:any={}): any { return input?.safeSummary ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
