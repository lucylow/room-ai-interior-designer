# Cursor / Replit / Manus Integration Prompt — RE:ROOM AI Retail Monetization V6

Integrate this package into the existing RE:ROOM AI repository as the next commerce layer.

## Required behavior

1. Preserve the existing AI design, 2D/3D, 3DGS, CAD/BIM, and shopping architecture.
2. Add the V6 commerce services under a dedicated commerce/monetization boundary.
3. Treat physical products as the purchasing domain.
4. Keep payment provider secret keys exclusively on the server.
5. Never expose Stripe secret keys or Shopify private/admin tokens to the React Native client.
6. Let the client request a server checkout session.
7. Server revalidates cart, price, inventory and hard budget before creating checkout.
8. Use idempotency keys so repeated taps do not create duplicate checkout sessions.
9. Verify provider webhooks before mutating order status.
10. Persist the room/project/concept/placement provenance for purchased items.
11. Keep demo mode fully deterministic and incapable of charging real money.

## Retailer checkout

Use Shopify Storefront API `cartCreate` when integrating a merchant's Shopify storefront. The API returns a cart with a checkout URL that can be used for web checkout.

## Stripe checkout

Create Checkout Sessions from a trusted server using line items based on server-validated product records. Return only a checkout URL/session identifier to the mobile client.

## Monetization models

Support:
- affiliate commission
- platform transaction fee
- retailer revenue share
- room-set commerce
- paid design services
- optional digital subscription entitlements through the correct platform billing path

## UI flow

```text
Room
 -> AI concept
 -> Shop this room
 -> Try in room
 -> Add to cart
 -> Budget review
 -> Shipping review
 -> Checkout
 -> Payment
 -> Order confirmation
 -> Track order
```

## Test requirements

Add unit/integration tests for:
- price drift
- inventory drift
- duplicate checkout taps
- expired checkout sessions
- failed payment
- webhook replay
- wrong webhook signature
- refund
- cancellation
- hard-budget overflow
- currency mismatch
- provider outage
- affiliate attribution
- room/concept provenance
- demo mode isolation

Do not mark an order `paid` solely because the mobile client reports success. Provider confirmation/webhook reconciliation must be authoritative.
