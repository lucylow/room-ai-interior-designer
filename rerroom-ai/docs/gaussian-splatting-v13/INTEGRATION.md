# Gaussian Splatting V13 integration notes

V13 is added as an isolated extension at `src/gaussian-splatting-v13`; V11 and V12 remain intact. The public entry point is `src/gaussian-splatting-v13/index.ts`. Domain barrels expose collision-free namespaces (for example `Capture.FrameDedup`, `Pose.PoseConfidence`, `Reconstruction.GaussianSplit`, `Render.TileBinning`, `Streaming.ChunkCache`, and `Security.ConsentPolicy`).

The app companion state store is `src/state/domains/gaussian-splatting-v13-store.ts`. It records pipeline snapshots by room and requires scene, room, and source-revision provenance. The source revision must be treated as the CAD/BIM authority for construction dimensions; V13 scene estimates and appearance edits do not supersede it. Edit-branch identifiers are retained with each snapshot for traceability.

The V13 reference rasterizer is deterministic CPU TypeScript for local development, QA, and demos only. It is not a production photorealistic renderer or a production trainer. Production use should be routed through a native/GPU adapter, feature flags, and device/memory/thermal policy. Before any cloud reconstruction, enforce explicit upload consent, upload/provider policy, retention policy, metadata stripping, and privacy gates. No cloud upload or provider call is enabled by this integration.

Run `pnpm run gaussian-splatting-v13:check` to typecheck the V13 package and run its integration tests. The full V13 package tests validate deterministic reference rendering, pipeline status, and provenance-store behavior.
