export interface TaxBreakdownLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface TaxBreakdownReport{ok:boolean;total:number;currency:'CAD'|'USD';items:TaxBreakdownLine[];warnings:string[];nextAction:string}
export function buildTaxBreakdown(items:TaxBreakdownLine[], cap=5000):TaxBreakdownReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('tax-breakdown:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoTaxBreakdown():TaxBreakdownReport{
  return buildTaxBreakdown([
    {id:'tax-breakdown_0',label:'tax-breakdown item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'tax-breakdown_1',label:'tax-breakdown item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'tax-breakdown_2',label:'tax-breakdown item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'tax-breakdown_3',label:'tax-breakdown item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'tax-breakdown_4',label:'tax-breakdown item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'tax-breakdown_5',label:'tax-breakdown item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'tax-breakdown_6',label:'tax-breakdown item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'tax-breakdown_7',label:'tax-breakdown item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactTaxBreakdown(report:TaxBreakdownReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneTaxBreakdown(report:TaxBreakdownReport){return structuredClone(report)}
