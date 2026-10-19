# Gaussian Splatting V11 Codebook

This package adds a technical 3D Gaussian Splatting subsystem to the cumulative RE:ROOM AI codebase.

## Size

- TypeScript files: 266
- New TypeScript lines: 8996
- Estimated pages at 55 lines/page: 163.6
- Python worker scripts: 4

## Source areas

- `ai/`: 811 lines
- `cad-bim/`: 180 lines
- `capture/`: 250 lines
- `colmap/`: 192 lines
- `core/`: 311 lines
- `demo/`: 5701 lines
- `evaluation/`: 178 lines
- `export/`: 13 lines
- `index.ts/`: 78 lines
- `math/`: 204 lines
- `pipeline/`: 33 lines
- `render/`: 287 lines
- `scene/`: 223 lines
- `security/`: 88 lines
- `streaming/`: 181 lines
- `training/`: 177 lines
- `ui/`: 89 lines

## Core implementation

`math/projection.ts` implements the perspective projection of Gaussian means and covariance using the standard Jacobian approximation used by modern 3DGS rasterizers. `math/covariance.ts` constructs anisotropic covariance from scale and quaternion rotation. `render/compositor.ts` provides a CPU reference alpha-compositing path for demo/testing.

## Capture-to-playback path

1. Capture frames from photos/video.
2. Run blur/exposure/pose/coverage QA.
3. Scrub metadata and normalize filenames.
4. Produce COLMAP camera/sparse-point metadata.
5. Initialize Gaussians from sparse points.
6. Train in a dedicated GPU worker.
7. Enrich splats with semantic/material metadata.
8. Build LOD/chunks and progressive loading state.
9. Render novel views.
10. Align semantic/capture regions to CAD/BIM anchors.
11. Export PLY or a versioned splat-pack manifest.

## AI capabilities

The V11 AI layer treats the Gaussian scene as queryable structured spatial data. It supports semantic labels, material inference, grounded region lookup, prompt compilation, geometry-preserving edit planning, uncertainty estimation, and design advice.

## Demo

`DEMO_OUTPUT_GAUSSIAN_SPLATTING_V11.json` records a deterministic run over a synthetic 600-splat living-room scene.

## GPU worker

`python/3dgs_worker/` contains safe job-boundary adapters. `run_colmap.py` requires an installed `colmap` executable. `train_gsplat.py` intentionally writes a reproducible training manifest instead of pretending that CPU demo code is equivalent to CUDA training. A production deployment should connect this contract to an approved GPU implementation such as gsplat or another 3DGS backend.

## Licensing note

The implementation in this package is original integration/reference code. It does not copy the official GraphDeco/INRIA source. The official GraphDeco repository has its own license and redistribution terms; review those terms before using their code directly.
