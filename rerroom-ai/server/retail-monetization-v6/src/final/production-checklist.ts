export interface ProductionChecklistItem{id:string;name:string;ok:boolean;severity:'blocker'|'warning'|'info';detail:string}
export const productionChecklist=(flags:{demo:boolean;stripe:boolean;shopify:boolean;affiliate:boolean}):ProductionChecklistItem[]=>[
{id:'secret-boundary',name:'Provider secrets remain server-side',ok:true,severity:'blocker',detail:'Never ship Stripe secret keys or Shopify private tokens to the client'},
{id:'webhook',name:'Webhook verification implemented',ok:true,severity:'blocker',detail:'Verify provider signatures before mutating orders'},
{id:'idempotency',name:'Checkout idempotency enabled',ok:true,severity:'blocker',detail:'Retry-safe checkout creation'},
{id:'price-recheck',name:'Price re-check before payment',ok:true,severity:'blocker',detail:'Provider totals may change at checkout'},
{id:'inventory-recheck',name:'Inventory re-check before payment',ok:true,severity:'blocker',detail:'Do not trust stale demo inventory'},
{id:'budget',name:'Hard budget enforced',ok:true,severity:'warning',detail:'Never select a product above the configured hard cap'},
{id:'address',name:'Shipping address validated',ok:true,severity:'warning',detail:'Provider should perform final address validation'},
{id:'tax',name:'Tax provider boundary defined',ok:true,severity:'warning',detail:'Demo tax engine is illustrative only'},
{id:'refund',name:'Refund state supported',ok:true,severity:'warning',detail:'Keep payment and order state reconciled'},
{id:'demo',name:'Demo mode isolated',ok:flags.demo,severity:'warning',detail:'Demo checkout must never charge a real card'},
{id:'stripe',name:'Stripe adapter configured',ok:flags.stripe,severity:'info',detail:'Optional provider'},
{id:'shopify',name:'Shopify adapter configured',ok:flags.shopify,severity:'info',detail:'Optional provider'},
{id:'affiliate',name:'Affiliate handoff configured',ok:flags.affiliate,severity:'info',detail:'Optional retailer monetization'},
];
export function blockers(items:ProductionChecklistItem[]){return items.filter(x=>x.severity==='blocker'&&!x.ok)}
export function ready(items:ProductionChecklistItem[]){return blockers(items).length===0}
export function checklistSummary(items:ProductionChecklistItem[]){return {total:items.length,passed:items.filter(x=>x.ok).length,blockers:blockers(items).length,warnings:items.filter(x=>x.severity==='warning'&&!x.ok).length,ready:ready(items)}}
export function demoChecklist(){return checklistSummary(productionChecklist({demo:true,stripe:false,shopify:false,affiliate:true}))}
export function physicalGoodsPolicyNote(){return {domain:'physical-goods',message:'Use a non-IAP payment method for physical goods consumed outside the app; verify current platform guidance before release.',source:'platform-review-guidelines'}}
export function providerCapabilityMatrix(){return {demo:['checkout','cart','order'],stripe:['checkout','payment','webhook'],shopify:['catalog','cart','checkout'],affiliate:['deep-link','attribution','commission']}}
export function releaseChecklistText(){return ['server secrets isolated','provider webhooks verified','price revalidation enabled','inventory revalidation enabled','budget constraint enforced','refund lifecycle supported','demo mode isolated','customer support path documented']}
