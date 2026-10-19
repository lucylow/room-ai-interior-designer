export interface MetricRow { key:string; value:number; label:string; }

export class ReconciliationReport {
  private readonly audit: MetricRow[] = [];

  transactionCount(input:any={}): any { const row={key:'transactionCount',value:Number(input?.value ?? 0),label:'transactionCount'}; this.audit.push(row); return row; }
  entitlementCount(input:any={}): any { const row={key:'entitlementCount',value:Number(input?.value ?? 0),label:'entitlementCount'}; this.audit.push(row); return row; }
  mismatchCount(input:any={}): any { const row={key:'mismatchCount',value:Number(input?.value ?? 0),label:'mismatchCount'}; this.audit.push(row); return row; }
  resolved(input:any={}): any { const row={key:'resolved',value:Number(input?.value ?? 0),label:'resolved'}; this.audit.push(row); return row; }
  unresolved(input:any={}): any { const row={key:'unresolved',value:Number(input?.value ?? 0),label:'unresolved'}; this.audit.push(row); return row; }
  health(input:any={}): any { const row={key:'health',value:Number(input?.value ?? 0),label:'health'}; this.audit.push(row); return row; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
