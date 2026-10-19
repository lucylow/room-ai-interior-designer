# RE:ROOM AI — Computer Vision Dataset V20

This package adds a much richer synthetic computer-vision dataset and the code needed to generate, validate, augment, split, and export it.

## What is new

The corpus is organized around one shared scene identity so multiple vision tasks can be tested together:

**RGB → Depth → Semantics → Instances → 3D Geometry → Room Topology → Relations → Measurement → Placement → 3DGS QA → 360 Tour QA**

### Dataset dimensions

- 10 room types
- 20+ interior object categories
- 13 material classes
- 6 lighting conditions
- RGB, depth, segmentation, instance, point cloud, mesh, floorplan, and panorama modalities
- 3D cuboids and surface planes
- spatial relationship graphs
- camera intrinsics + pose metadata
- occlusion/truncation labels
- hard-case tags for reflective, glass, low-light, repetitive, crowded, and backlit scenes
- deterministic augmentation modules
- validation modules and split logic
- 160 synthetic JSONL records across four demo shards
- hard-case tags for motion, reflective surfaces, glass, low light, repetition, crowding, and backlighting

## Important

The bundled records are synthetic demo metadata. They do not contain raw photographs and they are not claimed to be a production training corpus. Their purpose is to make the app's computer-vision pipeline feel substantially more realistic during development, demos, and integration testing.

## Generate and validate

Import the package API from `src/index.ts`:

```ts
import { buildDataset, toJsonl } from "./src";

const { records, manifest } = buildDataset();
const jsonl = toJsonl(records);
```

`buildDataset()` creates up to 1,200 deterministic records. Counts must be integers from 0 through 1,200; invalid input or an invalid generated record raises an error rather than silently reducing the requested dataset size.

Run the focused type-check and regression suite from the repository root:

```sh
pnpm run computer-vision-dataset-v20:check
```

The suite validates generated records and all bundled JSONL records, including normalized 2D boxes and ordered depth percentiles.

## Apple integration boundary

The native iOS adapter should treat ARKit capabilities as optional and check device support before enabling LiDAR scene depth or scene reconstruction. RoomPlan remains a structured-room capture path; the dataset contracts are deliberately broader so the same scene can also support custom CV, 3DGS, and panorama workflows.
