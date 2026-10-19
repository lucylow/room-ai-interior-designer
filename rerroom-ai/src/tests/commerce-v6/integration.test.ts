import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { CommerceApp } from '../../../server/retail-monetization-v6/src/core/commerce-app';
import { CartStore } from '../../../server/retail-monetization-v6/src/cart/cart-store';
import { CheckoutOrchestrator } from '../../../server/retail-monetization-v6/src/checkout/checkout-orchestrator';
import { ServerCheckoutService } from '../../../server/retail-monetization-v6/server/services/checkout-service';
import { createCheckoutHandler } from '../../../server/retail-monetization-v6/server/api/checkout';
import { transition } from '../../../server/retail-monetization-v6/src/orders/order-state-machine';
import { WebhookStore } from '../../../server/retail-monetization-v6/src/webhooks/event-store';
import { acceptStripeWebhook } from '../../../server/retail-monetization-v6/server/webhooks/stripe';
import { acceptShopifyWebhook } from '../../../server/retail-monetization-v6/server/webhooks/shopify';
import { ServerOrderService } from '../../../server/retail-monetization-v6/server/services/order-service';
import {
  clearCommerceCart, getCommerceCart, recordCommerceCart,
} from '../../state/domains/retail-commerce-v6-store';
import type { CheckoutRequest, CheckoutSession, WebhookEvent } from '../../../server/retail-monetization-v6/src/types/commerce';

describe('Retail monetization V6 integration', () => {
  it('retains AI project/room/concept provenance and snapshots cart state for the app', () => {
    const app = new CommerceApp();
    const cart = app.createDemoCart('demo-user', 1500);
    const next = app.addDemoProduct(cart, 0, 1, {
      projectId: 'project-1', roomId: 'living-room', conceptId: 'concept-4', placementId: 'sofa-slot',
    });
    recordCommerceCart(next);
    const snapshot = getCommerceCart(next.id);
    expect(snapshot?.projectId).toBe('project-1');
    expect(snapshot?.lines[0]).toMatchObject({ roomId: 'living-room', conceptId: 'concept-4', placementId: 'sofa-slot', projectId: 'project-1' });
    expect(() => app.addDemoProduct(next, 0, 1, { projectId: 'project-2' })).toThrow('project_mismatch');
    clearCommerceCart(next.id);
    expect(getCommerceCart(next.id)).toBeUndefined();
  });

  it('enforces a hard budget before mutating the cart', () => {
    const app = new CommerceApp();
    const cart = app.createDemoCart('budget-user', 1);
    expect(() => app.addDemoProduct(cart, 0)).toThrow('budget_cap_exceeded');
    expect(cart.lines).toHaveLength(0);
  });

  it('keeps checkout deterministic and idempotent in demo mode only', async () => {
    const app = new CommerceApp();
    const cart = app.createDemoCart('demo-checkout', 1500);
    app.addDemoProduct(cart, 0, 1, { roomId: 'room-1', conceptId: 'concept-1' });
    const req: CheckoutRequest = {
      cartId: cart.id, provider: 'demo', fulfillment: 'retailer_checkout',
      returnUrl: 'https://app.reroom.ai/checkout/success', cancelUrl: 'https://app.reroom.ai/checkout/cancel',
      idempotencyKey: 'demo_checkout_key_12345',
    };
    const first = await app.startCheckout(req, cart);
    const second = await app.startCheckout(req, cart);
    expect(first.provider).toBe('demo');
    const safeCheckoutUrl = first.checkoutUrl;
    expect(first.checkoutUrl).toMatch(/^https:\/\/demo\.reroom\.local\//);
    first.checkoutUrl = 'https://attacker.example/';
    expect(second.id).toBe(first.id);
    const replay = await app.startCheckout(req, cart);
    expect(second.checkoutUrl).toBe(safeCheckoutUrl);
    expect(replay.checkoutUrl).toBe(safeCheckoutUrl);
    const service = new ServerCheckoutService(app.checkout, ['https://app.reroom.ai']);
    expect((await service.retry(req, cart)).id).toBe(first.id);
    expect(await createCheckoutHandler(service, { ...req, cartId: 'missing-cart' }, cart)).toMatchObject({ ok: false, httpStatus: 400, error: { code: 'checkout_cart_mismatch', retryable: false } });
    expect(await createCheckoutHandler(service, { ...req, provider: 'stripe' }, cart)).toMatchObject({ ok: false, httpStatus: 503, error: { code: 'provider_not_configured' } });
    await expect(app.startCheckout({ ...req, provider: 'stripe' }, cart)).rejects.toThrow('provider_not_configured');
    await expect(app.startCheckout({ ...req, cartId: 'different-cart' }, cart)).rejects.toThrow('checkout_cart_mismatch');
    await expect(app.startCheckout({ ...req, returnUrl: 'javascript:alert(1)' }, cart)).rejects.toThrow('invalid_return_url');
    app.addDemoProduct(cart, 1);
    await expect(app.startCheckout(req, cart)).rejects.toThrow('checkout_cart_changed');
  });

  it('deduplicates webhook events and enforces valid order transitions', () => {
    const store = new WebhookStore();
    const event: WebhookEvent = {
      id: 'evt-demo-1', provider: 'demo', eventType: 'payment_succeeded', payload: {},
      receivedAt: new Date(0).toISOString(), verified: true,
    };
    expect(store.put(event)).toBe(true);
    expect(store.put(event)).toBe(false);
    expect(transition('pending_payment', 'paid')).toBe('paid');
    expect(() => transition('draft', 'paid')).toThrow('invalid_order_transition:draft->paid');
  });
});


describe('Retail monetization V6 webhook security', () => {
  it('verifies Stripe and Shopify HMACs and only marks an order paid from a verified event', () => {
    const now = 1_800_000_000;
    const raw = '{"id":"evt_123","type":"checkout.session.completed"}';
    const stripeSecret = 'test-stripe-secret';
    const stripeDigest = createHmac('sha256', stripeSecret).update(`${now}.${raw}`).digest('hex');
    const events = new WebhookStore();
    const app = new CommerceApp();
    const cart = app.createDemoCart('webhook-user', 1500);
    app.addDemoProduct(cart, 0);
    const orders = new ServerOrderService(undefined, events);
    const order = orders.create(cart, 'intent-webhook', 'stripe');

    expect(() => orders.markPaid(order.id, 'not-yet-stored')).toThrow('verified_webhook_required');
    expect(acceptStripeWebhook(events, { secret: stripeSecret, nowSeconds: now }, raw, `t=${now},v1=${stripeDigest}`, 'evt_stripe_1', 'checkout.session.completed', {})).toBe(true);
    expect(acceptStripeWebhook(events, { secret: stripeSecret, nowSeconds: now }, raw, `t=${now},v1=${stripeDigest}`, 'evt_stripe_1', 'checkout.session.completed', {})).toBe(false);
    expect(orders.markPaid(order.id, 'evt_stripe_1').status).toBe('paid');
    expect(() => acceptStripeWebhook(events, { secret: stripeSecret, nowSeconds: now }, raw, 'demo_fake_signature', 'evt_bad', 'checkout.session.completed', {})).toThrow('stripe_webhook_verification_failed');

    const shopifySecret = 'test-shopify-secret';
    const shopifySignature = createHmac('sha256', shopifySecret).update(raw).digest('base64');
    expect(acceptShopifyWebhook(events, { secret: shopifySecret }, raw, shopifySignature, 'evt_shopify_1', 'orders/paid', {})).toBe(true);
    expect(() => acceptShopifyWebhook(events, { secret: shopifySecret }, raw, 'invalid', 'evt_shopify_bad', 'orders/paid', {})).toThrow('shopify_webhook_verification_failed');
  });
});


describe('Retail monetization V6 failure handling', () => {
  it('does not oversell a variant across duplicate lines or quantity edits', () => {
    const store = new CartStore();
    const cart = store.create('inventory-user');
    const product = {
      id: 'test-product', retailer: 'test', handle: 'chair', title: 'Chair', category: 'chair',
      tags: [], styleTags: [], colors: [], materialTags: [], sourceUpdatedAt: new Date().toISOString(),
      variants: [{ id: 'variant-1', sku: 'sku-1', title: 'One', price: { amount: 20, currency: 'CAD' as const },
        widthM: 1, depthM: 1, heightM: 1, available: true, inventory: 1 }],
    };
    const added = store.add(cart.id, product, 'variant-1');
    expect(() => store.add(cart.id, product, 'variant-1', 1, { conceptId: 'another-concept' })).toThrow('insufficient_inventory');
    expect(() => store.setQty(cart.id, added.lines[0].id, 2)).toThrow('insufficient_inventory');
    expect(() => store.setQty(cart.id, added.lines[0].id, -1)).toThrow('invalid_quantity');
    expect(cart.lines[0].quantity).toBe(1);
  });

  it('coalesces concurrent requests with the same scoped checkout idempotency key', async () => {
    const app = new CommerceApp();
    const cart = app.createDemoCart('parallel-checkout', 1500);
    app.addDemoProduct(cart, 0);
    let calls = 0;
    const provider = {
      name: 'demo',
      createSession: async (_req: CheckoutRequest, value: typeof cart) => {
        calls += 1;
        await new Promise((resolve) => setTimeout(resolve, 5));
        return { id: 'demo_parallel_1', provider: 'demo' as const, cartId: value.id,
          checkoutUrl: 'https://demo.reroom.local/checkout/1', status: 'open' as const,
          expiresAt: new Date(Date.now() + 60_000).toISOString(), orderIntentId: 'intent_parallel_1' };
      },
      cancelSession: async () => undefined,
    };
    const orchestrator = new CheckoutOrchestrator(new Map([['demo', provider]]));
    const req: CheckoutRequest = { cartId: cart.id, provider: 'demo', fulfillment: 'retailer_checkout',
      returnUrl: 'https://app.reroom.ai/success', cancelUrl: 'https://app.reroom.ai/cancel', idempotencyKey: 'parallel_checkout_key_1' };
    const sessions = await Promise.all([orchestrator.start(req, cart), orchestrator.start(req, cart)]);
    expect(calls).toBe(1);
    expect(sessions[0].id).toBe(sessions[1].id);
  });

  it('rejects and cancels a session if the cart changes while the provider is creating it', async () => {
    const app = new CommerceApp();
    const cart = app.createDemoCart('mutable-checkout', 1500);
    app.addDemoProduct(cart, 0);
    let signalStarted!: () => void;
    let release!: (session: CheckoutSession) => void;
    let cancelled = false;
    const started = new Promise<void>((resolve) => { signalStarted = resolve; });
    const provider = {
      name: 'demo',
      createSession: async (_req: CheckoutRequest, _value: typeof cart) => {
        signalStarted();
        return new Promise<CheckoutSession>((resolve) => { release = resolve; });
      },
      cancelSession: async () => { cancelled = true; },
    };
    const orchestrator = new CheckoutOrchestrator(new Map([['demo', provider]]));
    const req: CheckoutRequest = { cartId: cart.id, provider: 'demo', fulfillment: 'retailer_checkout',
      returnUrl: 'https://app.reroom.ai/success', cancelUrl: 'https://app.reroom.ai/cancel', idempotencyKey: 'mutable_checkout_key_1' };
    const pending = orchestrator.start(req, cart);
    await started;
    app.addDemoProduct(cart, 1);
    release({ id: 'demo_mutable_1', provider: 'demo', cartId: cart.id, checkoutUrl: 'https://demo.reroom.local/checkout/1',
      status: 'open', expiresAt: new Date(Date.now() + 60_000).toISOString(), orderIntentId: 'intent_mutable_1' });
    await expect(pending).rejects.toThrow('checkout_cart_changed');
    expect(cancelled).toBe(true);
  });
});
