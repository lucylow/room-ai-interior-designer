import { CommerceApp } from '../core/commerce-app';
import { fixedClock } from '../core/clock';
import type { CheckoutRequest } from '../types/commerce';

export interface DemoScenarioResult { name:string; cartId:string; productCount:number; subtotal:number; discount:number; shipping:number; tax:number; total:number; budget:number; headroom:number; checkoutProvider:string; checkoutUrl?:string; status:'PASS'|'FAIL'; notes:string[]; }

export async function runCommerceScenario(name:string,budget:number,productIndexes:number[],provider:'demo'|'affiliate'='demo'):Promise<DemoScenarioResult>{
  const app=new CommerceApp();
  const cart=app.createDemoCart('demo-'+name.replace(/\\W+/g,'-').toLowerCase(),budget);
  for(const idx of productIndexes) app.addDemoProduct(cart,idx,1);
  const priced=app.reprice(cart,{line1:'100 Demo Ave',city:'Toronto',region:'ON',postalCode:'M5V1A1',country:'CA'});
  const notes:string[]=[];
  if(priced.totals.total.amount>budget) notes.push('budget_exceeded');
  const request:CheckoutRequest={cartId:priced.id,provider,fulfillment:'retailer_checkout',returnUrl:'https://app.reroom.ai/checkout/success',cancelUrl:'https://app.reroom.ai/checkout/cancel',idempotencyKey:`demo-${name}-${budget}-${productIndexes.join('-')}`};
  let session;
  try { session=await app.startCheckout(request,priced); }
  catch(error){ notes.push(error instanceof Error?error.message:'checkout_error'); }
  const status=notes.length===0?'PASS':'FAIL';
  return {name,cartId:priced.id,productCount:priced.lines.length,subtotal:priced.totals.subtotal.amount,discount:priced.totals.discount.amount,shipping:priced.totals.shipping.amount,tax:priced.totals.tax.amount,total:priced.totals.total.amount,budget,headroom:priced.budgetHeadroom.amount,checkoutProvider:provider,checkoutUrl:session?.checkoutUrl,status,notes};
}

export async function runFullDemo(){
  const started=fixedClock('2026-10-02T20:00:00.000Z').now();
  const scenarios=[] as DemoScenarioResult[];
  scenarios.push(await runCommerceScenario('living-room-750',750,[0,2,3],'demo'));
  scenarios.push(await runCommerceScenario('scandinavian-1500',1500,[8,12,18,24,32],'demo'));
  scenarios.push(await runCommerceScenario('affiliate-chair',500,[1],'affiliate'));
  const passed=scenarios.filter(x=>x.status==='PASS').length;
  return {startedAt:started.toISOString(),scenarioCount:scenarios.length,passed,failed:scenarios.length-passed,scenarios,overall:passed===scenarios.length?'PASS':'REVIEW'};
}

export interface CheckoutEvent { type:string; at:string; cartId:string; amount?:number; metadata:Record<string,string> }
export class DemoEventLog { private events:CheckoutEvent[]=[]; add(event:Omit<CheckoutEvent,'at'>){const e={...event,at:new Date().toISOString()};this.events.push(e);return e} list(){return [...this.events]} summary(){const grouped=new Map<string,number>();for(const e of this.events)grouped.set(e.type,(grouped.get(e.type)??0)+1);return Object.fromEntries(grouped)}}

export function simulatePurchaseJourney(log:DemoEventLog,cartId:string,total:number){
  const steps=['product_view','try_in_room','add_to_cart','checkout_started','purchase'];
  for(const [i,step] of steps.entries()) log.add({type:step,cartId,amount:step==='purchase'?total:undefined,metadata:{step:String(i),mode:'demo'}});
  return log.summary();
}

export function validateDemoResult(result:DemoScenarioResult){
  const problems:string[]=[];
  if(result.budget<0)problems.push('negative_budget');
  if(result.total<0)problems.push('negative_total');
  if(result.total>result.budget)problems.push('hard_budget_violation');
  if(result.productCount===0)problems.push('empty_demo_cart');
  if(result.status==='PASS'&&!result.checkoutUrl)problems.push('missing_checkout_url');
  return {ok:problems.length===0,problems};
}
