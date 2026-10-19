

## Error-handling and refactoring pass

The purchase coordinator now validates request context, coalesces concurrent taps, briefly caches completed attempts, reports only stable safe error codes, and allows retry after provider exceptions or failed outcomes. The credit ledger validates users and integer amounts, prevents overdrafts, assigns collision-resistant local IDs, and makes repeated grant/consume references idempotent. Entitlement reconciliation validates provenance and expiry, prioritizes canonical server state (including revocation), and resolves duplicate local claims conservatively. Notification deduplication now requires an explicit successful signature-verification result and rejects malformed payload metadata before recording an ID. Feature gating fails closed for invalid tiers and does not count expired/revoked products as active tiers.

The V10 and V9 focused strict type-checks passed, as did the expanded V10 regression runner and deterministic demo. Updated-file digests are recorded in `V10_HARDENING_CHECKSUMS.json`; the supplied V10 source checksum file remains the original-bundle provenance record.
