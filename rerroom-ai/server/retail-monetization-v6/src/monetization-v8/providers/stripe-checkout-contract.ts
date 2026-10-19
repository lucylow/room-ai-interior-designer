import type { CheckoutLink, CheckoutContext } from '../types';
import { roundMoney } from '../types';

export interface StripeCheckoutLine { priceId:string; quantity:number; }
export interface StripeCheckoutContract { mode:'payment'|'subscription'; lineItems:StripeCheckoutLine[]; clientReferenceId:string; successUrl:string; cancelUrl:string; automaticTax:boolean; metadata:Record<string,string>; }

export function buildStripeCheckoutContract(ctx:CheckoutContext, priceIds:Record<string,string>, successUrl:string, cancelUrl:string):StripeCheckoutContract {
  const lineItems=ctx.cart.lines.map(line=>({priceId:priceIds[line.variantId] ?? `mock_price_${line.variantId}`,quantity:line.quantity}));
  return {
    mode:'payment',
    lineItems,
    clientReferenceId:ctx.cart.id,
    successUrl,
    cancelUrl,
    automaticTax:true,
    metadata:{projectId:ctx.cart.projectId ?? '', quoteId:ctx.quote.id, quoteTotal:String(roundMoney(ctx.quote.total)), requestId:ctx.requestId},
  };
}

export function mockStripeCheckoutLink(ctx:CheckoutContext):CheckoutLink {
  return {provider:'stripe',url:`https://checkout.stripe.test/c/${ctx.cart.id}`,expiresAt:new Date(Date.now()+30*60*1000).toISOString(),sessionId:`cs_demo_${ctx.cart.id}`,mode:ctx.checkoutMode};
}
