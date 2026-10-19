import { CommerceApp } from '../core/commerce-app';
import { funnel } from '../monetization/conversion';
import { runLaunchChecks } from '../final/launch-readiness';
import { demoChecklist } from '../final/launch-readiness';
import { simulatePurchaseJourney, DemoEventLog } from '../last-mile/commerce-scenario-runner';
import type { CheckoutRequest } from '../types/commerce';

async function main(){
  const app=new CommerceApp();
  const cart=app.createDemoCart('demo-checkout-user',1500);
  app.addDemoProduct(cart,0);
  app.addDemoProduct(cart,5);
  app.addDemoProduct(cart,12);
  const priced=app.reprice(cart,{line1:'100 Demo Ave',city:'Toronto',region:'ON',postalCode:'M5V1A1',country:'CA'});
  const req:CheckoutRequest={cartId:priced.id,provider:'demo',fulfillment:'retailer_checkout',returnUrl:'https://app.reroom.ai/checkout/success',cancelUrl:'https://app.reroom.ai/checkout/cancel',idempotencyKey:'demo_checkout_key_12345'};
  const session=await app.startCheckout(req,priced);
  const log=new DemoEventLog();simulatePurchaseJourney(log,priced.id,priced.totals.total.amount);
  const checks=runLaunchChecks(priced,session);
  const output={cartId:priced.id,lines:priced.lines.map(l=>({title:l.title,quantity:l.quantity,unitPrice:l.unitPrice})),totals:priced.totals,budgetHeadroom:priced.budgetHeadroom,checkout:{provider:session.provider,id:session.id,url:session.checkoutUrl,status:session.status},launch:checks,funnel:funnel(app.events.all()),journey:log.summary(),checklist:demoChecklist(),status:checks.every(c=>c.severity==='blocker'?c.ok:true)?'PASS':'REVIEW'};
  console.log(JSON.stringify(output,null,2));
}
main().catch(err=>{throw err});
