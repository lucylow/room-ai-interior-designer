export interface MetricRow { key:string; value:number; label:string; }

export class SubscriberLifecycle {
  private readonly audit: MetricRow[] = [];

  newState(input:any={}): any { const row={key:'newState',value:Number(input?.value ?? 0),label:'newState'}; this.audit.push(row); return row; }
  transition(input:any={}): any { const row={key:'transition',value:Number(input?.value ?? 0),label:'transition'}; this.audit.push(row); return row; }
  isActive(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  isRecovering(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  isLapsed(input:any={}): boolean { return input?.enabled !== false && input?.state !== 'blocked' && input?.state !== 'expired'; }
  summary(input:any={}): any { return input?.summary ?? input?.value ?? input?.items ?? null; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
