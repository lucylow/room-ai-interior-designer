# Apple Commerce Policy Notes

- StoreKit 2 is the modern Swift-first API for digital in-app purchases.
- Use verified StoreKit transactions and current entitlement state to grant digital access.
- Keep subscription products in one subscription group when users should select one access level at a time.
- Introductory, promotional, win-back offers, and offer codes have distinct eligibility and configuration rules in App Store Connect.
- Physical goods/services consumed outside the app should use payment methods other than IAP, such as Apple Pay or conventional card/retailer checkout, where applicable.
- Use sandbox/Xcode StoreKit testing for purchase and lifecycle regression scenarios.

This file is an implementation checklist, not legal or App Review advice. Verify current Apple requirements before submission.
