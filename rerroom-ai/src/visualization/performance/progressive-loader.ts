import type { VisualAsset } from './assets';

export interface LoadStep {
  name: 'shell' | 'thumbnail' | 'preview' | 'full';
  priority: number;
  assetIds: string[];
}

export interface ProgressState {
  completed: number;
  total: number;
  active?: string;
}

export function buildLoadPlan(assets: VisualAsset[], visibleIds: string[]): LoadStep[] {
  const visible = new Set(visibleIds);
  const thumbnails = assets.map(item => item.id);
  const previews = assets.filter(item => visible.has(item.id)).map(item => item.id);
  const full = assets.filter(item => visible.has(item.id) && item.kind === 'model').map(item => item.id);
  return [
    { name: 'shell', priority: 1, assetIds: [] },
    { name: 'thumbnail', priority: 2, assetIds: thumbnails },
    { name: 'preview', priority: 3, assetIds: previews },
    { name: 'full', priority: 4, assetIds: full },
  ];
}

export async function runLoadPlan(
  plan: LoadStep[],
  load: (assetId: string, step: LoadStep['name']) => Promise<void>,
  onProgress?: (state: ProgressState) => void,
): Promise<void> {
  const items = plan.flatMap(step => step.assetIds.map(assetId => ({ assetId, step: step.name })));
  let completed = 0;
  for (const item of items) {
    onProgress?.({ completed, total: items.length, active: item.assetId });
    await load(item.assetId, item.step);
    completed += 1;
    onProgress?.({ completed, total: items.length });
  }
}
