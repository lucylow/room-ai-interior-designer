# Apple Monetization V13 Integration

V13 composes the prior V11/V12 domain core instead of importing the attached archive's generated placeholder files wholesale. The implementation lives in `src/apple-monetization-v13/`, extends the catalog and feature map in `src/apple-monetization-v11/`, and is exposed through `RevenueOSV13`.

## Integrated modules

- `subscriptions.ts` models Plus/Pro/Studio monthly and annual lifecycle states, cancellation/reactivation, retry/grace boundaries, revocation, scheduled plan changes, and explicit upgrade/downgrade/crossgrade classification. Grace access extends only through the supplied verified `graceEndsAt`; billing retry alone grants no entitlement. Applying a pending plan requires the verified new period boundary; no Apple proration or price is invented.
- `offers.ts` validates offer periods and renewal/trial disclosures, checks eligibility and caps, and uses idempotency fingerprints. The ledger is a local policy/demo model; it does not generate or authorize StoreKit offers or codes.
- `analytics.ts` calculates currency-separated MRR/ARR/ARPU, assumption-based LTV, refunds, customer-based cohort retention/churn, lifecycle counts, and offer conversion. It is not settlement, tax, App Store proceeds, or a forecast. Only events observed on or before `asOf` are counted.
- `integration.ts` reconciles server-verified subscription/non-consumable inputs, selects the best still-active tier at a requested time (including fallback to a lower tier), routes digital goods to IAP and physical goods separately, and defines injected Apple notification verifier and durable event-store boundaries.
- `index.ts` exposes the `RevenueOSV13` facade, composed over the credit ledger, product catalog, offer logic, subscription state machine, notification pipeline, commerce router, and revenue analytics.
- `ios/RoomAIMonetizationV13/RoomAIMonetizationStore.swift` is a StoreKit 2 adapter reference. It loads localized StoreKit products, processes verified purchases/updates/unfinished transactions, waits for durable server acknowledgment before `finish()`, refreshes `Transaction.currentEntitlements`, and exposes restore, subscription-management, and Apple refund-request flows.

The local `AppStore/RoomAI.storekit` configuration now contains the same 17 product identifiers as the TypeScript catalog and Swift adapter. Its sample prices are for local StoreKit testing only; production prices and localized disclosures must come from StoreKit/App Store Connect.

## Checks

Run `pnpm run monetization-v13:check` for strict TypeScript checking plus V11 and V13 regression suites. V13 currently has 24 focused tests; V11/V12 has 14.

## Production and deployment boundary

This repository does not contain a production billing backend or an Xcode project/target. The Swift file is therefore a native integration source reference and has not been compiled or connected to a shipping iOS target in this workspace. Add it to the actual app target and compile/test it with Xcode and StoreKit configuration before release.

The TypeScript credit, offer, transaction, and default notification ledgers are in-memory demo/reference implementations. In particular, `TransactionLedger.ingest(..., verifiedByStoreKit)`'s boolean is not proof of verification, and `applyVerifiedConsumable` must only run inside a trusted backend projection. Do not expose either as a client-side authority. The injected notification verifier must validate Apple's signed payload/JWS certificate chain, app/bundle identity, environment, and signed dates; the injected `NotificationEventStore` must durably and atomically deduplicate and project events across concurrent server instances. Persist credit grants, reservations, refunds, subscription state, and notification IDs transactionally on the backend.

Implement `RoomAIMonetizationServerBridge` against those backend endpoints: verify transaction JWS server-side, grant consumables idempotently by transaction ID, reconcile revocations/refunds/renewals, and return acknowledgment only after durable processing. Configure App Store Connect product metadata, subscription group, offer eligibility, legal/renewal disclosures, and server notification V2 URLs independently. Offer-code redemption and refund initiation remain Apple-controlled; the local offer ledger and analytics do not authorize them. Physical furniture and person-to-person services remain outside the digital IAP route (services are marked for policy review).
