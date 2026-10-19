# Cursor / Replit / Expo integration prompt — RE:ROOM AI Apple StoreKit V9

Integrate `src/apple-storekit-v9` and `ios/RoomAIStoreKitV9` into the existing RE:ROOM AI app without replacing the prior retail checkout.

1. Add the native Swift files to the iOS target and connect the Expo Modules bridge.
2. Create the actual App Store Connect product IDs from `catalog/product-catalog.ts`.
3. Configure the Pro and Studio subscription groups in App Store Connect.
4. Create the consumable AI/render credit products.
5. Build an Xcode StoreKit Configuration file from `RoomAIStoreKitV9.catalog-reference.json` for local testing.
6. Load product metadata from StoreKit, not hard-coded display prices, in production.
7. Start transaction-update listening during app initialization.
8. Unlock features only from verified StoreKit transactions and reconciled server entitlements.
9. Implement restore using App Store sync and current entitlements.
10. Implement manage-subscription and refund entry points.
11. Send purchase context through safe metadata only; never send payment credentials.
12. Add App Store Server Notifications V2 endpoint on the backend.
13. Verify signed transaction and renewal payloads on the backend before persistent entitlement changes.
14. Reconcile client state after launch, foregrounding, purchase completion, restore, renewal notification, refund, or revocation.
15. Keep the existing physical furniture checkout on its retailer/Apple Pay/card path; never route physical products through StoreKit IAP.
16. Add StoreKit sandbox/TestFlight test cases for success, cancel, pending, renewal, grace period, billing retry, refund, revoke, restore, introductory offer, and consumable delivery.
17. Add App Review notes explaining the digital features unlocked by each IAP.
18. Preserve demo mode with no live Apple charge path.
