import type { CommerceCart } from "../../types/commerce";
import type { CommerceQuote, QuoteLine, InventorySnapshot, PriceSnapshot } from "../types";
import { roundMoney } from "../types";

export interface QuoteIntegrityIssue { code:string; severity:"warning"|"blocker"; lineId?:string; expected?:number; actual?:number; detail:string; }
export interface QuoteIntegrityResult { valid:boolean; stale:boolean; issues:QuoteIntegrityIssue[]; delta:number; }

export function validateQuoteIntegrity(cart:CommerceCart,quote:CommerceQuote,prices:PriceSnapshot[],inventory:InventorySnapshot[],now=Date.now()):QuoteIntegrityResult {
  const issues:QuoteIntegrityIssue[]=[];
  if(Date.parse(quote.expiresAt)<=now){ issues.push({code:"quote_expired",severity:"blocker",detail:"quote expiration has passed"}); }
  const priceMap=new Map(prices.map(x=>[x.variantId,x]));
  const invMap=new Map(inventory.map(x=>[x.variantId,x]));
  let delta=0;
  for(const line of quote.lines){
    const price=priceMap.get(line.variantId);
    if(price){ const expected=roundMoney(price.amount*line.quantity); delta+=expected-line.lineTotal; if(Math.abs(expected-line.lineTotal)>.01) issues.push({code:"price_changed",severity:"blocker",lineId:line.lineId,expected:line.lineTotal,actual:expected,detail:"retailer price differs from quote"}); }
    const inv=invMap.get(line.variantId);
    if(inv && inv.available<line.quantity) issues.push({code:"inventory_changed",severity:"blocker",lineId:line.lineId,expected:line.quantity,actual:inv.available,detail:"requested quantity is no longer available"});
  }
  const stale=Math.abs(delta)>.01;
  if(stale && !issues.some(x=>x.code==="price_changed")) issues.push({code:"quote_stale",severity:"warning",detail:"underlying values drifted"});
  return {valid:!issues.some(x=>x.severity==="blocker"),stale,issues,delta:roundMoney(delta)};
}

export function quoteLinesFromCart(cart:CommerceCart):QuoteLine[]{ return cart.lines.map(line=>({lineId:line.id,variantId:line.variantId,unitAmount:line.unitPrice.amount,quantity:line.quantity,lineTotal:roundMoney(line.unitPrice.amount*line.quantity),currency:line.unitPrice.currency,lockedUntil:new Date(Date.now()+10*60*1000).toISOString()})); }
