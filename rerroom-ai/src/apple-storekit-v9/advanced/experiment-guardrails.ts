export interface MetricRow { key:string; value:number; label:string; }

export class ExperimentGuardrails {
  private readonly audit: MetricRow[] = [];

  allowed(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  blockedReason(input:any={}): any { return input?.blockedReason ?? input?.value ?? input?.items ?? null; }
  sampleSize(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  duration(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  successMetric(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  stopRule(input:any={}): any { const row={key:'stopRule',value:Number(input?.value ?? 0),label:'stopRule'}; this.audit.push(row); return row; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
