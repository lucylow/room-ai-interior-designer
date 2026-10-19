export interface MetricRow { key:string; value:number; label:string; }

export class RevenueWaterfall {
  private readonly audit: MetricRow[] = [];

  gross(input:any={}): any { const row={key:'gross',value:Number(input?.value ?? 0),label:'gross'}; this.audit.push(row); return row; }
  appleProceedsProxy(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  platformRevenue(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  affiliateRevenue(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  netProxy(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  explain(input:any={}): any { const row={key:'explain',value:Number(input?.value ?? 0),label:'explain'}; this.audit.push(row); return row; }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
