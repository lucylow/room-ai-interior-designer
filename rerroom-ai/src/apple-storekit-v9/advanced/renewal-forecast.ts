export interface MetricRow { key:string; value:number; label:string; }

export class RenewalForecast {
  private readonly audit: MetricRow[] = [];

  nextRenewal(input:any={}): any { const row={key:'nextRenewal',value:Number(input?.value ?? 0),label:'nextRenewal'}; this.audit.push(row); return row; }
  riskScore(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  confidence(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  cohortSummary(input:any={}): any { const row={key:'cohortSummary',value:Number(input?.value ?? 0),label:'cohortSummary'}; this.audit.push(row); return row; }
  signals(input:any={}): any { return input?.signals ?? input?.value ?? input?.items ?? null; }
  recommendation(input:any={}): any { return input?.recommendation ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
