import { deterministicId } from '../core/id';
import { systemClock } from '../core/clock';
import type { CommerceCart, CheckoutRequest, CheckoutSession } from '../types/commerce';
import type { RetailCheckoutProvider } from './provider';
export class DemoCheckoutProvider implements RetailCheckoutProvider { readonly name='demo';
 async createSession(req:CheckoutRequest,cart:CommerceCart):Promise<CheckoutSession>{const now=systemClock.now();return {id:deterministicId('demo',req.idempotencyKey),provider:'demo',cartId:cart.id,checkoutUrl:`https://demo.reroom.local/checkout/${cart.id}`,status:'open',expiresAt:new Date(now.getTime()+30*60_000).toISOString(),orderIntentId:deterministicId('intent',cart.id+req.idempotencyKey)}}
 async cancelSession(_id:string):Promise<void>{return;}
}
