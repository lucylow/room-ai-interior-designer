import type { Gaussian3D, SceneAnchor, TrainingConfig, SceneQuality } from './types';

export const DEFAULT_EPSILON = 1e-6;
export const MAX_SPLAT_COUNT_PREVIEW = 350_000;
export const MAX_SPLAT_RADIUS_PX = 96;
export const MIN_OPACITY = 0.0001;
export const MAX_OPACITY = 0.9999;

export function assertFinite(value: number, label: string): number {
  if (!Number.isFinite(value)) throw new Error(`${label} must be finite`);
  return value;
}

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function validateGaussian(g: Gaussian3D): void {
  if (!g.id) throw new Error('Gaussian requires id');
  for (const v of g.mean) assertFinite(v, `${g.id}.mean`);
  for (const v of g.scale) {
    assertFinite(v, `${g.id}.scale`);
    if (v <= 0) throw new Error(`${g.id}.scale must be positive`);
  }
  for (const v of g.rotation) assertFinite(v, `${g.id}.rotation`);
  if (g.opacity < 0 || g.opacity > 1) throw new Error(`${g.id}.opacity out of range`);
  if (g.confidence < 0 || g.confidence > 1) throw new Error(`${g.id}.confidence out of range`);
}

export function validateAnchor(anchor: SceneAnchor): void {
  if (!anchor.id || !anchor.sourceId) throw new Error('Anchor identity is required');
  if (anchor.confidence < 0 || anchor.confidence > 1) throw new Error('Anchor confidence out of range');
}

export function validateTrainingConfig(config: TrainingConfig): void {
  if (config.iterations < 1) throw new Error('iterations must be >= 1');
  if (config.shDegree < 0 || config.shDegree > 5) throw new Error('unsupported SH degree');
  if (config.densifyEvery <= 0) throw new Error('densifyEvery must be > 0');
  if (config.densifyUntil > config.iterations) throw new Error('densifyUntil cannot exceed iterations');
}

export function qualityScore(q: Omit<SceneQuality, 'score'>): number {
  const positive = (q.reconstructionCoverage + q.photometricConsistency + q.geometryStability + q.poseConfidence + q.relocalizationConfidence) / 5;
  const penalties = Math.min(1, q.holes * 0.5 + q.floaters * 0.5);
  return clamp01(positive * (1 - penalties));
}
