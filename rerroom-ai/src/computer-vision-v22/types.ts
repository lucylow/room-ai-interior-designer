export type Vec2 = { x: number; z: number };
export type Vec3 = { x: number; y: number; z: number };
export type Split = "train" | "validation" | "test" | "challenge";
export type RoomKind =
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "bathroom"
  | "office"
  | "dining_room"
  | "hallway"
  | "studio"
  | "nursery";
export type Material =
  | "wood"
  | "metal"
  | "glass"
  | "stone"
  | "ceramic"
  | "fabric"
  | "leather"
  | "plastic"
  | "paint"
  | "marble"
  | "concrete"
  | "mixed"
  | "unknown";
export type HardCase =
  | "glass_reflection"
  | "mirror_reflection"
  | "heavy_occlusion"
  | "low_light"
  | "backlighting"
  | "repeated_furniture"
  | "clutter"
  | "thin_objects"
  | "wide_angle_distortion"
  | "depth_dropout"
  | "partial_room_scan";

export interface Box2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Cuboid3D {
  center: Vec3;
  size: Vec3;
  yawRadians: number;
}

export interface InstanceAnnotation {
  id: string;
  category: string;
  box2D: Box2D;
  cuboid3D: Cuboid3D;
  material: Material;
  trackId?: string;
  visibility: number;
  occlusion: number;
  confidence: number;
}

export interface SceneAnnotation {
  schemaVersion: "room-ai-cv-v22";
  id: string;
  split: Split;
  source: "synthetic" | "captured" | "rendered";
  room: {
    id: string;
    kind: RoomKind;
    widthM: number;
    lengthM: number;
    heightM: number;
    areaM2: number;
    measurementUncertaintyM: number;
    measurementConfidence: number;
  };
  camera: {
    widthPx: number;
    heightPx: number;
    positionM: Vec3;
    yawRadians: number;
    pitchRadians: number;
    rollRadians: number;
    horizontalFovDegrees: number;
    verticalFovDegrees: number;
  };
  depth: {
    minM: number;
    medianM: number;
    p90M: number;
    maxM: number;
    validFraction: number;
    confidence: number;
  };
  instances: InstanceAnnotation[];
  materials: Array<{ instanceId: string; material: Material; confidence: number }>;
  relations: Array<{
    subjectId: string;
    predicate: string;
    objectId: string;
    confidence: number;
  }>;
  structuralPlanes: Array<{
    id: string;
    kind: "floor" | "wall" | "ceiling" | "opening";
    normal: Vec3;
    point: Vec3;
    areaM2: number;
    confidence: number;
  }>;
  topology: {
    floorplan: Vec2[];
    openings: Array<{ id: string; kind: "door" | "window"; wallId: string }>;
    walkways: Array<{ id: string; clearanceM: number; requiredClearanceM: number }>;
    connectedRoomIds: string[];
  };
  tracks: Array<{ id: string; instanceIds: string[]; timestampsMs: number[] }>;
  reconstruction: {
    meshCompleteness: number;
    splatCoverage: number;
    textureCoverage: number;
    cameraPoseStability: number;
    confidence: number;
  };
  tour: {
    panoramaCoverageDegrees: number;
    seamQuality: number;
    keyframeDiversity: number;
    transitionQuality: number;
  };
  hardCases: HardCase[];
  privacy: {
    classification: "local_only" | "review_required" | "exportable";
    captureConsent: boolean;
    containsPersonalData: boolean;
    preciseLocationPresent: boolean;
  };
  provenance: {
    generator: string;
    seed: number;
    sceneGroupId: string;
    photographicPixelsIncluded: boolean;
  };
  augmentations: Array<{
    kind: HardCase;
    seed: number;
    appliedAt: "metadata";
  }>;
}

export interface ValidationIssue {
  code: string;
  path: string;
  severity: "error" | "warning";
  message: string;
}

export interface ValidationReport {
  valid: boolean;
  issues: ValidationIssue[];
}
