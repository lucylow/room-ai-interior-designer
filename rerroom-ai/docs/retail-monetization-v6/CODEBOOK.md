# RE:ROOM AI Retail Monetization V6 Codebook

## A. Commerce core
- money arithmetic and currency checks
- deterministic IDs
- checkout idempotency
- cart state
- cart merge and recovery
- budget gates

## B. Provider adapters
- DemoCheckoutProvider
- StripeCheckoutProvider
- ShopifyCheckoutProvider
- AffiliateCheckoutProvider
- provider registry and health contracts

## C. Pricing
- discounts
- tax estimates
- shipping quotes
- bundle pricing
- budget optimizer
- price snapshots
- price locks

## D. Payment / checkout
- server-side checkout sessions
- return URL validation
- checkout step state
- guest flows
- retry/recovery
- payment status/error mapping
- purchase receipt models

## E. Orders
- order creation
- state-machine transition safety
- reconciliation
- fulfillment plans
- refund/return contracts
- order event replay

## F. Monetization
- platform fee estimation
- affiliate attribution
- commission calculations
- referral codes
- room-set commerce
- design-service upsell models
- subscription entitlements

## G. Security
- provider secret boundaries
- URL validation
- replay protection
- webhook event deduplication
- payment-data boundary
- PII minimization
- audit/observability contracts

## H. AI-commerce bridge
- concept-to-cart provenance
- placement IDs
- room/project IDs
- AI source metadata
- buyability scoring
- budget-aware alternatives
- retailer handoff

## I. Demo dataset
The V6 source includes many deterministic fixtures for:
- rooms
- styles
- budgets
- payment outcomes
- shipping outcomes
- order states
- discounts
- referral sources
- revisions
- checkout entry points
- room sets
- abandoned/recovered carts

## J. UI/view-model layer
The `src/ui` and supporting modules are framework-neutral so they can feed React Native/Expo screens without coupling provider SDKs directly into presentation components.
