# RE:ROOM AI Gaussian Splatting V13

V13 adds **225 TypeScript files** and **19982 new TypeScript lines** (~363.3 pages at 55 lines/page).

## Focus
Capture quality, camera/pose health, reconstruction optimization, deterministic reference rasterization, streaming policies, AI scene understanding, reversible appearance edits, CAD/BIM anchoring, evaluation/regression, security gates, pipeline orchestration, device policies, and seeded demo fixtures.

## 3DGS boundary
The reference renderer is CPU/TypeScript and is intentionally deterministic for local development and QA. Production photorealistic 3DGS should use a native/GPU backend adapter (for example a gsplat-compatible service) while the app owns orchestration, privacy, scene state, and interaction.

## Scene authority
Captured 3DGS is treated as appearance evidence. CAD/BIM remains authoritative for construction dimensions. AI edits are reversible overlays.

## Validation
Strict TypeScript compilation passed. Seeded demo: 4,800 Gaussians, 1,600 submitted/visible, 10/10 stages succeeded.
