import React from 'react';
import type { PerformanceSnapshot } from '../performance/budget';

export function PerformanceBadge({ snapshot }: { snapshot: PerformanceSnapshot }) {
  const healthy = snapshot.fps >= 50 && snapshot.frameMs <= 20;
  return (
    <div
      aria-label={`Rendering performance ${Math.round(snapshot.fps)} frames per second`}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        border: '1px solid #D8DAE1', borderRadius: 999, padding: '5px 9px',
        background: '#FFF', fontSize: 11,
      }}
    >
      <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, background: healthy ? '#48A868' : '#DA7C25' }} />
      {Math.round(snapshot.fps)} FPS · {snapshot.visibleObjects} objects
    </div>
  );
}
