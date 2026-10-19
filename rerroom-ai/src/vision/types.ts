import type { Vec3 } from "../core/types";

export interface Quat { w: number; x: number; y: number; z: number; }
export interface CameraPose { position: Vec3; rotation: Quat; timestampMs?: number; confidence?: number; }
export interface FrameObservation {
  id: string;
  timestampMs: number;
  pose?: CameraPose;
  inlierRatio?: number;
  reprojectionErrorPx?: number;
  parallaxDeg?: number;
  exposure?: number;
  sharpness?: number;
}
export interface TrajectoryMetrics {
  totalDistance: number;
  averageStep: number;
  maximumStep: number;
  medianStep: number;
  rotationJitter: number;
  velocityJitter: number;
  stability: number;
  loopClosureError: number;
  loopClosureScore: number;
  confidence: number;
  usable: boolean;
  warnings: string[];
}
export interface CoverageCell { x: number; z: number; observations: number; quality: number; lastSeenMs: number; }
export interface CoverageReport { coverage: number; quality: number; confidence: number; weakCells: CoverageCell[]; suggestedCells: Array<{ x: number; z: number }>; }
export interface DepthSample { x: number; y: number; depthM: number; confidence: number; label?: string; }
export interface SegmentationRegion { label: string; pixelCount: number; meanDepthM: number; depthSpreadM: number; confidence: number; }
export interface Detection {
  id?: string;
  label: string;
  score: number;
  x: number;
  y: number;
  width: number;
  height: number;
  depthM?: number;
  brightness?: number;
  box?: { x: number; y: number; width: number; height: number };
}
export interface PlacementCandidate { position: Vec3; size: Vec3; confidence?: number; }
export interface PlacementValidation { valid: boolean; score: number; collisions: string[]; depthViolations: string[]; anchorViolations: string[]; warnings: string[]; }
export interface SpatialAnchor { id: string; position: Vec3; normal?: Vec3; toleranceM: number; confidence: number; }
export interface TourFrame { roomId: string; pose: CameraPose; visibleAnchorIds: string[]; timestampMs?: number; }
export interface QualityScore { score: number; confidence: number; usable: boolean; warnings: string[]; metrics: Record<string, number>; }
