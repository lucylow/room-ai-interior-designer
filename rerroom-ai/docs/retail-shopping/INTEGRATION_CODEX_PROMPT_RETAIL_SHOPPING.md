# RE:ROOM AI — Integration Prompt: Buyable Retail Furniture Studio

Integrate `src/retail-shopping-v4` into the existing RE:ROOM AI project. Preserve the previous security/privacy/state, CAD/BIM, 2D/3D, space-planning and generative-design layers.

## UI flow

1. Add a `Shop the Room` entry in the room/design workspace.
2. Show retailer, style, palette, budget, category, size and availability filters.
3. Display product cards with name, SKU, current snapshot/live price, dimensions, style badges, retailer, freshness state and `Try in room`.
4. `Try in room` creates a reversible shopping scene patch anchored to the current furniture slot.
5. Render the same SKU in both the 2D plan and the 3D view.
6. Offer `Swap`, `Compare`, `Keep original`, `Save`, and `Add to project cart`.
7. Provide quick revision controls such as `cheaper`, `more Scandinavian`, `more industrial`, `smaller footprint`, `premium`, and `match palette`.
8. Show projected room spend, remaining budget, shipping/tax placeholders and warnings.
9. Store the selected SKU in the client approval/revision state.
10. Handoff to the retailer through a safe external URL or a server-authorized partner integration.

## AI behavior

Use the shopping layer as a grounded retrieval tool. Do not invent products, prices, SKUs or availability. The AI response should cite the product record internally and make clear when a product is only a snapshot/demo.

## Demo examples

- Scandinavian living room, CAD/BIM room 5.2m × 4.4m, furniture budget CAD $1,500.
- Minimalist branch at CAD $750.
- Industrial branch at CAD $1,800.
- Compare POÄNG vs DYVLINGE as accent seating.
- Compare LACK vs LISABO/SANDSBERG tables based on role, scale and budget.

## Production retailer boundary

The checked IKEA Canada snapshot is deliberately separate from live retail data. Replace `SnapshotAdapter` with an authorized server-side adapter for live catalog search, current availability, region-specific pricing, delivery estimates, images and checkout/cart handoff.
