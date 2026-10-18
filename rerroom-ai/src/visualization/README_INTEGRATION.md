# Visualization Integration Guide

## Canonical state

Use `SpatialScene` as the rendering read-model. The adapter in `integration/VISUALIZATION_STATE_ADAPTER.ts`
maps the repository's `RoomStateModel` into scene geometry without changing the existing domain state API.

## Editing

2D pointer interaction, 3D transforms, and AI suggestions should all produce the same scene commands:
- move
- rotate
- resize
- visibility
- add
- remove

Route every command through the visualization state history. Persist only committed state.

## 2D experience

Use:
- `PlanCanvas`
- `createPlanProjection`
- `PlanGeometryCache`
- `hitTestScene`
- `buildMeasureOverlay`
- `selectionOverlay`
- `sceneToSvg`

Recommended interaction order:
1. Pointer down selects or begins measurement.
2. Drag moves an object in world meters.
3. Snap is applied at the world-coordinate boundary.
4. Constraint validation checks room boundary and collisions.
5. Commit adds the result to `SceneHistory`.
6. Rendering updates from the shared snapshot.

## 3D experience

Use:
- `ThreeSceneCanvas`
- `RoomShell`
- `SceneObjects`
- `OrbitControls`
- `FloorGrid`
- `LightingRig`
- `LODObject`
- `ThreeSceneFallback`

Do not make a second furniture data model for the 3D renderer. The 3D scene should be a pure projection of `SpatialScene`.

## AI

Use `VISUALIZATION_AI_GATE` before applying AI proposals. The provider can be swapped with the existing security/privacy AI abstraction,
but the spatial validator remains the last local safety boundary.

## Performance

Start at quality 1.0 and let `qualityGovernor` reduce:
- texture resolution
- visible object count
- shadows
- post processing
- model detail

under sustained frame pressure.

## Fallback

The product should continue to function if WebGL is unavailable:
3D -> 2D plan -> image/summary presentation.
