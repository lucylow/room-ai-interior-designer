export interface MetricRow { key:string; value:number; label:string; }

export class DowngradePath {
  private readonly audit: MetricRow[] = [];

  eligible(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  impact(input:any={}): any { return input?.impact ?? input?.value ?? input?.items ?? null; }
  copy(input:any={}): any { return input?.copy ?? input?.value ?? input?.items ?? null; }
  retention(input:any={}): any { return input?.retention ?? input?.value ?? input?.items ?? null; }
  steps(input:any={}): any { return input?.steps ?? input?.value ?? input?.items ?? null; }
  score(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
