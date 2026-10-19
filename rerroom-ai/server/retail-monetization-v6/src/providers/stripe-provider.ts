import { requestJson } from '../core/provider-http';
import { validateCart } from '../cart/cart-validator';
import type { CommerceCart, CheckoutRequest, CheckoutSession } from '../types/commerce';
import type { RetailCheckoutProvider } from './provider';

export interface StripeConfig { secretKey: string; apiBase?: string; timeoutMs?: number; }
interface StripeSessionResponse { id?: string; url?: string; expires_at?: number; status?: string; }

export class StripeCheckoutProvider implements RetailCheckoutProvider {
  readonly name = 'stripe';
  private readonly apiBase: string;

  constructor(private readonly config: StripeConfig, private readonly fetcher: typeof fetch = fetch) {
    if (!config.secretKey?.trim()) throw new Error('stripe_secret_missing');
    let base: URL;
    try { base = new URL(config.apiBase ?? 'https://api.stripe.com'); }
    catch { throw new Error('stripe_api_base_invalid'); }
    if (base.protocol !== 'https:' || base.hostname !== 'api.stripe.com' || base.username || base.password || base.pathname !== '/') {
      throw new Error('stripe_api_base_not_allowed');
    }
    this.apiBase = base.origin;
  }

  async createSession(req: CheckoutRequest, cart: CommerceCart): Promise<CheckoutSession> {
    const issues = validateCart(cart);
    if (issues.some((issue) => issue.severity === 'error')) throw new Error('stripe_cart_invalid');
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', req.returnUrl);
    params.set('cancel_url', req.cancelUrl);
    params.set('client_reference_id', cart.id);
    params.set('metadata[order_intent_id]', `intent_${cart.id}_${req.idempotencyKey}`);
    cart.lines.forEach((line, index) => {
      params.set(`line_items[${index}][quantity]`, String(line.quantity));
      params.set(`line_items[${index}][price_data][currency]`, cart.currency.toLowerCase());
      params.set(`line_items[${index}][price_data][product_data][name]`, line.title);
      params.set(`line_items[${index}][price_data][unit_amount]`, String(Math.round(line.unitPrice.amount * 100)));
    });

    const body = await requestJson<StripeSessionResponse>('stripe', `${this.apiBase}/v1/checkout/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.config.secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Idempotency-Key': req.idempotencyKey,
      },
      body: params,
    }, this.fetcher, this.config.timeoutMs);
    const expiresAtSeconds = body.expires_at ?? Math.floor(Date.now() / 1000) + 1800;
    const status = body.status ?? 'open';
    const isValidStatus = (value: string): value is CheckoutSession['status'] => ['open', 'complete', 'expired'].includes(value);
    if (!body.id || !/^cs_[A-Za-z0-9_]+$/.test(body.id) || !Number.isFinite(expiresAtSeconds) ||
        !isValidStatus(status) || (status === 'open' && expiresAtSeconds * 1000 <= Date.now())) {
      throw new Error('stripe_session_response_invalid');
    }
    let checkout: URL;
    try { checkout = new URL(body.url ?? ''); }
    catch { throw new Error('stripe_checkout_url_invalid'); }
    if (checkout.protocol !== 'https:' || checkout.hostname !== 'checkout.stripe.com' || checkout.username || checkout.password) {
      throw new Error('stripe_checkout_url_invalid');
    }
    return {
      id: body.id, provider: 'stripe', cartId: cart.id, checkoutUrl: checkout.toString(),
      status, expiresAt: new Date(expiresAtSeconds * 1000).toISOString(),
      orderIntentId: `intent_${cart.id}_${req.idempotencyKey}`,
    };
  }

  async cancelSession(sessionId: string): Promise<void> {
    if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) throw new Error('stripe_session_id_invalid');
    await requestJson<Record<string, unknown>>('stripe', `${this.apiBase}/v1/checkout/sessions/${encodeURIComponent(sessionId)}/expire`, {
      method: 'POST', headers: { Authorization: `Bearer ${this.config.secretKey}` },
    }, this.fetcher, this.config.timeoutMs);
  }
}
