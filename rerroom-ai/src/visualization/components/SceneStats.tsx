import React, { useMemo } from 'react';
import type { SpatialScene } from '../core/types';
import { analyzeScene } from '../core/scene-metrics';

export function SceneStats({ scene }: { scene: SpatialScene }) {
  const metrics = useMemo(() => analyzeScene(scene), [scene]);
  return (
    <div aria-label="Scene statistics" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: 10 }}>
      {[
        ['Objects', metrics.visibleObjectCount],
        ['Occupancy', `${Math.round(metrics.occupancyRatio * 100)}%`],
        ['Collisions', metrics.collisionCount],
        ['Warnings', metrics.warningCount],
      ].map(([label, value]) => (
        <div key={label} style={{ border: '1px solid #E2E3E8', borderRadius: 10, padding: 10, background: '#FFF' }}>
          <div style={{ fontSize: 11, color: '#6D7280' }}>{label}</div>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
