# RE:ROOM AI Visual AI V14

## Purpose

V14 adds a technical dataset and visual-quality layer for the existing RE:ROOM stack. It is designed to make the 2D and 3D visual experience measurable, testable, and iteratively improvable rather than relying only on subjective prompts or image outputs.

## Scope

- 2D floorplan visual QA, annotation, furniture placement, clearances, labels, export and revision behavior.
- 3D/3DGS visual QA for depth, materials, lighting, visibility, splat density, camera composition, streaming and device budgets.
- Cross-modal alignment between photos, floorplans, 3D/3DGS scenes, CAD/BIM, style, palette, lighting and retail overlays.
- Generative-AI coaching for visual critique, camera, layout, style, materials, lighting, revisions and client presentation.
- Synthetic dataset generation for training/evaluation demos.
- Dataset balancing, validation, leakage checks, grounding checks and visual regression gates.
- Render control helpers for tone mapping, depth visualization, semantic overlays, comparison views and device-specific quality.

## Architectural invariant

CAD/BIM remains the authoritative dimensional source. 2D and 3D/3DGS layers remain visual representations and reversible AI overlays.

## Demo

`run-v14-demo.ts` creates a deterministic living-room scene, 512 visual dataset records, multi-domain visual metrics, scenario results and regression comparisons.

## Production boundary

The TypeScript implementation provides deterministic reference logic and orchestration interfaces. Production photorealistic rendering should connect the adapters to the licensed GPU renderer/3DGS implementation used by the deployment environment.
