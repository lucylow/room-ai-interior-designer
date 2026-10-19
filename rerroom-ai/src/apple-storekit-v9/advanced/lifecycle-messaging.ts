export interface MetricRow { key:string; value:number; label:string; }

export class LifecycleMessaging {
  private readonly audit: MetricRow[] = [];

  onboarding(input:any={}): any { return input?.onboarding ?? input?.value ?? input?.items ?? null; }
  trialEnd(input:any={}): any { return input?.trialEnd ?? input?.value ?? input?.items ?? null; }
  billingRetry(input:any={}): any { return input?.billingRetry ?? input?.value ?? input?.items ?? null; }
  winback(input:any={}): any { return input?.winback ?? input?.value ?? input?.items ?? null; }
  renewal(input:any={}): any { return input?.renewal ?? input?.value ?? input?.items ?? null; }
  unsubscribe(input:any={}): any { return input?.unsubscribe ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
