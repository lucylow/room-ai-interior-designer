import { RNG } from "../core/rng";
import { ROOM_TEMPLATES } from "../scenarios/roomTemplates";
import { OBJECT_SPECS } from "../catalog/objectCatalog";
import { MATERIAL_CLASSES, ROOM_TYPES } from "../dataset/schema";
import {
  DatasetRecord,
  LightingClass,
  ObjectAnnotation,
  OcclusionClass,
  PlaneAnnotation,
  RelationAnnotation,
  RoomTopology,
  RoomType,
} from "../core/types";

const randHex = (rng: RNG) =>
  Math.floor(rng.next() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
const LIGHTING_CLASSES: LightingClass[] = [
  "daylight",
  "warm_artificial",
  "cool_artificial",
  "mixed",
  "low_light",
  "high_contrast",
];
const OCCLUSION_CLASSES: OcclusionClass[] = ["none", "partial", "heavy"];
export class SceneGenerator {
  constructor(private seed = 20261008) {
    if (!Number.isSafeInteger(seed)) throw new RangeError("seed must be a safe integer");
  }
  generate(index: number, split: DatasetRecord["split"]): DatasetRecord {
    if (!Number.isSafeInteger(index) || index < 0)
      throw new RangeError("index must be a non-negative safe integer");
    const rng = new RNG(this.seed + index * 7919);
    const roomType: RoomType = rng.pick(ROOM_TYPES);
    const width = 6 + rng.float(0, 8),
      depth = 5 + rng.float(0, 7),
      height = 2.4 + rng.float(0, 1.0);
    const objects: ObjectAnnotation[] = [];
    const names = ROOM_TEMPLATES[roomType];
    let n = 0;
    for (const className of names) {
      const spec = OBJECT_SPECS[className];
      if (!spec) continue;
      const w = rng.float(spec.min.w, spec.max.w),
        h = rng.float(spec.min.h, spec.max.h),
        d = rng.float(spec.min.d, spec.max.d);
      const x = rng.float(w / 2, width - w / 2),
        z = rng.float(d / 2, depth - d / 2),
        bw = rng.float(0.15, 0.45),
        bh = rng.float(0.1, 0.4);
      const box2D = { x: rng.float(0, 1 - bw), y: rng.float(0, 1 - bh), width: bw, height: bh };
      objects.push({
        id: `obj-${index}-${n++}`,
        className,
        box2D,
        box3D: {
          center: { x, y: h / 2, z },
          size: { width: w, height: h, depth: d },
          yaw: rng.float(-Math.PI, Math.PI),
        },
        material: rng.pick(MATERIAL_CLASSES),
        occlusion: rng.pick(OCCLUSION_CLASSES),
        truncation: rng.float(0, 0.12),
        detectionConfidence: rng.float(0.68, 0.99),
        depthMeters: rng.float(0.5, Math.max(0.6, width + depth) / 2),
        attributes: { syntheticColor: randHex(rng), anchorStable: rng.bool(0.82) },
      });
    }
    const planes: PlaneAnnotation[] = [
      {
        id: `floor-${index}`,
        semantic: "floor",
        normal: { x: 0, y: 1, z: 0 },
        distance: 0,
        polygon: [
          { x: 0, y: 0, z: 0 },
          { x: width, y: 0, z: 0 },
          { x: width, y: 0, z: depth },
          { x: 0, y: 0, z: depth },
        ],
        area: width * depth,
        confidence: rng.float(0.9, 0.99),
      },
      {
        id: `wall-a-${index}`,
        semantic: "wall",
        normal: { x: 1, y: 0, z: 0 },
        distance: 0,
        polygon: [
          { x: 0, y: 0, z: 0 },
          { x: 0, y: height, z: 0 },
          { x: 0, y: height, z: depth },
          { x: 0, y: 0, z: depth },
        ],
        area: height * depth,
        confidence: rng.float(0.88, 0.98),
      },
      {
        id: `wall-b-${index}`,
        semantic: "wall",
        normal: { x: 0, y: 0, z: 1 },
        distance: 0,
        polygon: [
          { x: 0, y: 0, z: 0 },
          { x: width, y: 0, z: 0 },
          { x: width, y: height, z: 0 },
          { x: 0, y: height, z: 0 },
        ],
        area: height * width,
        confidence: rng.float(0.88, 0.98),
      },
      {
        id: `ceiling-${index}`,
        semantic: "ceiling",
        normal: { x: 0, y: -1, z: 0 },
        distance: height,
        polygon: [
          { x: 0, y: height, z: 0 },
          { x: width, y: height, z: 0 },
          { x: width, y: height, z: depth },
          { x: 0, y: height, z: depth },
        ],
        area: width * depth,
        confidence: rng.float(0.85, 0.97),
      },
    ];
    const relations: RelationAnnotation[] = [];
    for (let i = 0; i < objects.length; i++)
      for (let j = i + 1; j < Math.min(objects.length, i + 4); j++) {
        const r = rng.next();
        if (r < 0.45)
          relations.push({
            subjectId: objects[i].id,
            objectId: objects[j].id,
            relation: r < 0.15 ? "near" : r < 0.3 ? "left_of" : "adjacent_to",
            confidence: rng.float(0.65, 0.96),
          });
      }
    const room: RoomTopology = {
      roomId: `room-${index}`,
      roomType,
      areaM2: width * depth,
      perimeterM: 2 * (width + depth),
      openings: objects.filter((o) => o.className === "door" || o.className === "window").map((o) => o.id),
      adjacentRooms: [],
      boundary: [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: depth },
        { x: 0, y: depth },
      ],
    };
    const valid = rng.float(0.7, 0.995),
      meanDepth = rng.float(1.5, 6.5);
    const lighting = {
      type: rng.pick(LIGHTING_CLASSES),
      colorTemperatureK: rng.float(2700, 6500),
      intensityLux: rng.float(80, 850),
      dynamicRange: rng.float(3, 12),
      shadowStrength: rng.float(0, 1),
      confidence: rng.float(0.7, 0.99),
    };
    const hardTags: string[] = [];
    if (rng.bool(0.18)) hardTags.push("mirror_reflection");
    if (rng.bool(0.16)) hardTags.push("glass");
    if (rng.bool(0.12)) hardTags.push("repetitive_furniture");
    if (rng.bool(0.1)) hardTags.push("low_light");
    if (rng.bool(0.12)) hardTags.push("heavy_occlusion");
    if (rng.bool(0.1)) hardTags.push("crowded_room");
    if (rng.bool(0.1)) hardTags.push("backlighting");
    if (rng.bool(0.1)) hardTags.push("motion_blur");
    return {
      split,
      id: `scene-${index.toString().padStart(6, "0")}`,
      sequenceId: `seq-${Math.floor(index / 8)
        .toString()
        .padStart(5, "0")}`,
      frameIndex: index % 8,
      room,
      objects,
      planes,
      relations,
      depth: {
        min: 0.3,
        max: Math.max(8, meanDepth * 2),
        mean: meanDepth,
        median: meanDepth + rng.float(-0.3, 0.3),
        p10: Math.max(0.25, meanDepth - 0.7),
        p90: meanDepth + 0.8,
        validFraction: valid,
        confidence: rng.float(0.68, 0.99),
      },
      camera: {
        intrinsics: { fx: 900, fy: 900, cx: 540, cy: 960, width: 1080, height: 1920 },
        pose: {
          position: { x: rng.float(-1, 1), y: rng.float(1, 1.8), z: rng.float(-1, 1) },
          yaw: rng.float(-Math.PI, Math.PI),
          pitch: rng.float(-0.3, 0.3),
          roll: rng.float(-0.03, 0.03),
        },
        distanceToFloorM: rng.float(1.0, 1.8),
        motionBlur: rng.float(0, 0.25),
        exposure: rng.float(0.55, 1),
        whiteBalanceDrift: rng.float(0, 0.2),
      },
      lighting,
      modalities: ["rgb", "depth", "segmentation", "instance", "pointcloud", "mesh", "floorplan", "panorama"],
      hardCase: hardTags.length
        ? {
            tags: hardTags,
            severity: rng.float(0.35, 0.9),
            notes: ["synthetic hard case for robust validation"],
          }
        : undefined,
      source: "synthetic_demo",
      version: "20.0.0",
    };
  }
}
