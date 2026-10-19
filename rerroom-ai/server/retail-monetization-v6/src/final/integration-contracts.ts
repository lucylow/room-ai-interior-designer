export interface CheckoutLineInput { productId:string; variantId:string; quantity:number; roomId?:string; conceptId?:string; placementId?:string }
export interface CheckoutCartInput { userId:string; projectId?:string; currency:'CAD'|'USD'; budgetCap?:number; lines:CheckoutLineInput[] }
export interface CheckoutQuote { subtotal:number; discount:number; shipping:number; tax:number; total:number; budgetHeadroom:number; currency:'CAD'|'USD' }
export interface CheckoutValidation { ok:boolean; errors:string[]; warnings:string[] }
export interface RetailerSession { provider:'shopify'|'stripe'|'affiliate'|'demo'; externalId:string; checkoutUrl?:string; expiresAt:string; cartReference:string }
export interface OrderSnapshot { id:string; status:string; total:number; currency:'CAD'|'USD'; externalOrderId?:string; createdAt:string }
export interface RevenueSnapshot { gross:number; platformFee:number; commission:number; net:number; currency:'CAD'|'USD' }

export const validCurrencies=new Set(['CAD','USD']);
export const validProviders=new Set(['shopify','stripe','affiliate','demo']);
export const validFulfillment=new Set(['ship','pickup','retailer_checkout']);

export function validateCartInput(input:CheckoutCartInput):CheckoutValidation{
 const errors:string[]=[]; const warnings:string[]=[];
 if(!input.userId.trim())errors.push('user_required');
 if(!validCurrencies.has(input.currency))errors.push('currency_invalid');
 if(input.lines.length===0)errors.push('cart_empty');
 if(input.lines.length>100)errors.push('cart_line_limit');
 for(const line of input.lines){
  if(!line.productId)errors.push('product_id_required');
  if(!line.variantId)errors.push('variant_id_required');
  if(!Number.isInteger(line.quantity)||line.quantity<1)errors.push(`invalid_quantity:${line.variantId}`);
  if(line.quantity>20)errors.push(`quantity_limit:${line.variantId}`);
 }
 if(input.budgetCap!==undefined && input.budgetCap<0)errors.push('budget_negative');
 if(input.projectId)warnings.push('project_context_attached');
 return {ok:errors.length===0,errors,warnings};
}

export function createQuoteSnapshot(total:CheckoutQuote):CheckoutQuote{return JSON.parse(JSON.stringify(total)) as CheckoutQuote}
export function assertBudget(quote:CheckoutQuote){if(quote.total>quote.budgetHeadroom+quote.total)throw new Error('budget_state_corrupt');return quote.budgetHeadroom>=0}
export function assertCurrency(quote:CheckoutQuote,expected:'CAD'|'USD'){if(quote.currency!==expected)throw new Error('currency_mismatch');return true}

export function buildRetailerCartAttributes(input:CheckoutCartInput){return {
 rerroom_source:'ai-design-studio',
 rerroom_project:input.projectId??'',
 rerroom_user:input.userId,
 rerroom_line_count:String(input.lines.length),
 rerroom_currency:input.currency,
 }}

export function buildAnalyticsMetadata(input:CheckoutCartInput){return {
 commerce_mode:'physical_goods',
 room_project:input.projectId??'none',
 ai_generated:'true',
 budget_control:input.budgetCap===undefined?'none':'hard-cap',
 line_count:String(input.lines.length),
 }}

export function buildPurchaseEvent(order:OrderSnapshot){return {type:'purchase' as const,orderId:order.id,value:{amount:order.total,currency:order.currency},metadata:{providerOrderId:order.externalOrderId??'',status:order.status}}}
export function buildCheckoutStarted(cartId:string,total:CheckoutQuote){return {type:'checkout_started' as const,cartId,value:{amount:total.total,currency:total.currency},metadata:{currency:total.currency}}}

export function normalizeQuantity(quantity:number){return Math.max(1,Math.min(20,Math.floor(quantity)))}
export function normalizeMoney(amount:number){if(!Number.isFinite(amount))return 0;return Math.round(Math.max(0,amount)*100)/100}
export function normalizedQuote(q:CheckoutQuote):CheckoutQuote{return {...q,subtotal:normalizeMoney(q.subtotal),discount:normalizeMoney(q.discount),shipping:normalizeMoney(q.shipping),tax:normalizeMoney(q.tax),total:normalizeMoney(q.total),budgetHeadroom:normalizeMoney(q.budgetHeadroom)}}

export interface CheckoutStateRecord { cartId:string; sessionId?:string; step:'cart'|'address'|'delivery'|'payment'|'review'|'redirect'|'complete'; startedAt:string; expiresAt?:string }
export function canEnterStep(current:CheckoutStateRecord['step'],next:CheckoutStateRecord['step']){const order=['cart','address','delivery','payment','review','redirect','complete'];return order.indexOf(next)>=order.indexOf(current)-1}
export function advanceStep(state:CheckoutStateRecord,next:CheckoutStateRecord['step']){if(!canEnterStep(state.step,next))throw new Error('checkout_step_regression');return {...state,step:next}}
export function expireSession(state:CheckoutStateRecord,now=Date.now()){if(!state.expiresAt)return false;return new Date(state.expiresAt).getTime()<=now}

export interface PriceLock { cartId:string; total:number; currency:'CAD'|'USD'; lockedAt:string; expiresAt:string; hash:string }
export function createPriceLock(cartId:string,total:CheckoutQuote,durationMs=10*60_000):PriceLock{const now=Date.now();return {cartId,total:total.total,currency:total.currency,lockedAt:new Date(now).toISOString(),expiresAt:new Date(now+durationMs).toISOString(),hash:`lock_${cartId}_${Math.round(total.total*100)}`}}
export function isPriceLockValid(lock:PriceLock,cartId:string,now=Date.now()){return lock.cartId===cartId&&new Date(lock.expiresAt).getTime()>now}

export interface RetailerDeepLink { provider:string; url:string; productId:string; variantId:string; campaign:string }
export function buildAffiliateDeepLink(base:string,productId:string,variantId:string,campaign:string):RetailerDeepLink{return {provider:'affiliate',url:`${base}?product=${encodeURIComponent(productId)}&variant=${encodeURIComponent(variantId)}&campaign=${encodeURIComponent(campaign)}`,productId,variantId,campaign}}

export interface CommissionLine { productId:string; orderId:string; gross:number; rate:number; commission:number; currency:'CAD'|'USD' }
export function commissionLine(input:Omit<CommissionLine,'commission'>):CommissionLine{return {...input,commission:normalizeMoney(input.gross*input.rate)}}
export function sumCommission(lines:CommissionLine[]){const currency=lines[0]?.currency??'CAD';return {amount:normalizeMoney(lines.reduce((s,l)=>s+l.commission,0)),currency}}

export interface RefundRequest { orderId:string; amount:number; reason:'customer_request'|'damaged'|'price_adjustment'|'duplicate' }
export function validateRefund(request:RefundRequest,orderTotal:number){const errors:string[]=[];if(request.amount<=0)errors.push('refund_non_positive');if(request.amount>orderTotal)errors.push('refund_exceeds_order');return {ok:errors.length===0,errors}}

export interface CartRecoveryCandidate { cartId:string; ageHours:number; total:number; hasCheckoutSession:boolean; recoverable:boolean; reason:string }
export function scoreRecovery(candidate:CartRecoveryCandidate){if(candidate.recoverable===false)return 0;const ageFactor=Math.max(0,1-candidate.ageHours/168);const sessionFactor=candidate.hasCheckoutSession?.85:.45;const valueFactor=Math.min(1,candidate.total/1000);return Math.round((.45*ageFactor+.35*sessionFactor+.2*valueFactor)*10000)/10000}

export interface CommerceFeatureFlags { demo:boolean; retailerCheckout:boolean; stripeCheckout:boolean; shopifyCheckout:boolean; affiliateLinks:boolean; subscriptions:boolean; commissionTracking:boolean }
export function defaultFlags():CommerceFeatureFlags{return {demo:true,retailerCheckout:true,stripeCheckout:false,shopifyCheckout:false,affiliateLinks:true,subscriptions:false,commissionTracking:true}}
export function enableProvider(flags:CommerceFeatureFlags,provider:'stripe'|'shopify'|'affiliate'){return {...flags,[provider==='affiliate'?'affiliateLinks':provider==='stripe'?'stripeCheckout':'shopifyCheckout']:true}}

export interface PurchaseReceipt { orderId:string; title:string; total:number; currency:'CAD'|'USD'; customerEmail?:string; retailer:string; externalOrderId?:string; generatedAt:string }
export function receipt(order:OrderSnapshot,customerEmail:string|undefined,retailer:string):PurchaseReceipt{return {orderId:order.id,title:'RE:ROOM AI purchase',total:order.total,currency:order.currency,customerEmail,retailer,externalOrderId:order.externalOrderId,generatedAt:new Date().toISOString()}}

export interface CommerceHealth { provider:string; status:'healthy'|'degraded'|'offline'; checkedAt:string; latencyMs:number; message:string }
export function health(provider:string,latencyMs:number,status:CommerceHealth['status']='healthy'):CommerceHealth{return {provider,status,checkedAt:new Date().toISOString(),latencyMs,message:status==='healthy'?'ready':status==='degraded'?'partial':'offline'}}

export function demoContractSuite(){
 const cart:CheckoutCartInput={userId:'demo-user',projectId:'demo-project',currency:'CAD',budgetCap:1500,lines:[{productId:'demo-sofa',variantId:'demo-sofa-v1',quantity:1,roomId:'living-room',conceptId:'concept-1',placementId:'placement-sofa'},{productId:'demo-table',variantId:'demo-table-v1',quantity:1,roomId:'living-room',conceptId:'concept-1',placementId:'placement-table'}]};
 const validation=validateCartInput(cart);
 const quote=normalizedQuote({subtotal:640,discount:64,shipping:29,tax:78.65,total:683.65,budgetHeadroom:816.35,currency:'CAD'});
 const lock=createPriceLock('demo-cart',quote);
 return {validation,quote,lock,analytics:buildAnalyticsMetadata(cart),attributes:buildRetailerCartAttributes(cart),recovery:scoreRecovery({cartId:'demo-cart',ageHours:4,total:quote.total,hasCheckoutSession:false,recoverable:true,reason:'demo'})};
}
