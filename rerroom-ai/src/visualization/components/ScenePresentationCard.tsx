import React from 'react';
import type { SpatialScene } from '../core/types';
import { analyzeScene } from '../core/scene-metrics';
import { formatArea } from '../core/units';

export function ScenePresentationCard({ scene, onOpen }: { scene: SpatialScene; onOpen?: () => void }) {
  const metrics = analyzeScene(scene);
  return (
    <article style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', gap: 14, padding: 12, background: '#FFF', border: '1px solid #E2E3E8', borderRadius: 14 }}>
      <div aria-hidden="true" style={{ width: 120, height: 82, borderRadius: 10, background: 'linear-gradient(135deg,#EEE,#D8DBE2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 12, border: '2px solid #17181B', background: '#FAFAF8' }} />
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: 15 }}>{scene.metadata.roomId}</h3>
        <p style={{ margin: '5px 0', color: '#6D7280', fontSize: 12 }}>
          {scene.room.width.toFixed(1)} × {scene.room.depth.toFixed(1)} m · {formatArea(metrics.roomAreaM2)} · {metrics.visibleObjectCount} objects
        </p>
        <p style={{ margin: 0, color: metrics.collisionCount ? '#A83C25' : '#4F5B62', fontSize: 12 }}>
          {metrics.collisionCount ? `${metrics.collisionCount} placement issue(s)` : 'No blocking collisions'}
        </p>
      </div>
      <button type="button" onClick={onOpen}>Open</button>
    </article>
  );
}
