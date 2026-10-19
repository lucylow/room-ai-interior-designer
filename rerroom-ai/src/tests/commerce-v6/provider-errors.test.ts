import { describe, expect, it } from 'vitest';
import { requestJson } from '../../../server/retail-monetization-v6/src/core/provider-http';
import { StripeCheckoutProvider } from '../../../server/retail-monetization-v6/src/providers/stripe-provider';
import { CommerceApp } from '../../../server/retail-monetization-v6/src/core/commerce-app';

describe('V6 provider request errors', () => {
  it('classifies provider 503 responses as retryable and malformed JSON as a response error', async () => {
    const unavailable: typeof fetch = async () => new Response('{}', { status: 503 });
    await expect(requestJson('stripe', 'https://api.stripe.com/test', {}, unavailable))
      .rejects.toMatchObject({ code: 'http_failure', status: 503, retryable: true });
    const malformed: typeof fetch = async () => new Response('not-json', { status: 200 });
    await expect(requestJson('shopify', 'https://store.example/test', {}, malformed))
      .rejects.toMatchObject({ code: 'invalid_json', retryable: false });
  });

  it('times out provider calls and rejects untrusted Stripe endpoints and checkout URLs', async () => {
    const delayed: typeof fetch = async (_input, init) => await new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
    });
    await expect(requestJson('stripe', 'https://api.stripe.com/test', {}, delayed, 5))
      .rejects.toMatchObject({ code: 'timeout', retryable: true });
    expect(() => new StripeCheckoutProvider({ secretKey: 'sk_test', apiBase: 'https://evil.example' }))
      .toThrow('stripe_api_base_not_allowed');

    const fakeResponse: typeof fetch = async () => new Response(JSON.stringify({
      id: 'cs_test_123', url: 'https://evil.example/checkout', expires_at: Math.floor(Date.now() / 1000) + 60, status: 'open',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    const provider = new StripeCheckoutProvider({ secretKey: 'sk_test' }, fakeResponse);
    const app = new CommerceApp();
    const appCart = app.createDemoCart('provider-error-test', 1500);
    app.addDemoProduct(appCart, 0);
    const req = { cartId: appCart.id, provider: 'stripe' as const, fulfillment: 'retailer_checkout' as const,
      returnUrl: 'https://app.reroom.ai/success', cancelUrl: 'https://app.reroom.ai/cancel', idempotencyKey: 'stripe_error_test_123' };
    await expect(provider.createSession(req, appCart)).rejects.toThrow('stripe_checkout_url_invalid');
  });
});
