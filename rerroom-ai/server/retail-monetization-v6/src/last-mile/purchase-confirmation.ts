export interface PurchaseConfirmationLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface PurchaseConfirmationReport{ok:boolean;total:number;currency:'CAD'|'USD';items:PurchaseConfirmationLine[];warnings:string[];nextAction:string}
export function buildPurchaseConfirmation(items:PurchaseConfirmationLine[], cap=5000):PurchaseConfirmationReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('purchase-confirmation:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoPurchaseConfirmation():PurchaseConfirmationReport{
  return buildPurchaseConfirmation([
    {id:'purchase-confirmation_0',label:'purchase-confirmation item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'purchase-confirmation_1',label:'purchase-confirmation item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'purchase-confirmation_2',label:'purchase-confirmation item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'purchase-confirmation_3',label:'purchase-confirmation item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'purchase-confirmation_4',label:'purchase-confirmation item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'purchase-confirmation_5',label:'purchase-confirmation item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'purchase-confirmation_6',label:'purchase-confirmation item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'purchase-confirmation_7',label:'purchase-confirmation item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactPurchaseConfirmation(report:PurchaseConfirmationReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function clonePurchaseConfirmation(report:PurchaseConfirmationReport){return structuredClone(report)}
