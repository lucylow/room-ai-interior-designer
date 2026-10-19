import type { CommerceCart } from "../../types/commerce";
import type { CommerceQuote, CheckoutContext, Transaction } from "../types";
import { money, roundMoney } from "../types";

export interface PurchaseSignal { key:string; weight:number; positive:boolean; detail:string; }
export interface PurchaseIntent { score:number; stage:"browse"|"consider"|"cart"|"checkout"|"purchase"; signals:PurchaseSignal[]; blockers:string[]; nextBestActions:string[]; }

export function inferPurchaseIntent(cart:CommerceCart,quote:CommerceQuote,context:CheckoutContext):PurchaseIntent {
  const signals:PurchaseSignal[]=[]; const blockers:string[]=[];
  if(cart.lines.length) signals.push({key:"has_lines",weight:.24,positive:true,detail:"cart contains products"});
  if(cart.projectId) signals.push({key:"project_context",weight:.12,positive:true,detail:"cart is tied to a design project"});
  if(quote.state==="fresh") signals.push({key:"fresh_quote",weight:.18,positive:true,detail:"pricing quote is fresh"});
  if(quote.state!=="fresh") blockers.push("quote_not_fresh");
  if(!context.email.includes("@")) blockers.push("email_invalid");
  if(context.cart.budgetCap && quote.total>context.cart.budgetCap.amount) blockers.push("budget_exceeded");
  const score=Math.max(0,Math.min(1,signals.reduce((s,x)=>s+x.weight,0)-blockers.length*.18+.35));
  const stage:PurchaseIntent["stage"]=score>.85?"checkout":score>.68?"cart":score>.45?"consider":"browse";
  const nextBestActions = blockers.length?blockers.map(b=>`resolve:${b}`):stage==="checkout"?["create_checkout_session","show_delivery_options"]:["try_in_room","compare_alternatives"];
  return {score:roundMoney(score),stage,signals,blockers,nextBestActions};
}

export function purchaseIntentAsTransaction(cart:CommerceCart,quote:CommerceQuote,context:CheckoutContext):Transaction {
  const intent=inferPurchaseIntent(cart,quote,context);
  return {id:`txn-${cart.id}-${quote.version}`,cartId:cart.id,orderIntentId:`oi-${cart.id}`,quoteId:quote.id,state:intent.blockers.length?"quoted":"checkout_ready",checkoutMode:context.checkoutMode,total:money(quote.total,quote.currency),customerId:context.email,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
}
