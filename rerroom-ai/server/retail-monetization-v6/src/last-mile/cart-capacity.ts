export interface CartCapacityLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface CartCapacityReport{ok:boolean;total:number;currency:'CAD'|'USD';items:CartCapacityLine[];warnings:string[];nextAction:string}
export function buildCartCapacity(items:CartCapacityLine[], cap=5000):CartCapacityReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('cart-capacity:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoCartCapacity():CartCapacityReport{
  return buildCartCapacity([
    {id:'cart-capacity_0',label:'cart-capacity item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'cart-capacity_1',label:'cart-capacity item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'cart-capacity_2',label:'cart-capacity item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'cart-capacity_3',label:'cart-capacity item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'cart-capacity_4',label:'cart-capacity item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'cart-capacity_5',label:'cart-capacity item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'cart-capacity_6',label:'cart-capacity item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'cart-capacity_7',label:'cart-capacity item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactCartCapacity(report:CartCapacityReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneCartCapacity(report:CartCapacityReport){return structuredClone(report)}
