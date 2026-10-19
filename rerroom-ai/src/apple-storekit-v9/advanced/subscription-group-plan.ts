export interface MetricRow { key:string; value:number; label:string; }

export class SubscriptionGroupPlan {
  private readonly audit: MetricRow[] = [];

  groups(input:any={}): any { return input?.groups ?? input?.value ?? input?.items ?? null; }
  alternatives(input:any={}): any { return input?.alternatives ?? input?.value ?? input?.items ?? null; }
  upgradeOrder(input:any={}): any { return input?.upgradeOrder ?? input?.value ?? input?.items ?? null; }
  downgradeOrder(input:any={}): any { return input?.downgradeOrder ?? input?.value ?? input?.items ?? null; }
  crossgrade(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  summary(input:any={}): any { return input?.summary ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
