import { PaywallV10Engine } from './src/monetization-v10/paywall/engine';
import { V10_CATALOG } from './src/monetization-v10/catalog';
import { CreditLedger } from './src/monetization-v10/credits/ledger';
import { kpis } from './src/monetization-v10/metrics/kpi';
import { digitalPurchaseChecklist } from './src/monetization-v10/app-review/digital-goods';
import { OfferCodeBook } from './src/monetization-v10/offers/offer-code';
async function main(){
 const engine=new PaywallV10Engine();
 const context={source:'render',projectCount:3,generationsUsed:11,trialEligible:false,locale:'en-CA',experimentId:'annual-first'};
 const paywall=engine.recommend(context);
 const ledger=new CreditLedger(); ledger.grant('demo-user','ai',25,'welcome'); ledger.consume('demo-user','ai',3,'demo-generation');
 const codes=new OfferCodeBook(); codes.seed([{code:'DEMO25',productId:'com.reroom.ai.pro.yearly',kind:'promo',remaining:100,expiresAt:new Date(Date.now()+86400000).toISOString()}]);
 const redeemed=codes.redeem('DEMO25');
 const checks=digitalPurchaseChecklist();
 const report={catalog:V10_CATALOG.length,paywall,creditBalance:ledger.snapshot('demo-user'),redeemedOffer:redeemed?.productId??null,checklistPassed:checks.filter(c=>c.pass).length,checklistTotal:checks.length,kpis:kpis({paywall:100,purchases:14,trials:24,renewals:32,eligibleRenewals:40,refunds:2,transactions:46,revenue:987.45,users:310})};
 console.log(JSON.stringify(report,null,2));
}
main();
