export interface RetailerHandoffLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface RetailerHandoffReport{ok:boolean;total:number;currency:'CAD'|'USD';items:RetailerHandoffLine[];warnings:string[];nextAction:string}
export function buildRetailerHandoff(items:RetailerHandoffLine[], cap=5000):RetailerHandoffReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('retailer-handoff:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoRetailerHandoff():RetailerHandoffReport{
  return buildRetailerHandoff([
    {id:'retailer-handoff_0',label:'retailer-handoff item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'retailer-handoff_1',label:'retailer-handoff item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'retailer-handoff_2',label:'retailer-handoff item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'retailer-handoff_3',label:'retailer-handoff item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'retailer-handoff_4',label:'retailer-handoff item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'retailer-handoff_5',label:'retailer-handoff item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'retailer-handoff_6',label:'retailer-handoff item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'retailer-handoff_7',label:'retailer-handoff item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactRetailerHandoff(report:RetailerHandoffReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneRetailerHandoff(report:RetailerHandoffReport){return structuredClone(report)}
