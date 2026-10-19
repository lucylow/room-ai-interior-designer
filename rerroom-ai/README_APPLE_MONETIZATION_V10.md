# RE:ROOM AI Apple StoreKit Monetization V10

V10 is a continuation of V9 focused on building a durable, testable Apple digital-monetization system around StoreKit 2.

## Fresh code size

- TypeScript: 152 files / 25009 lines / 454.7 pages at 55 lines/page
- Swift: 2 files / 158 lines
- Total fresh source: 25167 lines / 457.6 pages

## Monetization model

### Digital RE:ROOM capabilities

Use Apple In-App Purchase / StoreKit 2 for digital subscriptions, digital credits, and digital feature unlocks. The codebase contains Plus, Pro, and Studio plans; AI/render credit packs; CAD export and commercial-use unlocks; paywall experiments; eligibility rules; entitlement reconciliation; server notification contracts; usage meters; and revenue analytics.

### Physical products

Furniture and other goods consumed outside the app remain on the existing retailer/physical-goods checkout path rather than Apple IAP.

## Current Apple implementation notes

StoreKit 2 is Apple's modern Swift-first API for in-app purchases. `Transaction.currentEntitlements` exposes current entitlements for non-consumables and active subscription states. Apple also supports introductory offers, promotional offers, win-back offers, and offer codes for subscriptions with different eligibility rules. App Store Server APIs and notifications should be used by the production backend to reconcile subscription state.

## Production hardening

1. Never ship Apple private keys or payment credentials in the client.
2. Verify transactions before granting durable digital access.
3. Persist original transaction identifiers server-side.
4. Reconcile renewals, billing issues, refunds, revocations, and offer redemptions.
5. Keep demo adapters network-free and never use them in production.
6. Configure product IDs and subscription groups in App Store Connect/Xcode rather than treating the local catalog as authoritative pricing.
7. Test purchase lifecycle cases in StoreKit sandbox/Xcode.

The included pricing and paywall experiments are examples for testing value communication and product-market fit. They do not guarantee revenue outcomes.
