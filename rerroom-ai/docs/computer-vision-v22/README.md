# Computer Vision Dataset V22

This module integrates the V22 scene-dataset contract into the app as a deterministic, testable TypeScript capability. Import the public API from `src/computer-vision-v22`.

The 1,000-record reference split is deterministic (700 train, 150 validation, 150 test) and can be produced in memory with `generateDataset(seed)`. The engineering chapter collection from the supplied V22 package is preserved in [`chapters/`](./chapters/).

## Implemented capabilities

- Scene annotations for normalized 2D boxes, metric 3D cuboids, material labels, relations, camera pose, room measurements, depth confidence, and structural planes.
- Topology, floorplan, walkway-clearance, object-track, measurement-uncertainty, reconstruction, and 360-tour metadata.
- Deterministic synthetic scene and batch generation with explicit train, validation, test, and challenge splits.
- Runtime scene validation with field-level errors, cross-modal checks, valid ranges, and non-fatal clearance warnings. Privacy audits report malformed rows, while evaluation and augmentation reject invalid scenes with contextual errors.
- Metadata-only hard-case augmentation. It adds auditable labels but deliberately does not claim to alter image pixels; both source and augmented scenes are validated.
- Detection, cuboid, material, relation, room-area, collision, walkway, reconstruction, depth-confidence, tour, and hard-case metrics, guarded against invalid prediction and ground-truth scenes.
- JSONL round trips and a COCO-like pixel-box adapter carrying 3D metadata.
- Privacy-gated COCO-like and external JSONL export requiring export approval, consent for captured scenes, and no personal data or precise location. `toJsonl` is an internal serialization helper; use `toPrivacyAuditedJsonl` for external export.

## Limits

Generated examples are synthetic metadata fixtures. They do not include photographs, depth maps, masks, sensor-calibrated measurements, meshes, or Gaussian splats. Their metrics are reference evaluation logic, not evidence of model accuracy. A production dataset still needs licensed imagery and independently verified ground truth.

## Checks

Run `pnpm run computer-vision-v22:check` from the app directory to type-check the module and run its focused tests.
