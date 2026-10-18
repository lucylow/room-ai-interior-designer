import React, { useMemo } from 'react';
import type { SpatialScene, Viewport2D } from '../core/types';
import { PlanCanvas } from './PlanCanvas';
import { ThreeSceneCanvas } from '../three-d/components/ThreeSceneCanvas';
import { DEFAULT_PLAN_LAYERS } from '../two-d/layers';
import type { PlanLayer } from '../two-d/layers';

export interface SplitVisualizationProps {
  scene: SpatialScene;
  viewport: Viewport2D;
  ratio?: number;
  selectedIds?: string[];
  onSelect?: (id: string) => void;
  layers?: PlanLayer[];
}

export function SplitVisualization({ scene, viewport, ratio = 0.5, selectedIds = [], onSelect, layers = DEFAULT_PLAN_LAYERS }: SplitVisualizationProps) {
  const width = Math.min(0.8, Math.max(0.2, ratio));
  const planWidth = `${width * 100}%`;
  const threeWidth = `${(1 - width) * 100}%`;
  const planViewport = useMemo(
    () => ({ ...viewport, width: Math.max(200, viewport.width * width), height: viewport.height }),
    [viewport, width],
  );

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', minHeight: 520, overflow: 'hidden', background: '#F3F4F7' }}>
      <section aria-label="2D floor plan" style={{ width: planWidth, minWidth: 0, borderRight: '1px solid #D8DAE1' }}>
        <PlanCanvas scene={scene} viewport={planViewport} selectedIds={selectedIds} layers={layers} onSelect={onSelect} />
      </section>
      <section aria-label="3D room visualization" style={{ width: threeWidth, minWidth: 0 }}>
        <ThreeSceneCanvas scene={scene} selectedIds={selectedIds} onSelect={onSelect} showGrid />
      </section>
    </div>
  );
}
