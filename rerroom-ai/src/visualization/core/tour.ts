import type { CameraKeyframe, CameraPose, CameraTour } from './types';
import { clamp } from './vec';
import { interpolateCamera } from './camera';

export function easeInOutCubic(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function findSegment(keyframes: CameraKeyframe[], timeMs: number): [CameraKeyframe, CameraKeyframe, number] {
  if (keyframes.length === 1) return [keyframes[0], keyframes[0], 0];
  const sorted = [...keyframes].sort((a, b) => a.at - b.at);
  if (timeMs <= sorted[0].at) return [sorted[0], sorted[0], 0];
  const last = sorted[sorted.length - 1];
  if (timeMs >= last.at) return [last, last, 0];
  for (let i = 1; i < sorted.length; i += 1) {
    if (timeMs <= sorted[i].at) {
      const prev = sorted[i - 1];
      const local = (timeMs - prev.at) / Math.max(1, sorted[i].at - prev.at);
      return [prev, sorted[i], easeInOutCubic(local)];
    }
  }
  return [last, last, 0];
}

export function sampleTour(tour: CameraTour, elapsedMs: number): CameraPose | null {
  if (!tour.keyframes.length) return null;
  const duration = Math.max(1, tour.durationMs);
  const normalized = tour.loop ? ((elapsedMs % duration) + duration) % duration : clamp(elapsedMs, 0, duration);
  const [a, b, t] = findSegment(tour.keyframes, normalized);
  return interpolateCamera(a.pose, b.pose, t);
}

export function normalizeTour(tour: CameraTour): CameraTour {
  const keyframes = [...tour.keyframes]
    .sort((a, b) => a.at - b.at)
    .map(item => ({ ...item, at: clamp(item.at, 0, tour.durationMs) }));
  return { ...tour, durationMs: Math.max(1000, tour.durationMs), keyframes };
}
