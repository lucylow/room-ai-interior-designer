import type { HardCase, InstanceAnnotation, Material, RoomKind, SceneAnnotation, Split } from "./types";

const rooms: RoomKind[] = ["living_room", "bedroom", "kitchen", "bathroom", "office", "dining_room"];
const furniture: Array<{ category: string; material: Material; size: [number, number, number] }> = [
  { category: "sofa", material: "fabric", size: [2.1, 0.85, 0.9] },
  { category: "coffee_table", material: "wood", size: [1.0, 0.42, 0.58] },
  { category: "armchair", material: "leather", size: [0.82, 0.9, 0.82] },
  { category: "floor_lamp", material: "metal", size: [0.32, 1.65, 0.32] },
];

class SeededRandom {
  private state: number;

  constructor(seed: number) {
    if (!Number.isSafeInteger(seed)) throw new Error("seed_must_be_a_safe_integer");
    this.state = seed >>> 0 || 1;
  }

  next(): number {
    let value = this.state;
    value ^= value << 13;
    value ^= value >>> 17;
    value ^= value << 5;
    this.state = value >>> 0;
    return this.state / 0x1_0000_0000;
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  pick<T>(values: readonly T[]): T {
    return values[Math.floor(this.next() * values.length)];
  }
}

const round = (value: number, places = 3): number => Number(value.toFixed(places));

export function generateScene(
  seed: number,
  id: string,
  split: Split = "train",
  hardCases: HardCase[] = [],
): SceneAnnotation {
  if (!id.trim()) throw new Error("scene_id_required");
  const random = new SeededRandom(seed);
  const widthM = round(random.range(4.2, 6.4), 2);
  const lengthM = round(random.range(4.8, 7.2), 2);
  const heightM = 2.7;
  const firstFurniture = Math.floor(random.next() * furniture.length);
  const selected = [0, 1, 2].map((offset) => furniture[(firstFurniture + offset) % furniture.length]);
  const positions: Array<[number, number]> = [
    [-0.7, -1.25],
    [0.55, -0.1],
    [1.25, 1.1],
  ];
  const instances: InstanceAnnotation[] = selected.map((item, index) => {
    const [sizeX, sizeY, sizeZ] = item.size;
    const [x, z] = positions[index];
    const yawRadians = round(random.range(-0.1, 0.1), 4);
    const pixelWidth = (sizeX / widthM) * 0.72;
    const pixelHeight = (sizeZ / lengthM) * 0.72;
    return {
      id: `${id}-object-${index + 1}`,
      category: item.category,
      box2D: {
        x: round(0.5 + x / widthM - pixelWidth / 2),
        y: round(0.5 + z / lengthM - pixelHeight / 2),
        width: round(pixelWidth),
        height: round(pixelHeight),
      },
      cuboid3D: {
        center: { x, y: round(sizeY / 2), z },
        size: { x: sizeX, y: sizeY, z: sizeZ },
        yawRadians,
      },
      material: item.material,
      visibility: round(random.range(0.82, 1)),
      occlusion: round(random.range(0, 0.18)),
      confidence: round(random.range(0.76, 0.98)),
    };
  });

  return {
    schemaVersion: "room-ai-cv-v22",
    id,
    split,
    source: "synthetic",
    room: {
      id: `${id}-room`,
      kind: random.pick(rooms),
      widthM,
      lengthM,
      heightM,
      areaM2: round(widthM * lengthM, 2),
      measurementUncertaintyM: 0.025,
      measurementConfidence: 0.96,
    },
    camera: {
      widthPx: 1920,
      heightPx: 1080,
      positionM: { x: 0, y: 1.55, z: -lengthM / 2 + 0.2 },
      yawRadians: 0,
      pitchRadians: round(random.range(-0.08, 0.08), 4),
      rollRadians: 0,
      horizontalFovDegrees: 84,
      verticalFovDegrees: 53,
    },
    depth: {
      minM: 0.2,
      medianM: round(random.range(2.2, 3.1), 2),
      p90M: 4.6,
      maxM: 6.8,
      validFraction: 0.94,
      confidence: 0.91,
    },
    instances,
    materials: instances.map(({ id: instanceId, material, confidence }) => ({
      instanceId,
      material,
      confidence,
    })),
    relations: [
      {
        subjectId: instances[0].id,
        predicate: "faces",
        objectId: instances[1].id,
        confidence: 0.88,
      },
      {
        subjectId: instances[2].id,
        predicate: "near",
        objectId: instances[1].id,
        confidence: 0.82,
      },
    ],
    structuralPlanes: [
      {
        id: `${id}-floor`,
        kind: "floor",
        normal: { x: 0, y: 1, z: 0 },
        point: { x: 0, y: 0, z: 0 },
        areaM2: round(widthM * lengthM, 2),
        confidence: 0.98,
      },
      {
        id: `${id}-wall`,
        kind: "wall",
        normal: { x: 1, y: 0, z: 0 },
        point: { x: -widthM / 2, y: 0, z: 0 },
        areaM2: round(lengthM * heightM, 2),
        confidence: 0.91,
      },
    ],
    topology: {
      floorplan: [
        { x: -widthM / 2, z: -lengthM / 2 },
        { x: widthM / 2, z: -lengthM / 2 },
        { x: widthM / 2, z: lengthM / 2 },
        { x: -widthM / 2, z: lengthM / 2 },
      ],
      openings: [{ id: `${id}-door`, kind: "door", wallId: `${id}-wall` }],
      walkways: [{ id: `${id}-main-walkway`, clearanceM: 0.92, requiredClearanceM: 0.8 }],
      connectedRoomIds: [],
    },
    tracks: [],
    reconstruction: {
      meshCompleteness: 0.9,
      splatCoverage: 0.88,
      textureCoverage: 0.92,
      cameraPoseStability: 0.96,
      confidence: 0.89,
    },
    tour: {
      panoramaCoverageDegrees: 360,
      seamQuality: 0.93,
      keyframeDiversity: 0.86,
      transitionQuality: 0.9,
    },
    hardCases: [...new Set(hardCases)],
    privacy: {
      classification: "local_only",
      captureConsent: false,
      containsPersonalData: false,
      preciseLocationPresent: false,
    },
    provenance: {
      generator: "room-ai-cv-v22-seeded",
      seed,
      sceneGroupId: id,
      photographicPixelsIncluded: false,
    },
    augmentations: [],
  };
}

export function generateBatch(seed: number, count: number, split: Split = "train"): SceneAnnotation[] {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error("count_must_be_a_non_negative_safe_integer");
  }
  if (count > 10_000) throw new Error("batch_count_exceeds_limit");
  return Array.from({ length: count }, (_, index) =>
    generateScene(seed + index * 7919, `scene-${String(index + 1).padStart(6, "0")}`, split),
  );
}

export function generateDataset(seed: number): {
  records: SceneAnnotation[];
  splits: Record<Split, number>;
} {
  const splits: Record<Split, number> = {
    train: 700,
    validation: 150,
    test: 150,
    challenge: 0,
  };
  const records: SceneAnnotation[] = [];
  let index = 0;
  for (const split of ["train", "validation", "test"] as const) {
    for (let splitIndex = 0; splitIndex < splits[split]; splitIndex += 1) {
      records.push(
        generateScene(seed + index * 7919, `v22-scene-${String(index + 1).padStart(6, "0")}`, split),
      );
      index += 1;
    }
  }
  return { records, splits };
}
