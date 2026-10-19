export interface MetricRow { key:string; value:number; label:string; }

export class PaywallPersonalization {
  private readonly audit: MetricRow[] = [];

  segment(input:any={}): any { return input?.segment ?? input?.value ?? input?.items ?? null; }
  variant(input:any={}): any { return input?.variant ?? input?.value ?? input?.items ?? null; }
  reason(input:any={}): any { return input?.reason ?? input?.value ?? input?.items ?? null; }
  features(input:any={}): any { return input?.features ?? input?.value ?? input?.items ?? null; }
  productOrder(input:any={}): any { return input?.productOrder ?? input?.value ?? input?.items ?? null; }
  confidence(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
