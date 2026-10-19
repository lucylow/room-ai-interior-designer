# RE:ROOM AI — Retail Monetization + Real Purchase Checkout V6

This continuation adds a transaction-safe commerce layer on top of the existing RE:ROOM AI design, CAD/BIM, visualization, generative-AI, and retail-shopping architecture.

## Goals

1. Turn AI-selected room products into a real cart.
2. Re-check price, budget and inventory before checkout.
3. Support retailer-owned checkout (Shopify Storefront cart + checkout URL), direct payment checkout (Stripe Checkout Sessions), affiliate retailer handoff, and a deterministic demo provider.
4. Keep provider secrets server-side.
5. Reconcile payment webhooks into an order state machine.
6. Support monetization through platform fees, affiliate commissions, room-set commerce, and optional subscription entitlements.
7. Preserve project/room/concept provenance so a purchase can be traced back to the AI design that selected the item.
8. Keep demo mode physically incapable of charging a real payment method.

## Provider architecture

- Shopify Storefront API: the current Storefront API supports products, carts and checkout; the Cart object exposes `checkoutUrl` for sending the buyer to Shopify checkout. See https://shopify.dev/docs/api/storefront/latest and https://shopify.dev/docs/api/storefront/latest/objects/cart.
- Stripe: Checkout Sessions are created server-side and support one-time payment and subscription modes; Stripe's current API also supports hosted, embedded and custom UI modes. See https://docs.stripe.com/api/checkout/sessions/create and https://docs.stripe.com/payments/checkout/quickstarts.
- Affiliate: the app records the design-origin click and sends the buyer to the retailer's purchase flow.
- Demo: deterministic, local-only checkout with no network request and no real payment.

## iOS physical goods monetization

For physical goods consumed outside the app, Apple's current App Review Guidelines state that payment methods other than In-App Purchase must be used, such as Apple Pay or traditional credit card entry. See Apple's current guideline 3.1.3(e): https://developer.apple.com/app-store/review/guidelines/ . Apple also describes Apple Pay as suitable for physical goods and services: https://developer.apple.com/design/human-interface-guidelines/apple-pay/ .

Digital premium app functionality is a separate monetization category and should be implemented according to the platform's current rules; do not reuse the physical-goods checkout path for digital entitlements without a platform-policy review.

## Security model

- Never ship Stripe secret keys to the client.
- Never ship private merchant/admin credentials to the client.
- Use server-created checkout sessions.
- Use idempotency keys for checkout creation.
- Re-read provider price/inventory before charging.
- Treat retailer prices/taxes/shipping as mutable until checkout confirms them.
- Verify provider webhooks before mutating order status.
- Use an immutable purchase snapshot for audit and support.
- Keep payment details inside PCI-compliant provider components/hosted checkout.
- Demo mode is isolated from live providers.

## AI-to-commerce provenance

AI can propose:
- product
- variant
- room placement
- concept revision
- budget allocation
- style rationale

The purchase layer persists these fields on cart lines, making it possible to answer: "Which AI room concept caused this purchase?" without storing raw payment data.

## Hard-budget behavior

A configured budget cap is a hard constraint in demo and orchestration logic. The optimizer may leave optional slots unfilled rather than select an over-budget item.

## Main entry points

- `src/core/commerce-app.ts` — end-to-end demo application façade.
- `src/cart/cart-store.ts` — cart mutation and pricing state.
- `src/checkout/checkout-orchestrator.ts` — provider-neutral checkout.
- `src/providers/shopify-provider.ts` — Storefront cart/checkout adapter.
- `src/providers/stripe-provider.ts` — server-side Checkout Session adapter.
- `src/orders/order-state-machine.ts` — order lifecycle safety.
- `src/webhooks/event-store.ts` — webhook idempotency.
- `src/monetization/revenue-model.ts` — platform fee / commission model.
- `src/final/launch-readiness.ts` — checkout release checks.

## Demo

The demo uses `CommerceApp` with the deterministic provider. No real payment is created.

Build with:

```bash
npx tsc -p tsconfig.build.json
node dist/src/demo/run.js
```

## Production integration sequence

```text
AI concept
  -> buyable product selection
  -> cart
  -> price/inventory revalidation
  -> server order intent
  -> provider checkout session
  -> buyer payment
  -> signed provider webhook
  -> order reconciliation
  -> fulfillment tracking
  -> commission / revenue ledger
  -> room/project purchase history
```
