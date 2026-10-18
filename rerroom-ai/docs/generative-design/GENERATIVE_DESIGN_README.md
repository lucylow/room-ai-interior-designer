# RE:ROOM AI — Generative Design + Creative AI Expansion

This layer adds style-filtered, palette-aware and layout-aware generative design to the cumulative RE:ROOM AI workspace.

## Included styles

Modern, Minimalist, Scandinavian, Industrial, Japandi, Mid-Century, Bohemian, Organic Modern, Contemporary and Warm Minimal.

## Creative controls

- Style filters
- Multi-style blending
- Style intensity
- Curated color palette filters
- Custom colors
- Color temperature
- Palette harmonization
- Layout advice
- Furniture placement ideas
- Photorealistic render prompts
- Editorial render prompts
- Quick revision modes
- Previous-concept refinement
- Before/after/compare view-models
- Client feedback loops
- Explainable AI insights
- Deterministic mock provider

## Geometry-preserving generation

The prompt compiler and render spec expose a `geometryLock` flag. In geometry-preserving mode, the positive/negative prompt contract tells the rendering backend to preserve walls, windows, doors, measured dimensions, perspective and authoritative structure.

This client-side contract is not a guarantee of physical correctness. In the existing CAD/BIM layer, authoritative source dimensions remain the construction reference.

## Quick refinement

A previous concept can be passed back into `GenerativeOrchestrator.run()` with `previousConcept` plus feedback such as:

- `refine`
- `reroll`
- `styleOverride`
- `paletteOverride`

The refinement engine creates a new concept ID while preserving the geometry lock and concept lineage.

## Mock data

The package contains a living-room scenario plus additional mock rooms for bedroom, office, kitchen, dining, entry, nursery, studio, bathroom and more. Each mock room has deterministic signals for natural light, circulation, clutter, style and color compatibility so that demos are repeatable.

## Integration with prior layers

This package is intended to sit above the prior:

- Security / privacy / state-management layer
- AI recommendation / insight layer
- 2D / 3D visualization layer
- CAD / BIM remodeling layer
- Space-planning / project organization layer

The generative layer produces concept data and visual instructions; the spatial/CAD/BIM layers remain authoritative for dimensions and construction planning.
