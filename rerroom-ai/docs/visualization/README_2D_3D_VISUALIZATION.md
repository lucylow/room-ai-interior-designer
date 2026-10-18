# RE:ROOM AI — 2D + 3D Visualization Expansion

This continuation pack adds a production-oriented visualization layer on top of the
security/privacy/state-management pack.

Goals:
- High-fidelity 2D floor-plan editing with snapping, measurements, layers, selection,
  compare overlays, annotations, grid, viewport transforms, and export-ready geometry.
- Interactive 3D scene presentation with room shells, openings, furniture meshes,
  materials, lighting presets, LOD, culling, camera presets, tours, measurements,
  object selection, and fallback rendering.
- Shared scene model so the same spatial state drives 2D and 3D instead of duplicating
  business logic in two renderers.
- Deterministic demo data for reliable demos and screenshots.
- AI-assisted spatial recommendations that operate on the same constrained scene model.
- Performance budgets and graceful quality reduction under device pressure.
- Accessibility and reduced-motion presentation controls.

The pack intentionally keeps geometry, state, AI validation, and rendering separate.
That lets the existing RE:ROOM application retain its security/privacy boundaries while
adding a richer visualization experience.

Integration principles:
1. Import the visualization scene from `RoomStateModel`.
2. Keep canonical measurements in meters.
3. Convert to pixels only at the 2D projection boundary.
4. Convert to render units only at the 3D renderer boundary.
5. Apply the same placement constraints to 2D drag, 3D transform controls, and AI actions.
6. Never trust client geometry validation as authorization; keep ownership and server policy
   enforcement on the API boundary.
7. Use local/demo rendering when possible, then opt into remote AI or remote assets only
   through the security/consent layer from the previous pack.
