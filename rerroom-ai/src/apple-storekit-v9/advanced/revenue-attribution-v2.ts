export interface MetricRow { key:string; value:number; label:string; }

export class RevenueAttributionV2 {
  private readonly audit: MetricRow[] = [];

  firstTouch(input:any={}): any { const row={key:'firstTouch',value:Number(input?.value ?? 0),label:'firstTouch'}; this.audit.push(row); return row; }
  lastTouch(input:any={}): any { const row={key:'lastTouch',value:Number(input?.value ?? 0),label:'lastTouch'}; this.audit.push(row); return row; }
  assist(input:any={}): any { const row={key:'assist',value:Number(input?.value ?? 0),label:'assist'}; this.audit.push(row); return row; }
  weighted(input:any={}): any { const row={key:'weighted',value:Number(input?.value ?? 0),label:'weighted'}; this.audit.push(row); return row; }
  confidence(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  explain(input:any={}): any { const row={key:'explain',value:Number(input?.value ?? 0),label:'explain'}; this.audit.push(row); return row; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
