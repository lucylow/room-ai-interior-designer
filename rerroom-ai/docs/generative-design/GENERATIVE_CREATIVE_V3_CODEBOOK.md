# RE:ROOM AI Generative Creative V3 — Codebook

This codebook describes the incremental `creative-v2` layer added on top of the previous RE:ROOM AI generative, visualization, and state-management work.

**313 TypeScript files · 5,556 lines · 101.0 pages at 55 lines/page**

## Requested creative behaviors

- First-class style filters: **Modern, Minimalist, Scandinavian, Industrial**.
- Palette filters and named color families.
- Room-aware layout advice.
- Iterative quick revisions that modify an existing concept.
- Mock data for deterministic demo mode.
- Explainable signals and confidence alongside generated concepts.
- Geometry-lock metadata carried into render specifications.

## Directory map

- `advisors/` — 24 files / 456 lines
- `analysis/` — 12 files / 108 lines
- `controls/` — 25 files / 600 lines
- `creative-design-engine-v2.ts/` — 1 files / 34 lines
- `creative-v3-expansion.ts/` — 1 files / 20 lines
- `engine/` — 15 files / 312 lines
- `export/` — 3 files / 12 lines
- `furniture/` — 12 files / 120 lines
- `index.ts/` — 1 files / 24 lines
- `insights/` — 16 files / 240 lines
- `layouts/` — 12 files / 288 lines
- `mock-data/` — 20 files / 200 lines
- `mock-projects/` — 10 files / 60 lines
- `mock-scenarios/` — 10 files / 120 lines
- `moods/` — 10 files / 80 lines
- `palette-ops/` — 10 files / 140 lines
- `palettes/` — 21 files / 672 lines
- `personalization/` — 10 files / 180 lines
- `prompts/` — 14 files / 126 lines
- `revisions/` — 24 files / 360 lines
- `studio/` — 12 files / 348 lines
- `studio2/` — 6 files / 108 lines
- `styles/` — 11 files / 430 lines
- `synthesis/` — 18 files / 360 lines
- `types.ts/` — 1 files / 12 lines
- `ui/` — 6 files / 26 lines
- `workflow/` — 8 files / 120 lines

## Main integration points

- `creative-design-engine-v2.ts` — main filtered generation pipeline.
- `creative-v3-expansion.ts` — workspace snapshot, studio facade, comparison helpers.
- `engine/creative-filter-model.ts` — normalized style/palette/control filters.
- `engine/concept-factory-v2.ts` — creates concepts from existing room state.
- `engine/revision-engine-v2.ts` — reversible quick revisions.
- `engine/creative-control-suite.ts` — independent creative controls.
- `engine/creative-studio-suite.ts` and `creative-studio-suite-2.ts` — presentation and client-facing artifacts.
- `mock-scenarios/`, `mock-projects/`, `mock-data/` — deterministic design cases.

## Preservation behavior

Generated concepts inherit `preserveArchitecture`, geometry-lock state, and source-aware prompt constraints. The creative layer is intended to change style, palette, lighting, materials, furniture styling, and layout advice—not silently rewrite the authoritative physical source model.

## Production integration

Connect the generated prompt bundles to a server-side image generation provider, keep provider secrets off the client, and continue to treat CAD/BIM dimensions as authoritative construction data.
