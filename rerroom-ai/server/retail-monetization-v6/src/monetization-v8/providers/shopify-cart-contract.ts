import type { CheckoutContext, CheckoutLink } from '../types';

export interface ShopifyCartLineInput { merchandiseId:string; quantity:number; attributes:{key:string;value:string}[]; }
export interface ShopifyCartCreateContract { lines:ShopifyCartLineInput[]; attributes:{key:string;value:string}[]; buyerIdentity?:{email?:string;countryCode?:string}; }

export function buildShopifyCartContract(ctx:CheckoutContext, merchandiseIds:Record<string,string>):ShopifyCartCreateContract {
  return {
    lines:ctx.cart.lines.map(line=>({
      merchandiseId:merchandiseIds[line.variantId] ?? `gid://shopify/ProductVariant/demo-${line.variantId}`,
      quantity:line.quantity,
      attributes:[{key:'reroom_project',value:ctx.cart.projectId ?? ''},{key:'reroom_quote',value:ctx.quote.id}],
    })),
    attributes:[{key:'reroom_cart',value:ctx.cart.id},{key:'reroom_request',value:ctx.requestId}],
    buyerIdentity:{email:ctx.email,countryCode:ctx.address?.country},
  };
}

export function mockShopifyCheckoutLink(ctx:CheckoutContext):CheckoutLink {
  return {provider:'shopify',url:`https://checkout.shopify.test/c/${ctx.cart.id}`,expiresAt:new Date(Date.now()+20*60*1000).toISOString(),sessionId:`shopify_demo_${ctx.cart.id}`,mode:'hosted'};
}
