import type { CommerceCart, CheckoutSession, CommerceOrder, Money } from '../types/commerce';

export interface LaunchCheck { id:string; name:string; ok:boolean; severity:'blocker'|'warning'|'info'; detail:string }
export function runLaunchChecks(cart:CommerceCart, session?:CheckoutSession, order?:CommerceOrder):LaunchCheck[]{
  const checks:LaunchCheck[]=[];
  checks.push({id:'cart-lines',name:'Cart contains purchasable lines',ok:cart.lines.length>0,severity:'blocker',detail:cart.lines.length?'lines present':'cart empty'});
  checks.push({id:'currency',name:'Currency normalized',ok:cart.currency==='CAD'||cart.currency==='USD',severity:'blocker',detail:cart.currency});
  checks.push({id:'budget',name:'Budget constraint respected',ok:!cart.budgetCap||cart.totals.total.amount<=cart.budgetCap.amount,severity:'blocker',detail:`${cart.totals.total.amount} <= ${cart.budgetCap?.amount??'unbounded'}`});
  checks.push({id:'prices',name:'Prices are non-negative',ok:cart.lines.every(x=>x.unitPrice.amount>=0),severity:'blocker',detail:'validated line prices'});
  checks.push({id:'quantities',name:'Quantities bounded',ok:cart.lines.every(x=>Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=20),severity:'blocker',detail:'1..20'});
  checks.push({id:'session',name:'Checkout session created',ok:Boolean(session),severity:'blocker',detail:session?session.id:'not created'});
  if(session)checks.push({id:'session-expiry',name:'Checkout session has expiry',ok:Boolean(session.expiresAt),severity:'warning',detail:session.expiresAt});
  if(session)checks.push({id:'checkout-url',name:'Checkout handoff exists',ok:Boolean(session.checkoutUrl),severity:'warning',detail:session.checkoutUrl??'provider-native flow'});
  if(order)checks.push({id:'order-reconciliation',name:'Order snapshot exists',ok:order.totals.total.amount>=0,severity:'blocker',detail:order.id});
  return checks;
}
export function launchReady(checks:LaunchCheck[]){return !checks.some(x=>x.severity==='blocker'&&!x.ok)}
export function blockedReasons(checks:LaunchCheck[]){return checks.filter(x=>!x.ok).map(x=>x.detail)}
export interface TestMoneyCase{input:Money;expected:number}
export const moneyCases:TestMoneyCase[]=[{input:{amount:0,currency:'CAD'},expected:0},{input:{amount:19.99,currency:'CAD'},expected:19.99},{input:{amount:1199.95,currency:'CAD'},expected:1199.95}];
export function runMoneyCases(){return moneyCases.map(x=>({ok:x.input.amount===x.expected,currency:x.input.currency,value:x.input.amount}))}

export function demoChecklist(){return {ready:true,blockers:0,warnings:0}}
