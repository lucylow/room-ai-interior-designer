import { deterministicId } from '../core/id';
import { validateCart } from '../cart/cart-validator';
import type { CommerceCart, CheckoutRequest, CheckoutSession } from '../types/commerce';
import type { RetailCheckoutProvider } from './provider';

export interface AffiliateLinkBuilder { build(productId: string, variantId: string, subId: string): string; }

export class AffiliateCheckoutProvider implements RetailCheckoutProvider {
  readonly name = 'affiliate';
  constructor(private readonly buildLink: AffiliateLinkBuilder['build']) {}

  async createSession(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession> {
    if (validateCart(cart).some((issue) => issue.severity === 'error')) throw new Error('affiliate_cart_invalid');
    const line = cart.lines[0];
    let checkout: URL;
    try { checkout = new URL(this.buildLink(line.productId, line.variantId, req.idempotencyKey)); }
    catch { throw new Error('affiliate_url_invalid'); }
    if (checkout.protocol !== 'https:' || checkout.username || checkout.password || checkout.hostname.length > 253) {
      throw new Error('affiliate_url_invalid');
    }
    return {
      id: deterministicId('affiliate', line.variantId + req.idempotencyKey), provider: 'affiliate', cartId: cart.id,
      checkoutUrl: checkout.toString(), status: 'open', expiresAt: new Date(Date.now() + 20 * 60_000).toISOString(),
      orderIntentId: `intent_${cart.id}_${req.idempotencyKey}`,
    };
  }

  async cancelSession(_sessionId: string): Promise<void> { throw new Error('affiliate_session_cancellation_unsupported'); }
}
