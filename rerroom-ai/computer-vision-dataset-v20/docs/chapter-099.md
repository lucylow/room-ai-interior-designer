# V20 Vision Dataset Engineering — Chapter 099

## Focus
`relation_floor_contact`

## Implementation slice
This chapter defines one deterministic computer-vision dataset capability for the RE:ROOM AI interior-design workflow. The feature is designed to consume synchronized RGB, depth, semantic, geometric, and camera metadata rather than assuming a single perfect detector.

## Dataset representation
Each record can include normalized 2D boxes, polygons, 3D cuboids, planes, depth summaries, camera intrinsics and pose, lighting state, materials, occlusion, spatial relations, room topology, and hard-case tags. This allows downstream modules to exercise placement, measurement, reconstruction, 3DGS, floorplan, and 360-tour features against the same scene identity.

## Robustness rules
- Keep confidence bounded to `[0,1]`.
- Never silently convert missing depth into a high-confidence metric.
- Preserve provenance when an annotation is derived from another modality.
- Keep synthetic fixtures deterministic so demo screenshots and tests are reproducible.
- Treat hard cases as explicit labels rather than hidden failures.

## Suggested validation
Test empty arrays, partial depth, heavy occlusion, large camera motion, reflective surfaces, low light, and objects near frame boundaries. Regression tests should validate invariants and output contracts rather than relying on visual pixel equality.

## Native handoff
The V20 contracts are compatible with an iOS capture adapter. Apple documents ARKit scene depth as LiDAR-derived distance data with an associated confidence map, and scene reconstruction as a polygonal mesh with optional classification. RoomPlan provides structured room capture data that can be used for interior measurements and virtual furniture previews.
