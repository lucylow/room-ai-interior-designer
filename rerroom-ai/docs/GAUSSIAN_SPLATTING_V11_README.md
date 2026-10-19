# RE:ROOM AI — Gaussian Splatting V11

This continuation adds a technical Gaussian Splatting subsystem for photorealistic novel-view playback of room captures. It is intentionally split between client-safe TypeScript orchestration/demo code and an optional GPU worker boundary for COLMAP + gsplat/3DGS execution.

## Architecture

```text
Photos / Video
      ↓
Frame sampling + capture QA
      ↓
Privacy scrub / metadata normalization
      ↓
COLMAP camera + sparse point reconstruction
      ↓
Gaussian initialization
      ↓
GPU training / density control
      ↓
Semantic + material inference
      ↓
LOD / culling / tiling / streaming
      ↓
Real-time render
      ↓
CAD/BIM alignment + anchored AI edits
```

The representation follows the established 3DGS formulation: a scene is represented by 3D Gaussian means, anisotropic covariance encoded via scale + rotation, color/features, and opacity; rendering projects Gaussian means/covariances to the image plane and alpha-composites them in depth order. This mirrors the reference methodology and current gsplat rasterization API. See the cited sources in the accompanying build notes.

## Why the architecture uses a worker

3DGS training and high-performance rasterization are GPU workloads. The React Native/Expo app should orchestrate capture, upload, job status, preview, and scene playback while a GPU service performs COLMAP, optimization, rasterization, conversion, and checkpoint management. The Python scripts in `python/3dgs_worker/` are job-boundary adapters and manifest generators; they do not pretend a CPU mock is a full 3DGS trainer.

## RE:ROOM integration invariants

1. CAD/BIM dimensions remain authoritative.
2. Splat appearance is editable without mutating the construction source model.
3. Every splat can carry provenance to capture frames and optional CAD/BIM anchors.
4. Privacy policy is evaluated before externalization.
5. Demo mode is deterministic and uses synthetic splats rather than user imagery.
6. Production mode must validate server ownership, signed URLs, quotas, access controls, deletion, and provider credentials server-side.

## Main source tree

- `src/gaussian-splatting-v11/math/` — projection, covariance, quaternion and camera math.
- `src/gaussian-splatting-v11/capture/` — frame selection, capture quality and privacy scrubbing.
- `src/gaussian-splatting-v11/colmap/` — text metadata adapters and sparse-point initialization.
- `src/gaussian-splatting-v11/scene/` — scene store, semantic index, bounds.
- `src/gaussian-splatting-v11/render/` — CPU reference renderer, culling, LOD and tiling.
- `src/gaussian-splatting-v11/streaming/` — chunks, cache and progressive loading.
- `src/gaussian-splatting-v11/ai/` — semantic labels, materials, query, edit planning and prompt compilation.
- `src/gaussian-splatting-v11/cad-bim/` — anchor alignment.
- `src/gaussian-splatting-v11/training/` — tiered config and density-control heuristics.
- `src/gaussian-splatting-v11/pipeline/` — stage orchestration and worker command boundaries.
- `src/gaussian-splatting-v11/export/` — ASCII PLY and splat-pack manifests.
- `src/gaussian-splatting-v11/demo/` — deterministic room scenes, camera paths and scenarios.
- `src/gaussian-splatting-v11/evaluation/` — quality and regression metrics.
- `src/gaussian-splatting-v11/security/` — scene privacy and splat sanitization.
- `src/gaussian-splatting-v11/ui/` — viewer state and interaction models.

## Important interoperability note

The official GraphDeco INRIA implementation and gsplat are separate projects with their own licenses and operational requirements. This package does not copy their implementation. It defines clean adapters and a mathematical CPU reference path so RE:ROOM can integrate an approved backend without coupling the app to a single GPU runtime.
