export interface MetricRow { key:string; value:number; label:string; }

export class AppReviewReadiness {
  private readonly audit: MetricRow[] = [];

  productMetadata(input:any={}): any { return input?.productMetadata ?? input?.value ?? input?.items ?? null; }
  restorePurchases(input:any={}): any { return input?.restorePurchases ?? input?.value ?? input?.items ?? null; }
  manageSubscription(input:any={}): any { return input?.manageSubscription ?? input?.value ?? input?.items ?? null; }
  demoPath(input:any={}): any { return input?.demoPath ?? input?.value ?? input?.items ?? null; }
  privacyPath(input:any={}): any { return input?.privacyPath ?? input?.value ?? input?.items ?? null; }
  score(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
