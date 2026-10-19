# RE:ROOM AI Apple StoreKit V9 Codebook

Fresh TypeScript files: 394
Fresh TypeScript lines: 5978
Swift files: 3
Swift lines: 153
Total fresh code lines: 6131
Approx pages @55 lines/page: 111.5

## Product catalog

- Pro monthly
- Pro yearly
- Studio monthly
- Studio yearly
- Pro lifetime
- 100 AI credits
- 500 AI credits
- 10 HD renders

## Native files

- `RoomAIStoreKitManager.swift` — StoreKit 2 coordinator
- `RoomAIStoreKitBridge.swift` — safe DTO adapter
- `RoomAIStoreKitModule.swift` — Expo Modules-style bridge
- `RoomAIStoreKitV9.catalog-reference.json` — product fixture reference

## Server boundaries

- signed transaction verification contract
- subscription status/history contract
- server notification routing
- entitlement reconciliation
- refund/revocation handling
- safe app-user binding

## Digital/physical boundary

Digital RE:ROOM features use Apple In-App Purchase. Physical furniture and renovation purchases remain on the retailer/physical-payment path.
