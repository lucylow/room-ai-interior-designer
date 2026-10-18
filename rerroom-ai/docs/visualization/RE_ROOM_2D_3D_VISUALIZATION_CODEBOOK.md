# RE:ROOM AI — 2D + 3D Visualization Codebook

This is the cumulative continuation pack: the previous security/privacy/state layer is preserved and the new 2D/3D visualization implementation is added on top.

## Build metrics

- Visualization implementation: 147 files.
- Visualization TypeScript/TSX: 5,545 lines before final barrel/additional integration support.
- Visualization + integration TypeScript/TSX: 5,753 lines.
- Approximate code pages at 55 lines/page: 105.
- Standalone visualization TypeScript check: passed with zero errors.

## Architecture

### `src/visualization/core`
- `src/visualization/core/camera.ts`
- `src/visualization/core/circulation.ts`
- `src/visualization/core/collision.ts`
- `src/visualization/core/compare.ts`
- `src/visualization/core/constraints.ts`
- `src/visualization/core/diff.ts`
- `src/visualization/core/drag.ts`
- `src/visualization/core/focal-point.ts`
- `src/visualization/core/geometry.ts`
- `src/visualization/core/index.ts`
- `src/visualization/core/json-safe.ts`
- `src/visualization/core/layout-grid.ts`
- `src/visualization/core/measurements.ts`
- `src/visualization/core/object-distance.ts`
- `src/visualization/core/packing.ts`
- `src/visualization/core/room-outline.ts`
- `src/visualization/core/rotate.ts`
- `src/visualization/core/route-planner.ts`
- `src/visualization/core/scene-metrics.ts`
- `src/visualization/core/scene.ts`
- `src/visualization/core/selection.ts`
- `src/visualization/core/serialization.ts`
- `src/visualization/core/sightlines.ts`
- `src/visualization/core/snap.ts`
- `src/visualization/core/space-graph.ts`
- `src/visualization/core/spatial-index.ts`
- `src/visualization/core/tour.ts`
- `src/visualization/core/transform.ts`
- `src/visualization/core/types.ts`
- `src/visualization/core/units.ts`
- `src/visualization/core/vec.ts`
- `src/visualization/core/visibility.ts`

### `src/visualization/state`
- `src/visualization/state/command-batch.ts`
- `src/visualization/state/commands.ts`
- `src/visualization/state/compare-store.ts`
- `src/visualization/state/gesture-state.ts`
- `src/visualization/state/history.ts`
- `src/visualization/state/index.ts`
- `src/visualization/state/interaction-mode.ts`
- `src/visualization/state/performance-store.ts`
- `src/visualization/state/scene-persistence.ts`
- `src/visualization/state/selection-history.ts`
- `src/visualization/state/selectors.ts`
- `src/visualization/state/store.ts`
- `src/visualization/state/view-persistence.ts`

### `src/visualization/ai`
- `src/visualization/ai/contracts.ts`
- `src/visualization/ai/demo-provider.ts`
- `src/visualization/ai/index.ts`
- `src/visualization/ai/layout-heuristics.ts`
- `src/visualization/ai/recommendations.ts`
- `src/visualization/ai/scene-understanding.ts`
- `src/visualization/ai/validator.ts`

### `src/visualization/performance`
- `src/visualization/performance/assets.ts`
- `src/visualization/performance/budget.ts`
- `src/visualization/performance/cache.ts`
- `src/visualization/performance/culling.ts`
- `src/visualization/performance/frame-monitor.ts`
- `src/visualization/performance/index.ts`
- `src/visualization/performance/lod.ts`
- `src/visualization/performance/memory-budget.ts`
- `src/visualization/performance/progressive-loader.ts`
- `src/visualization/performance/quality-governor.ts`
- `src/visualization/performance/scheduler.ts`

### `src/visualization/two-d`
- `src/visualization/two-d/annotation.ts`
- `src/visualization/two-d/export-image-spec.ts`
- `src/visualization/two-d/export-svg.ts`
- `src/visualization/two-d/geometry-cache.ts`
- `src/visualization/two-d/gesture-controller.ts`
- `src/visualization/two-d/grid.ts`
- `src/visualization/two-d/hit-testing.ts`
- `src/visualization/two-d/index.ts`
- `src/visualization/two-d/keyboard-nudge.ts`
- `src/visualization/two-d/labels.ts`
- `src/visualization/two-d/layers.ts`
- `src/visualization/two-d/layout.ts`
- `src/visualization/two-d/measure-overlay.ts`
- `src/visualization/two-d/measurement-tools.ts`
- `src/visualization/two-d/plan-theme.ts`
- `src/visualization/two-d/presentation.ts`
- `src/visualization/two-d/projection.ts`
- `src/visualization/two-d/selection-overlay.ts`
- `src/visualization/two-d/viewport.ts`
- `src/visualization/two-d/wall-opening-geometry.ts`
- `src/visualization/two-d/wall-render-data.ts`

### `src/visualization/three-d`
- `src/visualization/three-d/accessibility.ts`
- `src/visualization/three-d/asset-safety.ts`
- `src/visualization/three-d/camera-controller.ts`
- `src/visualization/three-d/camera-inertia.ts`
- `src/visualization/three-d/environment.ts`
- `src/visualization/three-d/fallback.ts`
- `src/visualization/three-d/focus-controller.ts`
- `src/visualization/three-d/index.ts`
- `src/visualization/three-d/lighting.ts`
- `src/visualization/three-d/line-orientation.ts`
- `src/visualization/three-d/load-state.ts`
- `src/visualization/three-d/materials.ts`
- `src/visualization/three-d/object-lod.ts`
- `src/visualization/three-d/presentation.ts`
- `src/visualization/three-d/renderer-config.ts`
- `src/visualization/three-d/room-geometry.ts`
- `src/visualization/three-d/scene-math.ts`
- `src/visualization/three-d/screenshot-spec.ts`

### `src/visualization/components`
- `src/visualization/components/AISpatialSuggestions.tsx`
- `src/visualization/components/AccessibilityPanel.tsx`
- `src/visualization/components/CompareSlider.tsx`
- `src/visualization/components/CompareVisualization.tsx`
- `src/visualization/components/LayerPanel.tsx`
- `src/visualization/components/MeasurementPanel.tsx`
- `src/visualization/components/ModeSwitcher.tsx`
- `src/visualization/components/PerformanceBadge.tsx`
- `src/visualization/components/PlanCanvas.tsx`
- `src/visualization/components/SceneNavigator.tsx`
- `src/visualization/components/ScenePresentationCard.tsx`
- `src/visualization/components/SceneStats.tsx`
- `src/visualization/components/SplitVisualization.tsx`
- `src/visualization/components/TransformInspector.tsx`
- `src/visualization/components/VisualizationToolbar.tsx`
- `src/visualization/components/VisualizationWorkspace.tsx`

### `src/visualization/demo`
- `src/visualization/demo/asset-manifest.ts`
- `src/visualization/demo/camera-presets.ts`
- `src/visualization/demo/catalog.ts`
- `src/visualization/demo/index.ts`
- `src/visualization/demo/lighting-scenes.ts`
- `src/visualization/demo/rooms.ts`
- `src/visualization/demo/scenarios.ts`
- `src/visualization/demo/tours.ts`

### `integration`
- `integration/AI_CALL_INTEGRATION.ts`
- `integration/CODEX_IMPLEMENTATION_PROMPT.md`
- `integration/PRODUCTION_HEADERS.md`
- `integration/SECURE_UPLOAD.ts`
- `integration/SHELL_INTEGRATION.tsx`
- `integration/STATE_PERSISTENCE.ts`
- `integration/THREE_D_RENDERER_SETUP.tsx`
- `integration/TWO_D_RENDERER_SETUP.tsx`
- `integration/VISUALIZATION_AI_GATE.ts`
- `integration/VISUALIZATION_STATE_ADAPTER.ts`

## Main capabilities

- Shared SpatialScene model in meters for both renderers.
- 2D pan/zoom/fit, rotated hit testing, grid snapping, selection overlays, measurements, layers, labels, compare mode, and SVG export.
- 3D room shell, walls/openings, furniture meshes, camera presets, tour sampling, lighting presets, spatial measurement lines, object labels, selection, floor grid, environment and fallback presentation.
- LOD selection, culling, frame monitoring, asset caching, progressive asset loading, memory budgets, quality governance and scheduling.
- Undo/redo history, domain selectors, command batching, compare state, persistence helpers, interaction state and performance state.
- AI layout scoring, recommendations, deterministic demo provider, proposal validation, locked-target checks and safe spatial bounds.
- Demo catalog of dozens of furniture entries, multiple room templates, lighting scenarios, tours, camera presets and asset manifests.
- Integration adapter from the prior RoomStateModel plus a spatial AI gate.
- Accessibility companion object navigator, reduced-motion handling, descriptive labels and a non-WebGL fallback path.

## Integration order

1. Add the optional rendering dependencies from `package.visualization-additions.json` if the host app does not already provide them.
2. Add `src/visualization/index.ts` to the host import graph.
3. Convert the existing room domain state using `integration/VISUALIZATION_STATE_ADAPTER.ts`.
4. Mount `PlanCanvas` for the 2D editor and `ThreeSceneCanvas` for the 3D presentation.
5. Route edits through `VisualizationCommand` + `VisualizationStore` so history and persistence stay centralized.
6. Gate AI proposals through `VISUALIZATION_AI_GATE.ts` and retain server-side authorization from the security layer.
7. Use `qualityGovernor`, `LODObject`, `SpatialIndex`, and `AssetLoadTracker` on lower-powered devices.

## Production notes

The client-side constraints are visualization correctness and defense-in-depth; ownership, authorization, signed assets, deletion, quotas, provider credentials, and API policy still belong on the backend/security boundary.
