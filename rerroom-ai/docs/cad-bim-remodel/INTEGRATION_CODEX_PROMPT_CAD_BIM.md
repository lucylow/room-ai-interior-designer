# Integration Prompt — CAD/BIM + Non-Destructive AI Remodeling

Integrate `src/cad-bim` into the existing `rerroom-ai` application. Do not remove the current security/privacy, visualization, state-management, or AI recommendation modules.

1. Make `AuthoritativeModel` the durable spatial source of truth when a CAD/BIM document exists.
2. Map existing room state into `AuthoritativeModel` with explicit `authority` metadata.
3. Add an Import workspace supporting DXF, IFC, OBJ, SVG and glTF/GLB. Gate DWG/STEP behind server conversion.
4. Store source revision, checksum, unit system and coordinate system for each imported document.
5. Add an “Authoritative Geometry” lock layer in the 2D and 3D visualizers. Source geometry should render as a locked/base layer.
6. Add an “AI Design Overlay” layer. AI edits should target `AnchorReference` values and store appearance/transform deltas.
7. Update natural-language refinement so the second and subsequent prompts operate on the existing overlay rather than creating a fresh room.
8. Add a source-model revision diff + overlay rebase workflow. If an imported revision changes, show deleted, moved, or changed anchors before rebasing.
9. Add a BIM properties panel for IFC entities. Preserve GlobalId and property-set provenance.
10. Add CAD/BIM-aware dimensions in 2D/3D. Read dimensions from authoritative source features first; only show AI estimates when labeled as estimates.
11. Add a client approval gate. Approval freezes the selected overlay version for handoff.
12. Build a handoff package containing approved overlay id, source revision, dimensional truth, finish schedule, quantity schedule, source anchors, warnings and checksum.
13. Keep CAD annotation output separate from source CAD so the original source file remains untouched.
14. Ensure construction/export actions fail when the overlay is unapproved, the source revision no longer matches, or anchors are unresolved.
15. Never present AI dimensions as construction-ready dimensions without explicit source provenance or field verification.

Primary integration points:
- `src/cad-bim/ai/ai-grounded-pipeline.ts`
- `src/cad-bim/remodel/services/ai-remodel-service.ts`
- `src/cad-bim/overlay/refinement-engine.ts`
- `src/cad-bim/overlay/rebase-engine.ts`
- `src/cad-bim/handoff/handoff-builder.ts`
- `src/cad-bim/validation/handoff-validator.ts`
- `src/cad-bim/cad/dxf-writer.ts`
