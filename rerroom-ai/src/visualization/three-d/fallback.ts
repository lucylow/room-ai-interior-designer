import type { SpatialScene, ViewMode } from '../core/types';
import { analyzeScene } from '../core/scene-metrics';

export type FallbackMode = 'three-d' | 'plan' | 'image-summary';

export interface RendererAvailability {
  webgl: boolean;
  hardwareAcceleration: boolean;
  maxTextureSize: number;
}

export function chooseFallback(availability: RendererAvailability, preferred: ViewMode): FallbackMode {
  if (preferred === 'plan') return 'plan';
  if (availability.webgl && availability.hardwareAcceleration) return 'three-d';
  return preferred === 'compare' ? 'plan' : 'image-summary';
}

export function fallbackSummary(scene: SpatialScene): string {
  const metrics = analyzeScene(scene);
  return `Room ${scene.room.width.toFixed(1)}m × ${scene.room.depth.toFixed(1)}m · ${metrics.visibleObjectCount} objects · ${Math.round(metrics.occupancyRatio * 100)}% floor occupancy`;
}

export function supportsWebGL(): boolean {
  try {
    if (typeof document === 'undefined') return false;
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}
