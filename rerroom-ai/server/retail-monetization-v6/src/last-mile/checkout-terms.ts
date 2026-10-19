export interface CheckoutTermsLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface CheckoutTermsReport{ok:boolean;total:number;currency:'CAD'|'USD';items:CheckoutTermsLine[];warnings:string[];nextAction:string}
export function buildCheckoutTerms(items:CheckoutTermsLine[], cap=5000):CheckoutTermsReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('checkout-terms:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoCheckoutTerms():CheckoutTermsReport{
  return buildCheckoutTerms([
    {id:'checkout-terms_0',label:'checkout-terms item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'checkout-terms_1',label:'checkout-terms item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'checkout-terms_2',label:'checkout-terms item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'checkout-terms_3',label:'checkout-terms item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'checkout-terms_4',label:'checkout-terms item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'checkout-terms_5',label:'checkout-terms item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'checkout-terms_6',label:'checkout-terms item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'checkout-terms_7',label:'checkout-terms item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactCheckoutTerms(report:CheckoutTermsReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneCheckoutTerms(report:CheckoutTermsReport){return structuredClone(report)}
