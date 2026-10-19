# Integration prompt — Gaussian Splatting V11

Integrate `src/gaussian-splatting-v11` into the existing RE:ROOM AI application.

### Product behavior

- Add a Capture → Reconstruct → View 3DGS flow.
- Allow photo/video capture or upload.
- In demo mode, use `demoScene()` and `demoCameraPath()` without network or GPU.
- In production, create a server reconstruction job and poll its stage graph.
- Preserve existing CAD/BIM anchors and never replace authoritative dimensions with splat estimates.
- Allow AI to query semantic regions and create reversible appearance edits.
- Allow progressive loading by chunk/tile/LOD.
- Expose RGB, depth, semantic and confidence visualization modes.
- Show capture-quality warnings before starting reconstruction.
- Surface privacy policy and data-retention state before upload.

### Backend contract

Implement API endpoints conceptually like:

- POST `/api/3dgs/captures`
- POST `/api/3dgs/jobs`
- GET `/api/3dgs/jobs/:jobId`
- GET `/api/3dgs/scenes/:sceneId/manifest`
- GET `/api/3dgs/scenes/:sceneId/chunks/:chunkId`
- POST `/api/3dgs/scenes/:sceneId/query`
- POST `/api/3dgs/scenes/:sceneId/edits`
- POST `/api/3dgs/scenes/:sceneId/align-cad-bim`
- DELETE `/api/3dgs/scenes/:sceneId`

All authorization, ownership, signed-URL validation, quota enforcement, deletion and provider credentials stay server-side.

### GPU worker contract

The worker should receive a versioned job manifest containing capture IDs, source manifest IDs, privacy policy decisions, quality tier and seed. The worker may invoke COLMAP and an approved 3DGS backend such as gsplat. The client must not contain CUDA dependencies, private worker credentials, or unrestricted shell execution.

### UI

Create a 3DGS viewer with:

- orbit/pan/zoom
- camera-path replay
- loading progress
- LOD selector
- semantic toggle
- anchor toggle
- depth mode
- confidence mode
- frame-rate/quality status
- selected-region AI actions
- restore/revert for edits

### Demo acceptance tests

1. A 600-splat deterministic living-room scene renders through `CpuGaussianRenderer`.
2. LOD reduces the working set for preview mode.
3. Semantic queries return sofa/window/plant examples.
4. An edit request can target semantic labels without changing anchor coordinates.
5. Capture QA warns about blur/exposure/insufficient pose coverage.
6. Privacy scrub removes source-frame filenames and marks EXIF/GPS handling.
7. CAD alignment produces a translation/scale result from paired anchors.
8. PLY export emits a valid ASCII header and one row per Gaussian.
