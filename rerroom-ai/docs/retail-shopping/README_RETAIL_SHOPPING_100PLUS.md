# RE:ROOM AI — Buyable Retail Shopping Studio

This package extends the existing RE:ROOM AI generative design + 2D/3D + CAD/BIM workflow with **retailer-aware furniture experimentation**. It is designed for a product experience where AI can recommend furniture that a user can actually purchase, try the product inside the existing room scene, compare alternatives, and keep the room under a target budget.

## Core invariant

The AI creative layer is not the construction source of truth. Retail products are reversible overlays anchored to existing furniture slots and room geometry. The CAD/BIM layer stays authoritative for dimensions and construction planning.

```text
Existing CAD/BIM / room model
          │
          ├── spatial truth
          │
          ▼
   AI design concept
          │
          ▼
  Retail catalog retrieval
          │
     style + palette
     room + role
     dimensions + fit
     budget + value
          │
          ▼
   ranked buyable SKU set
          │
   ┌──────┼──────────┐
   ▼      ▼          ▼
  2D     3D      comparison
   │      │          │
   └──────┼──────────┘
          ▼
       try / swap
          │
          ▼
       cart plan
          │
          ▼
 retailer handoff
```

## Retail model

The package includes an IKEA Canada **checked snapshot** with real SKU identifiers, product names, retailer URLs, prices and dimensions. Current snapshot examples include POÄNG, LACK, BILLY, KALLAX, LISABO, SANDSBERG, NORDVIKEN, DYVLINGE, FRIHETEN and KIVIK. The snapshot records examples such as POÄNG at CAD $119 and LACK at CAD $49.99 as of its capture window; these are historical example prices, not live quotes.

The snapshot is for **demo and design exploration**. It does not claim live stock, delivery dates, final tax, shipping or checkout availability. Production should use an authorized retailer feed/API and revalidate every product immediately before purchase.

## Product experience

### Shop the room
A user selects a room, style and furniture budget. AI retrieves products and ranks them by style fit, palette fit, room relevance, spatial fit, budget fit and value.

### Try in room
A candidate is converted into a reversible scene patch tied to the existing furniture slot. The same product can be rendered in 2D and 3D without rebuilding the scene.

### Quick revisions
Examples:

- Make the room more Scandinavian.
- Keep the exact layout but lower the furniture budget.
- Replace the chair with something industrial.
- Find a smaller coffee table.
- Keep the sofa but make the storage more affordable.
- Show a premium branch and a value branch.

### Budget scenarios
The simulator supports multiple budgets and styles so a designer can compare the projected spend and selected products before presenting a concept.

## Architecture

- `domain/commerce-types.ts` — retailer, budget and scene contracts.
- `catalog/ikea-ca-snapshot.ts` — checked real-item demo catalog.
- `engine/retail-design-studio.ts` — multi-signal room shopping orchestrator.
- `engine/retail-shopping-simulator.ts` — budget/style scenario simulation.
- `search/*` — query, facet and semantic shopping retrieval.
- `ranking/*` — style, palette, price, size and value scoring.
- `placement/*` — anchors, fit and clearance.
- `visualization/*` — 2D/3D retail asset and replacement metadata.
- `ai/*` — shopping briefs and grounded product reasoning.
- `project/*` — workspace, procurement and approval state.
- `ui/*` — filter/list/cart/try-in-room models.
- `demo/*` — deterministic furniture and budget examples.

## Demo mode

Set `RETAIL_MODE=demo` or use the demo runner. Demo products are explicitly marked `demoOnly` and snapshot products carry `availability: 'unknown'`. The UI should display a visible **Demo snapshot / Verify retailer** label instead of implying inventory confirmation.

## Security

Never put retailer OAuth secrets, partner credentials or checkout tokens in the React client. Keep live integrations behind the server boundary. Product URLs can be shown to the client because they are public navigation targets, but partner APIs, cart tokens and privileged purchase actions require server-side authorization.

## Source volume

The new retail implementation contains more than **7,700 TypeScript lines** in this standalone package, which exceeds the requested 100-page scale at a 55-lines/page convention. The bulk of that implementation is real shopping logic: ranking, filtering, scenario simulation, procurement state, visualization adapters, AI explanation and demo workflows.
