# Apple Monetization V11/V12 integration

The V13 expansion now composes these services with subscription lifecycle, offers, analytics, notification and StoreKit 2 adapter boundaries. See [APPLE_MONETIZATION_V13_INTEGRATION.md](./APPLE_MONETIZATION_V13_INTEGRATION.md) for the current product mapping, checks, and production deployment requirements.

The framework-independent domain core in `src/apple-monetization-v11` provides idempotent AI/render credit grants and refunds, in-memory reservations with commit/release transitions, fail-closed feature access, paywall frequency controls, deterministic experiment assignment, verified-notification replay protection, currency-scoped revenue totals, and the `RevenueOS` facade.

V12 additions are in `src/apple-monetization-v11/v12.ts`: a validated product registry for Plus/Pro/Studio, AI-credit and HD-render consumables, and a professional export unlock; explicit recurring/trial renewal disclosure data; allowlisted telemetry minimization; transaction replay and refund/revoke state handling; and redacted support diagnostics. No catalog price is hard-coded: the disclosure layer expects localized display prices from StoreKit.

The attached V12 archive was reviewed, not copied wholesale. Most of its domain-named files are generic storage placeholders; the implementation favors a compact set of typed transitions and behavior-oriented tests over importing generated scaffolding.

## Validation

Run `pnpm run monetization-v11:check` for strict type-checking and focused regression tests. Coverage includes credits, feature access, paywall controls, assignment, notification replay, revenue deduplication, product validation, transparent renewal/trial data, telemetry privacy, transaction verification/replay, and support redaction.

## Production boundary

These TypeScript services are in-memory reference implementations, not a production billing backend. Persist and serialize ledger writes server-side; verify StoreKit transaction JWS and App Store Server Notifications V2 with Apple's verification flow; reconcile authoritative current entitlements, refunds and revocations; and obtain storefront-local prices from StoreKit/App Store Connect. Do not treat client-supplied verification booleans, local balances, or local entitlement snapshots as authority. Physical furniture checkout remains separate from Apple digital purchases. Native StoreKit integration should be compiled and exercised in the actual iOS target and StoreKit test environment before release.
