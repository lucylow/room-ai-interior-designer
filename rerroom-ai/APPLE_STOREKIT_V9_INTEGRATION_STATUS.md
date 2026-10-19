# Apple StoreKit V9 integration status

The V9 digital-purchase domain is added separately from the V6/V8 physical-goods commerce path.

- TypeScript modules, typed React Native adapter, paywall logic, entitlement models, server contracts, test fixtures, and demos are in `src/apple-storekit-v9/`.
- The StoreKit 2 manager and Expo-style bridge sources, plus the catalog reference, are in `ios/RoomAIStoreKitV9/`.
- `tsconfig.apple-storekit-v9.json` provides a focused strict type-check for the Apple layer and its demo/test entrypoints.
- Physical furniture and renovation purchases remain on the existing retailer/physical-payment path. StoreKit here is for digital features and consumables only.

## Validation performed

The focused V9 TypeScript type-check passed. The deterministic V9 test runner passed with no failures, and the demo completed using `DemoStoreKitBridge`; it made no StoreKit or payment-provider calls.

## Native release boundary

The supplied app archive did not include a generated iOS/Xcode project or the Expo native module dependency setup. Therefore, the Swift files are staged source and are not yet linked into a built iOS target or autolinked Expo module. Before enabling real purchases, add the Swift module to the native iOS build, configure Expo Modules integration, create and verify the products in App Store Connect, and implement trusted server-side transaction/notification verification. The catalog JSON is a reference for local StoreKit testing, not a complete Xcode StoreKit configuration file. No real purchase path is enabled by this addition.
