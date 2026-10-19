export interface DiscountBreakdownLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface DiscountBreakdownReport{ok:boolean;total:number;currency:'CAD'|'USD';items:DiscountBreakdownLine[];warnings:string[];nextAction:string}
export function buildDiscountBreakdown(items:DiscountBreakdownLine[], cap=5000):DiscountBreakdownReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('discount-breakdown:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoDiscountBreakdown():DiscountBreakdownReport{
  return buildDiscountBreakdown([
    {id:'discount-breakdown_0',label:'discount-breakdown item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'discount-breakdown_1',label:'discount-breakdown item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'discount-breakdown_2',label:'discount-breakdown item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'discount-breakdown_3',label:'discount-breakdown item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'discount-breakdown_4',label:'discount-breakdown item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'discount-breakdown_5',label:'discount-breakdown item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'discount-breakdown_6',label:'discount-breakdown item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'discount-breakdown_7',label:'discount-breakdown item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactDiscountBreakdown(report:DiscountBreakdownReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneDiscountBreakdown(report:DiscountBreakdownReport){return structuredClone(report)}
