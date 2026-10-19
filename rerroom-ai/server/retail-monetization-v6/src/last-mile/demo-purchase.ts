export interface DemoPurchaseLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface DemoPurchaseReport{ok:boolean;total:number;currency:'CAD'|'USD';items:DemoPurchaseLine[];warnings:string[];nextAction:string}
export function buildDemoPurchase(items:DemoPurchaseLine[], cap=5000):DemoPurchaseReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('demo-purchase:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoDemoPurchase():DemoPurchaseReport{
  return buildDemoPurchase([
    {id:'demo-purchase_0',label:'demo-purchase item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'demo-purchase_1',label:'demo-purchase item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'demo-purchase_2',label:'demo-purchase item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'demo-purchase_3',label:'demo-purchase item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'demo-purchase_4',label:'demo-purchase item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'demo-purchase_5',label:'demo-purchase item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'demo-purchase_6',label:'demo-purchase item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'demo-purchase_7',label:'demo-purchase item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactDemoPurchase(report:DemoPurchaseReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneDemoPurchase(report:DemoPurchaseReport){return structuredClone(report)}
