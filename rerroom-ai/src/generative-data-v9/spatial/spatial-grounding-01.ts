import type { SpatialGroundingRecord } from "../core/types";

export const SPATIAL_BATCH_01: SpatialGroundingRecord[] = [
  {
    id: "ground-v9-0001",
    roomType: "bedroom",
    sourceSceneId: "scene-demo-02",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "bed", "x": 1.65, "y": 1.8, "width": 1.95, "depth": 0.85, "rotation": 0},
    expectedDecision: "reject",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0002",
    roomType: "kitchen",
    sourceSceneId: "scene-demo-03",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "desk", "x": 2.3, "y": 2.5, "width": 1.7, "depth": 0.85, "rotation": 0},
    expectedDecision: "adjust",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0003",
    roomType: "dining_room",
    sourceSceneId: "scene-demo-04",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "dining_table", "x": 2.95, "y": 1.1, "width": 1.95, "depth": 0.85, "rotation": 90},
    expectedDecision: "accept",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0004",
    roomType: "home_office",
    sourceSceneId: "scene-demo-05",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "storage", "x": 1.0, "y": 1.8, "width": 1.7, "depth": 0.85, "rotation": 0},
    expectedDecision: "reject",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0005",
    roomType: "entryway",
    sourceSceneId: "scene-demo-06",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "sofa", "x": 1.65, "y": 2.5, "width": 1.95, "depth": 0.85, "rotation": 0},
    expectedDecision: "adjust",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0006",
    roomType: "bathroom",
    sourceSceneId: "scene-demo-07",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "bed", "x": 2.3, "y": 1.1, "width": 1.7, "depth": 0.85, "rotation": 90},
    expectedDecision: "accept",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0007",
    roomType: "nursery",
    sourceSceneId: "scene-demo-08",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "desk", "x": 2.95, "y": 1.8, "width": 1.95, "depth": 0.85, "rotation": 0},
    expectedDecision: "reject",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0008",
    roomType: "studio",
    sourceSceneId: "scene-demo-09",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "dining_table", "x": 1.0, "y": 2.5, "width": 1.7, "depth": 0.85, "rotation": 0},
    expectedDecision: "adjust",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0009",
    roomType: "media_room",
    sourceSceneId: "scene-demo-10",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "storage", "x": 1.65, "y": 1.1, "width": 1.95, "depth": 0.85, "rotation": 90},
    expectedDecision: "accept",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
  {
    id: "ground-v9-0010",
    roomType: "guest_room",
    sourceSceneId: "scene-demo-11",
    anchors: [{"id": "wall-west", "kind": "wall", "x": 0, "y": 0, "width": 0.15, "depth": 5.2, "immutable": true}, {"id": "window-north", "kind": "window", "x": 1.6, "y": 0, "width": 1.8, "depth": 0.1, "immutable": true}, {"id": "door-east", "kind": "door", "x": 5.1, "y": 2.0, "width": 0.15, "depth": 0.9, "immutable": true}],
    candidatePlacement: {"role": "sofa", "x": 2.3, "y": 1.8, "width": 1.7, "depth": 0.85, "rotation": 0},
    expectedDecision: "reject",
    rationale: "Placement is acceptable when it preserves wall/window/door anchors and leaves a readable circulation lane."
  },
];
