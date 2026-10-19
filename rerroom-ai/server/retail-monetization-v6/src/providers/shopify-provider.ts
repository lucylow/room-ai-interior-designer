import { requestJson } from '../core/provider-http';
import { validateCart } from '../cart/cart-validator';
import type { CommerceCart, CheckoutRequest, CheckoutSession } from '../types/commerce';
import type { RetailCheckoutProvider } from './provider';

interface ShopifyConfig { shopDomain: string; storefrontAccessToken: string; apiVersion?: string; timeoutMs?: number; }
interface ShopifyResponse {
  errors?: unknown[];
  data?: { cartCreate?: { cart?: { id?: string; checkoutUrl?: string }; userErrors?: Array<{ message?: string }> } };
}
const cartCreateMutation = 'mutation CartCreate($input: CartInput!){ cartCreate(input:$input){ cart { id checkoutUrl } userErrors { field message } warnings { message } } }';

export class ShopifyCheckoutProvider implements RetailCheckoutProvider {
  readonly name = 'shopify';
  private readonly shopHost: string;
  private readonly apiVersion: string;

  constructor(private readonly config: ShopifyConfig, private readonly fetcher: typeof fetch = fetch) {
    if (!config.storefrontAccessToken?.trim()) throw new Error('shopify_token_missing');
    let shop: URL;
    try { shop = new URL(`https://${config.shopDomain}`); }
    catch { throw new Error('shopify_domain_invalid'); }
    if (!config.shopDomain || shop.hostname !== config.shopDomain.toLowerCase() || shop.username || shop.password || shop.pathname !== '/') {
      throw new Error('shopify_domain_invalid');
    }
    const version = config.apiVersion ?? '2026-10';
    if (!/^\d{4}-\d{2}$/.test(version)) throw new Error('shopify_api_version_invalid');
    this.shopHost = shop.hostname;
    this.apiVersion = version;
  }

  async createSession(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession> {
    if (validateCart(cart).some((issue) => issue.severity === 'error')) throw new Error('shopify_cart_invalid');
    const endpoint = `https://${this.shopHost}/api/${this.apiVersion}/graphql.json`;
    const body = await requestJson<ShopifyResponse>('shopify', endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.config.storefrontAccessToken,
        'X-Request-Id': req.idempotencyKey,
      },
      body: JSON.stringify({
        query: cartCreateMutation,
        variables: { input: { lines: cart.lines.map((line) => ({ quantity: line.quantity, merchandiseId: line.variantId })) } },
      }),
    }, this.fetcher, this.config.timeoutMs);
    if (body.errors?.length) throw new Error('shopify_graphql_rejected');
    const payload = body.data?.cartCreate;
    if (payload?.userErrors?.length) throw new Error('shopify_cart_rejected');
    const id = payload?.cart?.id;
    if (!id) throw new Error('shopify_cart_response_invalid');
    let checkout: URL;
    try { checkout = new URL(payload?.cart?.checkoutUrl ?? ''); }
    catch { throw new Error('shopify_checkout_url_invalid'); }
    if (checkout.protocol !== 'https:' || checkout.username || checkout.password || checkout.hostname !== this.shopHost) {
      throw new Error('shopify_checkout_url_invalid');
    }
    return {
      id, provider: 'shopify', cartId: cart.id, checkoutUrl: checkout.toString(), status: 'open',
      expiresAt: new Date(Date.now() + 30 * 60_000).toISOString(),
      orderIntentId: `intent_${cart.id}_${req.idempotencyKey}`,
    };
  }

  async cancelSession(_sessionId: string): Promise<void> {
    throw new Error('shopify_session_cancellation_unsupported');
  }
}
