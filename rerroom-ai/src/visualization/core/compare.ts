import type { SceneDiff, } from './diff';
import type { SpatialScene } from './types';
import { diffScenes } from './diff';

export interface CompareOverlay {
  split: number;
  active: SpatialScene;
  baseline: SpatialScene;
  diffs: SceneDiff[];
}

export function createCompareOverlay(baseline: SpatialScene, active: SpatialScene, split = 0.5): CompareOverlay {
  return { split: Math.min(1, Math.max(0, split)), active, baseline, diffs: diffScenes(baseline, active) };
}

export function visibleDiffs(diffs: SceneDiff[], showDiffOnly: boolean): SceneDiff[] {
  return showDiffOnly ? diffs.filter(item => item.kind !== 'unchanged') : diffs;
}

export function compareSummary(diffs: SceneDiff[]): string {
  const counts = diffs.reduce<Record<string, number>>((acc, item) => {
    acc[item.kind] = (acc[item.kind] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => `${key}: ${count}`)
    .join(' · ');
}
