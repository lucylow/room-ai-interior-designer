# RE:ROOM AI — Apple StoreKit 2 Monetization V9

This continuation adds a digital monetization system designed for the RE:ROOM AI mobile product. It is intentionally separate from the existing furniture/physical-goods retailer checkout.

## Digital catalog

- RE:ROOM Pro monthly subscription
- RE:ROOM Pro yearly subscription
- RE:ROOM Studio monthly subscription
- RE:ROOM Studio yearly subscription
- Pro lifetime non-consumable
- AI credit consumables
- HD render credit consumables

## StoreKit 2

The native Swift layer uses StoreKit 2 concepts for product loading, purchase, transaction updates, `Transaction.currentEntitlements`, and restore/sync. Apple describes the Swift-based In-App Purchase API as the modern API for new implementations, with App Store-signed transaction information. StoreKit 2 supports iOS 15 and later. Keep the native purchase implementation in Swift and expose safe DTOs to React Native/Expo.

## Server verification

The TypeScript contracts include App Store Server API/history/status/finish/consumption boundaries, transaction verification shapes, notification routing, entitlement reconciliation, and account binding. Production verification belongs on a trusted backend. Do not place App Store Server API keys, private signing keys, or backend credentials in React Native JavaScript.

Apple's current App Store Server API includes a Finish Transaction endpoint and Consumption Information support. Use the current Apple endpoints and notification versions at integration time.

## Monetization UX

The paywall layer supports:

- Pro vs Studio positioning
- monthly/yearly comparison
- feature-led gating
- introductory offers
- promotional offers
- win-back offers
- offer-code flows
- trial value messaging
- restore purchases
- manage subscription
- grace-period recovery
- billing-retry recovery
- cancellation flows
- transparent legal copy

Avoid dark-pattern behavior. Show the actual App Store price, period, and trial/offer conditions supplied by StoreKit/App Store Connect.

## Credits

AI and HD-render credits are modeled as consumables. The credit ledger records purchase, reservation, consumption, refund, reconciliation, and audit state. The client should still treat the server as authoritative when syncing a production credit balance.

## Physical goods boundary

Furniture, renovation materials, contractors, shipping, and other physical goods/services stay on the existing retailer/payment path. They should not be misclassified as digital StoreKit products. Apple's App Review Guidelines distinguish physical goods/services from digital in-app purchases.

## Demo mode

The `DemoStoreKitBridge` never calls Apple. It creates deterministic verified-looking demo transactions so the UI and state machines can be exercised without a payment method.

## StoreKit test fixture

`ios/RoomAIStoreKitV9/RoomAIStoreKitV9.catalog-reference.json` is a product catalog reference for building an Xcode StoreKit Configuration file. It is intentionally labeled as a reference rather than being claimed to be a complete drop-in Xcode configuration file.
