export interface MetricRow { key:string; value:number; label:string; }

export class ChurnCohort {
  private readonly audit: MetricRow[] = [];

  risk(input:any={}): any { const row={key:'risk',value:Number(input?.value ?? 0),label:'risk'}; this.audit.push(row); return row; }
  segment(input:any={}): any { return input?.segment ?? input?.value ?? input?.items ?? null; }
  intervention(input:any={}): any { const row={key:'intervention',value:Number(input?.value ?? 0),label:'intervention'}; this.audit.push(row); return row; }
  holdout(input:any={}): any { return input?.holdout ?? input?.value ?? input?.items ?? null; }
  expectedLift(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  summary(input:any={}): any { return input?.summary ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
