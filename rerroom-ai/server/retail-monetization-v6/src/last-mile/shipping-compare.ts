export interface ShippingCompareLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface ShippingCompareReport{ok:boolean;total:number;currency:'CAD'|'USD';items:ShippingCompareLine[];warnings:string[];nextAction:string}
export function buildShippingCompare(items:ShippingCompareLine[], cap=5000):ShippingCompareReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('shipping-compare:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoShippingCompare():ShippingCompareReport{
  return buildShippingCompare([
    {id:'shipping-compare_0',label:'shipping-compare item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'shipping-compare_1',label:'shipping-compare item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'shipping-compare_2',label:'shipping-compare item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'shipping-compare_3',label:'shipping-compare item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'shipping-compare_4',label:'shipping-compare item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'shipping-compare_5',label:'shipping-compare item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'shipping-compare_6',label:'shipping-compare item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'shipping-compare_7',label:'shipping-compare item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactShippingCompare(report:ShippingCompareReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneShippingCompare(report:ShippingCompareReport){return structuredClone(report)}
