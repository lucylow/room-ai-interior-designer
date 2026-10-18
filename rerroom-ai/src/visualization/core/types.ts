export type ID = string;

export interface Vec2 { x: number; y: number; }
export interface Vec3 { x: number; y: number; z: number; }
export interface Size2 { width: number; height: number; }
export interface Size3 { width: number; height: number; depth: number; }

export interface Transform3D {
  position: Vec3;
  rotationY: number;
  scale: Vec3;
}

export interface Rect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AABB3 {
  min: Vec3;
  max: Vec3;
}

export interface WallSegment {
  id: ID;
  start: Vec2;
  end: Vec2;
  thickness: number;
  materialId?: string;
}

export interface Opening {
  id: ID;
  wallId: ID;
  offset: number;
  width: number;
  height: number;
  sillHeight: number;
  kind: 'door' | 'window' | 'arch';
  swing?: 'left' | 'right' | 'double' | 'none';
}

export interface MaterialRef {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  opacity: number;
  textureUrl?: string;
  normalUrl?: string;
}

export interface SceneObject {
  id: ID;
  type: string;
  label: string;
  transform: Transform3D;
  size: Size3;
  visible: boolean;
  locked: boolean;
  selected?: boolean;
  materialId?: string;
  assetId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface Measurement {
  id: ID;
  kind: 'distance' | 'area' | 'perimeter' | 'angle' | 'height';
  a: Vec3;
  b?: Vec3;
  points?: Vec3[];
  value: number;
  unit: 'm' | 'cm' | 'ft' | 'in' | 'deg';
  label?: string;
  visible: boolean;
}

export interface LightingPreset {
  id: string;
  name: string;
  ambient: number;
  keyIntensity: number;
  fillIntensity: number;
  colorTemperature: number;
  sunAzimuth: number;
  sunElevation: number;
  shadows: boolean;
}

export interface SceneMetadata {
  id: ID;
  roomId: ID;
  version: number;
  unit: 'm';
  createdAt: number;
  updatedAt: number;
}

export interface SpatialScene {
  metadata: SceneMetadata;
  room: {
    width: number;
    depth: number;
    ceiling: number;
    walls: WallSegment[];
    openings: Opening[];
    floorMaterialId?: string;
    wallMaterialId?: string;
  };
  objects: SceneObject[];
  measurements: Measurement[];
  materials: MaterialRef[];
  lighting: LightingPreset;
}

export type ViewMode = 'plan' | 'three-d' | 'split' | 'tour' | 'compare';

export interface Viewport2D {
  x: number;
  y: number;
  zoom: number;
  width: number;
  height: number;
  rotation: number;
}

export interface CameraPose {
  position: Vec3;
  target: Vec3;
  fov: number;
  near: number;
  far: number;
}

export type CameraPresetId =
  | 'top'
  | 'hero'
  | 'eye-level'
  | 'corner'
  | 'wide'
  | 'detail'
  | 'ceiling';

export interface CameraKeyframe {
  at: number;
  pose: CameraPose;
}

export interface CameraTour {
  id: ID;
  name: string;
  durationMs: number;
  loop: boolean;
  keyframes: CameraKeyframe[];
}

export interface SelectionState {
  selectedIds: ID[];
  primaryId?: ID;
  hoveredId?: ID;
  mode: 'object' | 'measurement' | 'wall' | 'opening';
}

export interface CompareState {
  enabled: boolean;
  baselineSceneId?: ID;
  activeSceneId?: ID;
  split: number;
  showDiffOnly: boolean;
}

export interface VisualizationToggles {
  showGrid: boolean;
  showDimensions: boolean;
  showLabels: boolean;
  showOpenings: boolean;
  showShadows: boolean;
  showCeiling: boolean;
  showFurniture: boolean;
  reducedMotion: boolean;
  presentationMode: boolean;
}

export interface VisualizationState {
  scene: SpatialScene;
  mode: ViewMode;
  viewport: Viewport2D;
  camera: CameraPose;
  selection: SelectionState;
  compare: CompareState;
  toggles: VisualizationToggles;
  historyIndex: number;
  historySize: number;
}
