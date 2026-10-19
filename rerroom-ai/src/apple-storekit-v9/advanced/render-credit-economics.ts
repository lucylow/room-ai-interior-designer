export interface MetricRow { key:string; value:number; label:string; }

export class RenderCreditEconomics {
  private readonly audit: MetricRow[] = [];

  costPerRender(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  creditsPerExport(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  bundleMarginProxy(input:any={}): any { const row={key:'bundleMarginProxy',value:Number(input?.value ?? 0),label:'bundleMarginProxy'}; this.audit.push(row); return row; }
  burnRate(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  forecast(input:any={}): any { return input?.forecast ?? input?.value ?? input?.items ?? null; }
  capacity(input:any={}): number { const value=Number(input?.value ?? input?.base ?? input?.count ?? 0); const modifier=Number(input?.modifier ?? 1); return Number((value*modifier).toFixed(4)); }
  record(row:MetricRow):void { this.audit.push({...row}); }
  auditTrail():MetricRow[] { return this.audit.map(x=>({...x})); }
}
