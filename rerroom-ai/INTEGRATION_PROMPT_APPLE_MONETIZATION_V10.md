Integrate `src/monetization-v10` on top of the existing RE:ROOM Apple StoreKit V9 layer.

1. Keep the V9 StoreKit bridge as the native purchase adapter.
2. Use `V10_CATALOG` as the domain catalog and map IDs to the StoreKit configuration in Xcode/App Store Connect.
3. Gate digital features through `entitlements/feature-gate.ts` and reconcile client/server entitlements.
4. Put paywall state behind the paywall engine and experiment assignment.
5. Use the credit ledger for AI/render consumables; refund credits on deterministic generation failure.
6. Record revenue events without collecting unnecessary personal data.
7. Route physical furniture purchases through the existing retailer checkout layer rather than StoreKit IAP.
8. Add server-side verification before granting durable entitlements.
9. Use App Store Server Notifications to reconcile renewals, billing issues, refunds, revocations, and offer redemptions.
10. Exercise the included deterministic demo and Xcode StoreKit test configuration before release.
