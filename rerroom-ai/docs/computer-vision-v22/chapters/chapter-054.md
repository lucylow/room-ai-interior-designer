# V22 Dataset Engineering — Chapter 054: camera pose

## Objective
Specify a dependable dataset slice for interior scene understanding, furniture detection, measurements, AR placement, 3D reconstruction, and 360-degree tours.

## Contract
Each sample must retain a stable ID, schema version, provenance, room measurements, camera pose, lighting, depth quality, plane annotations, object instances, spatial relations, reconstruction metrics, modalities, difficulty tags, and privacy posture.

## Quality rules
- Use explicit metric units and normalized 2D boxes.
- Treat every confidence value as uncertainty metadata.
- Preserve original data when an augmentation is applied.
- Keep difficult examples and label them rather than silently dropping them.
- Prevent train/validation/test leakage by stable scene identity.
- Do not describe metadata-only synthetic scenes as photographic examples.
- Block export for critical schema errors and keep warnings visible.

## Validation
A scene should have finite geometry, plausible sizes, valid identifiers, valid relation endpoints, confidence in range, and provenance matching its source. Cross-modal agreement matters in addition to object detection scores.

## Real-data boundary
This package supplies synthetic metadata and software contracts, not genuine photographic pixels, sensor-authentic depth maps, or measured rooms. Training a real vision model requires real or appropriately licensed images and verified aligned labels.

## Acceptance criteria
With a fixed seed, generation is deterministic. Every failure emits machine-readable diagnostics, and uncertainty is never silently promoted to ground truth.
