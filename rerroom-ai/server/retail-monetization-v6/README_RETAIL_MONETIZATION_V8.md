# RE:ROOM AI — Retail Monetization V8

## Purpose

V8 continues the V7 physical-commerce architecture and adds a deeper transaction layer for moving an AI-generated interior concept from **design → buyable items → validated quote → checkout → payment state → order lifecycle → refund/reconciliation**.

This package is deliberately split into three boundaries:

1. **Design commerce context** — project, room, concept, placement and selected products.
2. **Commerce transaction state** — cart, quote, checkout guard, payment attempt, order intent and reconciliation.
3. **Provider boundary** — Stripe/Shopify/affiliate/demo adapters. Provider credentials stay on the server.

## Fresh V8 source size

- 117 new TypeScript files
- 6,812 fresh TypeScript lines
- ~123.9 pages at 55 lines/page
- 3 new provider/server contract modules
- deterministic demo checkout

## New V8 modules

### Payment reliability

- payment attempt ledger
- failure classification
- action planning
- wallet selection
- 3DS state modelling
- provider capability matrix
- payment-method policy
- retry budget
- payment/order reconciliation helpers

### Quote and checkout integrity

- quote integrity revalidation
- price snapshots
- inventory snapshots
- stale/expired quote detection
- hard budget checks
- address normalization
- checkout redirect policy
- checkout session builder
- checkout recovery plans
- checkout readiness guard

### Merchant and fulfillment

- merchant routing
- merchant capability checks
- commission calculations
- settlement modeling
- affiliate attribution ledger
- merchant health
- shipping rate normalization
- delivery windows
- split shipments
- pickup/white-glove options
- fulfillment SLA
- order timeline
- cancellation/refund/return modeling
- support case modeling

### Monetization analytics

- checkout funnel
- cart abandonment
- AOV
- room revenue
- style revenue
- cohort metrics
- experiment metrics
- conversion attribution
- commission and revenue summaries

### Security

- idempotency records
- amount-integrity guards
- webhook replay controls
- host allowlists
- PII filtering
- request context
- audit event helpers
- rate-limit modeling

### Subscription monetization

- tier routing
- feature metering
- trial handling
- renewals
- pause policy
- upgrade/downgrade proration
- entitlement cache
- subscription revenue modeling

## Provider contracts

### Stripe

`src/monetization-v8/providers/stripe-checkout-contract.ts` constructs a server-side Checkout Session contract using line-item price IDs, `client_reference_id`, return URLs, metadata, and automatic-tax settings. It uses a deterministic mock checkout URL for demo mode.

### Shopify

`src/monetization-v8/providers/shopify-cart-contract.ts` constructs a Storefront cart contract with merchandise IDs, custom attributes, and buyer identity. It uses a deterministic mock checkout URL for demo mode.

### Webhooks

`server/monetization-v8/webhook-contracts.ts` models signature verification, duplicate detection and provider/event deduplication.

## Important production rules

- Never put Stripe secret keys, Shopify Admin credentials, or merchant private keys in the React client.
- Treat all displayed prices, taxes, inventory and delivery estimates as revalidation candidates until the server/provider confirms them.
- Create a fresh checkout session for each payment attempt; persist the internal quote/order-intent identifiers for reconciliation.
- Treat provider webhooks as the source of truth for payment completion, after signature verification and idempotent processing.
- Keep demo mode completely offline and deterministic.

## Demo

The demo creates a V7 cart, builds a V8 quote, runs fraud and checkout guards, validates the quote against price/inventory snapshots, and generates Stripe and Shopify contract payloads without calling a real provider.

Expected seeded output:

- total: CAD 260.98
- checkout guard: allowed
- quote integrity: valid
- Stripe contract: 3 line items
- Shopify contract: 3 line items
- overall status: PASS

## Integration pattern

```text
AI design concept
      ↓
Try product in room
      ↓
Cart + room/project provenance
      ↓
Quote
      ↓
Price/inventory/tax/shipping revalidation
      ↓
Checkout guard
      ↓
Provider adapter
      ↓
Hosted / wallet / retailer checkout
      ↓
Webhook
      ↓
Order reconciliation
      ↓
Fulfillment / refund
      ↓
Commission + revenue analytics
```

## V8 structure

```text
src/monetization-v8/
  analytics/
  cart/
  checkout/
  engine/
  fulfillment/
  merchant/
  orders/
  payment/
  pricing/
  reconciliation/
  security/
  shipping/
  subscriptions/
  tax/
  ui/
  demo/
  providers/
  types.ts
server/monetization-v8/
  webhook-contracts.ts
```
