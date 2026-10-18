import type { SpatialScene } from '../core/types';

export interface RenderBudget {
  maxVisibleObjects: number;
  maxTexturePixels: number;
  maxShadowMap: number;
  targetFps: number;
  maxFrameMs: number;
  maxInitialLoadMs: number;
}

export interface PerformanceSnapshot {
  frameMs: number;
  fps: number;
  visibleObjects: number;
  estimatedTexturePixels: number;
  quality: number;
}

export const DEFAULT_BUDGET: RenderBudget = {
  maxVisibleObjects: 160,
  maxTexturePixels: 24_000_000,
  maxShadowMap: 2048,
  targetFps: 60,
  maxFrameMs: 16.67,
  maxInitialLoadMs: 3500,
};

export function estimateSceneCost(scene: SpatialScene): number {
  return scene.objects.filter(item => item.visible).reduce((sum, item) => {
    const sizeCost = item.size.width * item.size.depth * 10;
    return sum + Math.max(1, sizeCost);
  }, 0);
}

export function chooseInitialQuality(scene: SpatialScene, budget = DEFAULT_BUDGET): number {
  const cost = estimateSceneCost(scene);
  return Math.max(0.35, Math.min(1, budget.maxVisibleObjects / Math.max(1, cost)));
}

export function overBudget(snapshot: PerformanceSnapshot, budget = DEFAULT_BUDGET): boolean {
  return snapshot.frameMs > budget.maxFrameMs ||
    snapshot.visibleObjects > budget.maxVisibleObjects ||
    snapshot.estimatedTexturePixels > budget.maxTexturePixels;
}
