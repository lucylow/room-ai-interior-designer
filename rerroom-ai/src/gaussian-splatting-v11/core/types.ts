export type Vec3 = [number, number, number];
export type Vec2 = [number, number];
export type Quat = [number, number, number, number];
export type Mat3 = [number, number, number, number, number, number, number, number, number];
export type Mat4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

export type SplatId = string;
export type SceneId = string;
export type FrameId = string;
export type AssetId = string;
export type AnchorId = string;

export type CaptureSource = 'photo' | 'video' | 'mixed';
export type StageStatus = 'queued' | 'running' | 'completed' | 'failed' | 'skipped';
export type SceneAuthority = 'captured' | 'cad-bim' | 'derived';
export type RenderMode = 'rgb' | 'depth' | 'normal' | 'semantic' | 'confidence';
export type QualityTier = 'preview' | 'balanced' | 'high' | 'ultra';

export interface Gaussian3D {
  id: SplatId;
  mean: Vec3;
  scale: Vec3;
  rotation: Quat;
  opacity: number;
  shDegree: number;
  sh: number[];
  semanticLabel?: string;
  materialClass?: string;
  anchorId?: AnchorId;
  confidence: number;
  sourceFrameIds: FrameId[];
}

export interface SplatBounds {
  center: Vec3;
  radius: number;
  min: Vec3;
  max: Vec3;
}

export interface CameraIntrinsics {
  fx: number;
  fy: number;
  cx: number;
  cy: number;
  width: number;
  height: number;
  near: number;
  far: number;
}

export interface CameraPose {
  position: Vec3;
  rotation: Quat;
}

export interface CameraFrame {
  id: FrameId;
  timestampMs: number;
  fileName: string;
  width: number;
  height: number;
  sharpness: number;
  exposure: number;
  motionBlur: number;
  pose?: CameraPose;
  intrinsics?: CameraIntrinsics;
}

export interface CaptureManifest {
  id: string;
  source: CaptureSource;
  roomId: string;
  frames: CameraFrame[];
  createdAt: string;
  privacy: {
    strippedMetadata: boolean;
    faceBlurred: boolean;
    consentPurpose: string;
  };
}

export interface GaussianScene {
  id: SceneId;
  roomId: string;
  coordinateSystem: 'meters-right-handed';
  sourceManifestId: string;
  authority: SceneAuthority;
  splats: Gaussian3D[];
  bounds: SplatBounds;
  cameraIds: FrameId[];
  semanticVersion: number;
  createdAt: string;
  quality: SceneQuality;
}

export interface SceneQuality {
  reconstructionCoverage: number;
  photometricConsistency: number;
  geometryStability: number;
  poseConfidence: number;
  relocalizationConfidence: number;
  holes: number;
  floaters: number;
  score: number;
}

export interface RenderCamera {
  id: string;
  pose: CameraPose;
  intrinsics: CameraIntrinsics;
}

export interface ProjectedSplat {
  id: SplatId;
  center: Vec2;
  depth: number;
  radiusPx: number;
  conic: [number, number, number];
  opacity: number;
  color: [number, number, number];
  semanticLabel?: string;
  confidence: number;
  tileX: number;
  tileY: number;
}

export interface RenderTarget {
  width: number;
  height: number;
  tileSize: number;
  background: [number, number, number];
}

export interface RenderResult {
  mode: RenderMode;
  width: number;
  height: number;
  rgba: Float32Array;
  depth: Float32Array;
  alpha: Float32Array;
  visibleSplats: number;
  culledSplats: number;
  frameMs: number;
}

export interface SplatTile {
  id: string;
  x: number;
  y: number;
  level: number;
  splatIds: SplatId[];
  bounds: SplatBounds;
}

export interface StreamChunk {
  id: string;
  level: number;
  tileId: string;
  splatIds: SplatId[];
  byteLength: number;
  priority: number;
}

export interface SceneAnchor {
  id: AnchorId;
  type: 'wall' | 'floor' | 'ceiling' | 'door' | 'window' | 'room' | 'object';
  sourceId: string;
  position: Vec3;
  normal: Vec3;
  confidence: number;
  authority: 'cad-bim' | 'vision' | 'manual';
}

export interface CadBimReference {
  sourceId: string;
  sourceType: 'cad' | 'ifc';
  entityId: string;
  anchorId: AnchorId;
  position: Vec3;
  scale: Vec3;
}

export interface SceneQuery {
  text: string;
  roomId: string;
  semanticLabels?: string[];
  materialClasses?: string[];
  anchorIds?: string[];
  maxResults: number;
  minConfidence: number;
}

export interface SceneQueryResult {
  splatId: SplatId;
  relevance: number;
  distance: number;
  confidence: number;
  rationale: string;
}

export interface EditInstruction {
  id: string;
  prompt: string;
  targetLabels: string[];
  operation: 'recolor' | 'material' | 'remove' | 'replace' | 'relight' | 'mask' | 'reconstruct';
  preserveAnchors: boolean;
  preserveGeometry: boolean;
  createdAt: string;
}

export interface ReconstructionJob {
  id: string;
  sceneId: SceneId;
  manifestId: string;
  qualityTier: QualityTier;
  stages: ReconstructionStage[];
  gpuRequired: boolean;
  seed: number;
}

export interface ReconstructionStage {
  id: string;
  name: string;
  status: StageStatus;
  dependsOn: string[];
  progress: number;
  message?: string;
}

export interface TrainingConfig {
  iterations: number;
  shDegree: number;
  positionLearningRate: number;
  featureLearningRate: number;
  opacityLearningRate: number;
  scalingLearningRate: number;
  rotationLearningRate: number;
  densifyFrom: number;
  densifyUntil: number;
  densifyEvery: number;
  opacityResetEvery: number;
  evalEvery: number;
  seed: number;
}

export interface TrainingCheckpoint {
  iteration: number;
  splatCount: number;
  loss: number;
  psnr: number;
  ssim: number;
  lpipsProxy: number;
  createdAt: string;
}

export interface DatasetExample {
  id: string;
  task: 'caption' | 'segmentation' | 'grounding' | 'edit' | 'quality' | 'ranking';
  roomType: string;
  style: string;
  text: string;
  expectedLabels: string[];
  difficulty: number;
}
