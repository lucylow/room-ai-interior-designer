# Retail shopping integration notes

The retail studio is integrated under `src/retail-shopping-v4/` and is exposed as `retailShopping` from `@/room-remodel` (or directly through `@/retail-shopping-v4`). It contains SKU/product identifiers, public retailer URLs, product dimensions, CAD prices, style/color/material tags, room compatibility, query/ranking logic, alternative reasoning, budget coaching, try-in-room scene models, shopping scenarios, and project/cart state models.

## Catalog freshness and retailer boundary

`IKEA_CANADA_SNAPSHOT` is a checked example snapshot captured at **2026-10-01** with `freshUntil` **2026-10-02**. The snapshot is stale as of the integration date (2026-10-17). It intentionally does not claim current prices, stock, shipping, tax, or checkout availability. Keep its demo/snapshot labels visible and revalidate details through an authorized retailer source before purchase. The adapter contract distinguishes snapshot-only capability from a future live server-side adapter; do not place retailer credentials or checkout tokens in the client.

Run `pnpm run retail-shopping:typecheck` for the focused package check. Existing app dependencies and root compiler configuration remain unchanged.
