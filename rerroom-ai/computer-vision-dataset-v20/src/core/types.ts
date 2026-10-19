export type Modality =
  "rgb" | "depth" | "normal" | "segmentation" | "instance" | "pointcloud" | "mesh" | "floorplan" | "panorama";
export type RoomType =
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "dining_room"
  | "bathroom"
  | "office"
  | "hallway"
  | "entryway"
  | "studio"
  | "basement";
export type ObjectClass =
  | "wall"
  | "floor"
  | "ceiling"
  | "door"
  | "window"
  | "sofa"
  | "chair"
  | "table"
  | "bed"
  | "nightstand"
  | "desk"
  | "cabinet"
  | "countertop"
  | "island"
  | "tv"
  | "lamp"
  | "rug"
  | "plant"
  | "stool"
  | "shelf"
  | "dresser"
  | "toilet"
  | "sink"
  | "bathtub"
  | "refrigerator"
  | "oven"
  | "mirror"
  | "console"
  | "unknown";
export type MaterialClass =
  | "paint"
  | "wood"
  | "stone"
  | "marble"
  | "tile"
  | "carpet"
  | "glass"
  | "metal"
  | "fabric"
  | "leather"
  | "plastic"
  | "concrete"
  | "brick"
  | "unknown";
export type LightingClass =
  "daylight" | "warm_artificial" | "cool_artificial" | "mixed" | "low_light" | "high_contrast";
export type OcclusionClass = "none" | "partial" | "heavy";

export interface Vec2 {
  x: number;
  y: number;
}
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
export interface Size3 {
  width: number;
  height: number;
  depth: number;
}
export interface Box2D {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Polygon2D {
  points: Vec2[];
}
export interface CameraIntrinsics {
  fx: number;
  fy: number;
  cx: number;
  cy: number;
  width: number;
  height: number;
}
export interface CameraPose {
  position: Vec3;
  yaw: number;
  pitch: number;
  roll: number;
}
export interface DepthStats {
  min: number;
  max: number;
  mean: number;
  median: number;
  p10: number;
  p90: number;
  validFraction: number;
  confidence: number;
}
export interface BoundingBox3D {
  center: Vec3;
  size: Size3;
  yaw: number;
}
export interface PlaneAnnotation {
  id: string;
  semantic: ObjectClass;
  normal: Vec3;
  distance: number;
  polygon: Vec3[];
  area: number;
  confidence: number;
}
export interface ObjectAnnotation {
  id: string;
  className: ObjectClass;
  box2D: Box2D;
  polygon2D?: Polygon2D;
  box3D?: BoundingBox3D;
  material?: MaterialClass;
  occlusion: OcclusionClass;
  truncation: number;
  detectionConfidence: number;
  depthMeters?: number;
  supportId?: string;
  attributes: Record<string, string | number | boolean>;
}
export interface RelationAnnotation {
  subjectId: string;
  relation:
    | "left_of"
    | "right_of"
    | "in_front_of"
    | "behind"
    | "near"
    | "supports"
    | "touching"
    | "inside"
    | "adjacent_to"
    | "aligned_with";
  objectId: string;
  confidence: number;
}
export interface RoomTopology {
  roomId: string;
  roomType: RoomType;
  areaM2: number;
  perimeterM: number;
  openings: string[];
  adjacentRooms: string[];
  boundary: Vec2[];
}
export interface LightingAnnotation {
  type: LightingClass;
  colorTemperatureK: number;
  intensityLux: number;
  dynamicRange: number;
  shadowStrength: number;
  confidence: number;
}
export interface CameraAnnotation {
  intrinsics: CameraIntrinsics;
  pose: CameraPose;
  distanceToFloorM: number;
  motionBlur: number;
  exposure: number;
  whiteBalanceDrift: number;
}
export interface HardCaseAnnotation {
  tags: string[];
  severity: number;
  notes: string[];
}
export interface DatasetRecord {
  id: string;
  sequenceId: string;
  frameIndex: number;
  split: "train" | "validation" | "test" | "hard_case";
  room: RoomTopology;
  objects: ObjectAnnotation[];
  planes: PlaneAnnotation[];
  relations: RelationAnnotation[];
  depth: DepthStats;
  camera: CameraAnnotation;
  lighting: LightingAnnotation;
  modalities: Modality[];
  hardCase?: HardCaseAnnotation;
  source: "synthetic_demo" | "user_capture_stub" | "render_stub";
  version: string;
}
export interface DatasetManifest {
  version: string;
  createdAt: string;
  recordCount: number;
  splits: Record<string, number>;
  classes: string[];
  modalities: string[];
  seed: number;
}
