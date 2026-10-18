# RE:ROOM AI — Generative Creative Design V3

This continuation expands the prior AI recommendation, visualization, security/privacy, CAD/BIM, and project-state layers with a creative-design system designed for fast aesthetic exploration.

## Design goals

- Style filters: Modern, Minimalist, Scandinavian, Industrial, Japandi, Mid-century, Bohemian, Organic Modern, Contemporary, Warm Minimal.
- Palette filters with 20+ named palettes plus custom color support from the earlier layer.
- Layout advice tied to the same room context used by 2D/3D visualization.
- Iterative revisions that edit an existing concept instead of rebuilding a scene.
- Geometry-preserving render prompts and explicit negative prompts.
- Mock data and deterministic demos for offline UI development.
- Explainable creative signals so each recommendation can show why it was selected.

## Architecture

```text
Room / CAD / BIM / Photo / Rough 3D
              │
              ▼
     Creative Filter State
     ├─ Style selection
     ├─ Palette selection
     ├─ Layout goals
     └─ Preservation policy
              │
              ▼
  Style + Palette + Layout signals
              │
              ▼
        Concept Factory
              │
              ├─ Existing furniture anchors
              ├─ Material recipes
              ├─ Camera/render specs
              └─ Negative prompts
              │
              ▼
       Selection + Quality Gate
              │
       ┌──────┴───────┐
       ▼              ▼
  2D / 3D views   AI insights
       │              │
       └──────┬───────┘
              ▼
       Iterative revision
              │
              ▼
       Client comparison
```

## Filters

The exact requested filter behavior is available for Modern, Minimalist, Scandinavian, and Industrial. Additional directions use the same normalized filter architecture.

## Mock data

The `mock-data` and `mock-scenarios` directories contain deterministic cases for style/palette/layout combinations. This supports UI work without depending on a remote model.

## Iterative refinement

Revision presets modify aesthetic render strength, prompt text and presentation metadata while explicitly retaining geometry-lock state. Examples include `Make it warmer`, `Reduce visual clutter`, `Push it more Scandinavian`, `Push it more industrial`, `Make it more open`, and `Make it cozier`.

## Production note

The included deterministic engine is for application workflow and demo behavior. Production photorealistic generation should connect the prompt bundles to your chosen server-side image model while keeping provider credentials off the client and continuing to treat CAD/BIM dimensions as authoritative source data.

## Generative Creative V3 Addendum

This addendum adds room-specific creative advisors, palette transformation operators, furniture style remappers, render moods, workflow evaluators, mock project scenarios, and a workspace facade.

### Exact requested filters

Modern, Minimalist, Scandinavian, and Industrial are first-class style filters. Each is represented by a style policy that scores fit, emits explainable signals, builds prompt vocabulary, and preserves geometry constraints.

### Creative controls

The system separates style, palette, layout, furniture, materials, lighting, camera, atmosphere, and budget controls. Quick revisions change one control at a time where possible so users can iterate quickly without losing the parent concept.

### Mock-mode behavior

Mock scenarios provide deterministic inputs for common combinations of room type, style, palette, layout, camera mood, and revision. They are intended for UI development, demonstrations, and regression tests without requiring a remote generative model.

## Creative studio layer

The final V3 tranche adds style matrices, palette rationale, layout coaching, mood-board copy, material and furniture alternatives, repeatable camera shot lists, client-facing creative briefs, plain-language review text, style guardrails, multi-room design tokens, and concept narrative artifacts.

## Final studio extension

The final tranche adds plain-language style and palette intent parsing, layout-advice writing, diversity checks, deterministic mock-generation batches, design-session briefs, and a second studio suite for UI-ready creative orchestration.
