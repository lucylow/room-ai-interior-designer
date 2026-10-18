import React, { useMemo } from 'react';
import type { SpatialScene, Viewport2D } from '../core/types';
import { createCompareOverlay } from '../core/compare';
import { diffScenes } from '../core/diff';
import { PlanCanvas } from './PlanCanvas';

export interface CompareVisualizationProps {
  before: SpatialScene;
  after: SpatialScene;
  viewport: Viewport2D;
  split?: number;
  selectedIds?: string[];
}

export function CompareVisualization({ before, after, viewport, split = 0.5, selectedIds = [] }: CompareVisualizationProps) {
  const overlay = useMemo(() => createCompareOverlay(before, after, split), [after, before, split]);
  const diffs = useMemo(() => diffScenes(before, after), [after, before]);
  const ratio = Math.max(0.05, Math.min(0.95, split));
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 500, position: 'relative', overflow: 'hidden', background: '#F8F8F6' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <PlanCanvas scene={before} viewport={viewport} selectedIds={[]} />
      </div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${ratio * 100}%)` }}>
        <PlanCanvas scene={after} viewport={viewport} selectedIds={selectedIds} />
      </div>
      <div style={{ position: 'absolute', top: 12, bottom: 12, left: `${ratio * 100}%`, width: 2, background: '#17181B', transform: 'translateX(-1px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 14, bottom: 14, padding: 9, borderRadius: 10, background: '#FFF', border: '1px solid #E2E3E8', fontSize: 12 }}>
        {diffs.filter(item => item.kind !== 'unchanged').length} changed object(s)
      </div>
      <span style={{ display: 'none' }}>{overlay.split}</span>
    </div>
  );
}
