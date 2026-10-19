export interface CommerceMetric { key:string; value:number; note:string; }

export class PaywallValueProposition {
  private readonly metrics:CommerceMetric[]=[];

  metric0(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 0); const row={key:'metric0',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-0')}; this.metrics.push(row); return row; }
  metric1(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 1); const row={key:'metric1',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-1')}; this.metrics.push(row); return row; }
  metric2(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 2); const row={key:'metric2',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-2')}; this.metrics.push(row); return row; }
  metric3(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 3); const row={key:'metric3',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-3')}; this.metrics.push(row); return row; }
  metric4(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 4); const row={key:'metric4',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-4')}; this.metrics.push(row); return row; }
  metric5(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 5); const row={key:'metric5',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-5')}; this.metrics.push(row); return row; }
  metric6(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 6); const row={key:'metric6',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-6')}; this.metrics.push(row); return row; }
  metric7(input:any={}): CommerceMetric { const value=Number(input?.value ?? input?.count ?? 7); const row={key:'metric7',value:Number.isFinite(value)?value:0,note:String(input?.note ?? 'paywall-value-proposition-7')}; this.metrics.push(row); return row; }
  score():number { if(!this.metrics.length) return 0; const sum=this.metrics.reduce((s,x)=>s+x.value,0); return Number((sum/this.metrics.length).toFixed(4)); }
  rows():CommerceMetric[]{ return this.metrics.map(x=>({...x})); }
  reset():void { this.metrics.length=0; }
}
