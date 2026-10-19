import type { CommerceCart, CheckoutRequest, CheckoutSession, CommerceOrder, ProductVariant, Money } from '../types/commerce';
export interface RetailCheckoutProvider { readonly name: string; createSession(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession>; cancelSession(sessionId:string):Promise<void>; }
export interface CatalogProvider { readonly name:string; getVariant(variantId:string):Promise<ProductVariant|null>; getProduct(productId:string):Promise<import('../types/commerce').CommerceProduct|null>; }
export interface OrderProvider { readonly name:string; verifyPayment(event:unknown):{ok:boolean,externalOrderId?:string,total?:Money}; }
