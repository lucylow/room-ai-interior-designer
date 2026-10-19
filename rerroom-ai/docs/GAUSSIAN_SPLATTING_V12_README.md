# RE:ROOM AI — Gaussian Splatting V12 Deep Technical Expansion

## Scope
This is the V12 continuation of the RE:ROOM AI 3DGS layer. It adds a large set of dependency-free TypeScript reference modules for robust capture, reconstruction orchestration, temporal scenes, rendering quality, progressive streaming, AI scene operations, reversible Gaussian edits, CAD/BIM alignment, evaluation, security, and UI state.

## Source size
- New V12 TypeScript files: 148
- New V12 TypeScript lines: 11766
- Approximate size at 55 lines/page: 213.9 pages

## Technical direction
Current 3DGS rasterization projects 3D Gaussian means/covariances into image-space Gaussians, groups/sorts them for tiles, and alpha-composites them. The V12 layer preserves that runtime model while focusing on orchestration and production controls. Current 2026 GraphDeco/Inria work also includes large-scene global-consistency reconstruction, dynamic/temporal splats, intrinsic decomposition/editing, and lighting-consistent object transfer; V12 exposes integration points for these research directions rather than copying their implementations.

## Major V12 additions
- unordered capture scoring and view selection
- place-recognition and loop-closure preparation
- pose graph health and global consistency scoring
- depth/surface confidence
- Gaussian outlier detection and confidence refinement
- dynamic region tracking and temporal smoothing
- rolling-shutter / motion-aware helpers
- adaptive render budgets, screen-error estimation, foveation, frame pacing
- material/lighting/intrinsic appearance editing
- object transfer planning
- AI hallucination and geometry conflict guards
- semantic scene memory and query routing
- progressive chunking, integrity, delta patches, network-aware schedules
- CAD/BIM anchor refinement, opening verification and construction-readiness checks
- novel-view, temporal-flicker, photometric, semantic and regression metrics
- pipeline contracts, retry policies, job progress and backend selection
- privacy/retention/consent controls
- reconstruction/scene inspector UI view models
- deterministic demo capture and Gaussian scene generation

## Backend boundary
A production GPU worker should connect the orchestration layer to a properly licensed 3DGS backend such as gsplat or an appropriate GraphDeco/Inria implementation. The TypeScript layer intentionally does not pretend to replace CUDA rasterization/training.
