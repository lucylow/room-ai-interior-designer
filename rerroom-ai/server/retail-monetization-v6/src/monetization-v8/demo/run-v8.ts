import { CommerceApp } from '../../core/commerce-app';
import type { CheckoutContext, CommerceQuote, FraudAssessment } from '../types';
import { buildCheckoutGuard } from '../engine/checkout-readiness-engine';
import { validateQuoteIntegrity } from '../engine/quote-integrity-engine';
import { buildStripeCheckoutContract } from '../providers/stripe-checkout-contract';
import { buildShopifyCartContract } from '../providers/shopify-cart-contract';
import { mockStripeCheckoutLink, } from '../providers/stripe-checkout-contract';
import { mockShopifyCheckoutLink } from '../providers/shopify-cart-contract';

function main(){
  const app=new CommerceApp();
  const cart=app.createDemoCart('demo-v8-user',1500);
  app.addDemoProduct(cart,0); app.addDemoProduct(cart,5); app.addDemoProduct(cart,12);
  const address={line1:'100 Demo Ave',city:'Toronto',region:'ON',postalCode:'M5V1A1',country:'CA'};
  const priced=app.reprice(cart,address);
  const quote:CommerceQuote={id:`quote-v8-${priced.id}`,cartId:priced.id,version:1,currency:'CAD',state:'fresh',lines:priced.lines.map(l=>({lineId:l.id,variantId:l.variantId,unitAmount:l.unitPrice.amount,quantity:l.quantity,lineTotal:l.unitPrice.amount*l.quantity,currency:l.unitPrice.currency,lockedUntil:new Date(Date.now()+10*60*1000).toISOString()})),subtotal:priced.totals.subtotal.amount,discount:priced.totals.discount.amount,shipping:priced.totals.shipping.amount,tax:priced.totals.tax.amount,total:priced.totals.total.amount,generatedAt:new Date().toISOString(),expiresAt:new Date(Date.now()+10*60*1000).toISOString(),hash:`hash-${priced.id}`};
  const fraud:FraudAssessment={score:.04,decision:'allow',signals:[],generatedAt:new Date().toISOString()};
  const context:CheckoutContext={cart:priced,quote,address,email:'demo@example.com',checkoutMode:'hosted',provider:'stripe',requestId:'req-v8-demo'};
  const guard=buildCheckoutGuard(priced,quote,address,context.email,fraud);
  const integrity=validateQuoteIntegrity(priced,quote,priced.lines.map(l=>({variantId:l.variantId,amount:l.unitPrice.amount,currency:'CAD',observedAt:new Date().toISOString(),source:'demo'})),priced.lines.map(l=>({variantId:l.variantId,available:4,reserved:0,observedAt:new Date().toISOString(),source:'demo'})));
  const stripe=buildStripeCheckoutContract(context,Object.fromEntries(priced.lines.map(l=>[l.variantId,`price_demo_${l.variantId}`])),'https://app.reroom.ai/success','https://app.reroom.ai/cancel');
  const shopify=buildShopifyCartContract({...context,provider:'shopify'},Object.fromEntries(priced.lines.map(l=>[l.variantId,`gid://shopify/ProductVariant/${l.variantId}`])));
  const output={cartId:priced.id,amount:priced.totals.total,guard,integrity,stripe,shopify,stripeLink:mockStripeCheckoutLink(context),shopifyLink:mockShopifyCheckoutLink(context),status:guard.allowed&&integrity.valid?'PASS':'REVIEW'};
  console.log(JSON.stringify(output,null,2));
}
main();
