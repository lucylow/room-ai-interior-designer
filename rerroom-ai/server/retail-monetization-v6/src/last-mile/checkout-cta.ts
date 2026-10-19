export interface CheckoutCtaLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface CheckoutCtaReport{ok:boolean;total:number;currency:'CAD'|'USD';items:CheckoutCtaLine[];warnings:string[];nextAction:string}
export function buildCheckoutCta(items:CheckoutCtaLine[], cap=5000):CheckoutCtaReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('checkout-cta:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoCheckoutCta():CheckoutCtaReport{
  return buildCheckoutCta([
    {id:'checkout-cta_0',label:'checkout-cta item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'checkout-cta_1',label:'checkout-cta item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'checkout-cta_2',label:'checkout-cta item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'checkout-cta_3',label:'checkout-cta item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'checkout-cta_4',label:'checkout-cta item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'checkout-cta_5',label:'checkout-cta item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'checkout-cta_6',label:'checkout-cta item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'checkout-cta_7',label:'checkout-cta item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactCheckoutCta(report:CheckoutCtaReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneCheckoutCta(report:CheckoutCtaReport){return structuredClone(report)}
