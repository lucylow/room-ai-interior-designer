export interface CheckoutReceiptLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface CheckoutReceiptReport{ok:boolean;total:number;currency:'CAD'|'USD';items:CheckoutReceiptLine[];warnings:string[];nextAction:string}
export function buildCheckoutReceipt(items:CheckoutReceiptLine[], cap=5000):CheckoutReceiptReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('checkout-receipt:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoCheckoutReceipt():CheckoutReceiptReport{
  return buildCheckoutReceipt([
    {id:'checkout-receipt_0',label:'checkout-receipt item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'checkout-receipt_1',label:'checkout-receipt item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'checkout-receipt_2',label:'checkout-receipt item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'checkout-receipt_3',label:'checkout-receipt item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'checkout-receipt_4',label:'checkout-receipt item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'checkout-receipt_5',label:'checkout-receipt item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'checkout-receipt_6',label:'checkout-receipt item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'checkout-receipt_7',label:'checkout-receipt item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactCheckoutReceipt(report:CheckoutReceiptReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneCheckoutReceipt(report:CheckoutReceiptReport){return structuredClone(report)}
