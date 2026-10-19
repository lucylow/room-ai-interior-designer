export interface MetricRow { key:string; value:number; label:string; }

export class FeaturePricingMap {
  private readonly audit: MetricRow[] = [];

  featurePrice(input:any={}): any { return input?.featurePrice ?? input?.value ?? input?.items ?? null; }
  planCoverage(input:any={}): any { return input?.planCoverage ?? input?.value ?? input?.items ?? null; }
  meter(input:any={}): any { return input?.meter ?? input?.value ?? input?.items ?? null; }
  upgradeTrigger(input:any={}): any { return input?.upgradeTrigger ?? input?.value ?? input?.items ?? null; }
  usageScore(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  copy(input:any={}): any { return input?.copy ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
