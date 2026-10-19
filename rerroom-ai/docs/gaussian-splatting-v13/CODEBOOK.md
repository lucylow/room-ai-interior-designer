# Gaussian Splatting V13 Codebook

## Purpose
V13 is a dependency-free technical reference/integration layer for RE:ROOM AI. It extends V11/V12 without copying third-party renderer implementations.

## Core
`core/types.ts` defines scene, Gaussian, camera, frame, render, plane, anchor, edit, and dataset contracts.
`core/math.ts` provides projection, quaternion, covariance-screen and deterministic sampling helpers.
`core/gaussian-covariance.ts` derives covariance and principal-scale helpers.
`core/scene-index.ts` provides spatial lookup.

## Processing
Capture modules score frame quality/coverage; pose modules score trajectory and registration health; reconstruction modules manage initialization, pruning/splitting/merging and consistency; optimization modules describe schedules and resource budgets.

## Rendering
The reference rasterizer is intentionally CPU/TypeScript for deterministic testing. Production photorealistic rasterization must use an approved native/GPU backend adapter.

## AI and editing
AI modules ground prompts and edits in scene evidence. Editing is reversible and appearance-focused. Geometry-affecting construction data stays behind CAD/BIM locks.

## Streaming
Cluster, chunk, cache, prefetch, bandwidth and integrity modules support progressive large-scene playback.

## Evaluation/security
Evaluation modules provide deterministic regression metrics. Security modules model consent, upload, retention, provider and dataset-reuse gates.
