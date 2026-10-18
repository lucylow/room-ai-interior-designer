import type { PerformanceSnapshot } from '../performance/budget';

export interface PerformanceStoreState {
  current: PerformanceSnapshot;
  history: PerformanceSnapshot[];
  degraded: boolean;
}

export function initialPerformanceState(): PerformanceStoreState {
  return {
    current: { frameMs: 0, fps: 60, visibleObjects: 0, estimatedTexturePixels: 0, quality: 1 },
    history: [],
    degraded: false,
  };
}

export function recordPerformance(state: PerformanceStoreState, next: PerformanceSnapshot): PerformanceStoreState {
  const history = [...state.history, next].slice(-60);
  return {
    current: next,
    history,
    degraded: next.fps < 45 || next.frameMs > 22,
  };
}
