import React from 'react';
import type { SpatialScene } from '../../core/types';
import { fallbackSummary, supportsWebGL } from '../fallback';

export function ThreeSceneFallback({ scene, onUsePlan }: { scene: SpatialScene; onUsePlan?: () => void }) {
  const available = supportsWebGL();
  return (
    <div
      role="status"
      aria-label="Three-dimensional renderer unavailable"
      style={{
        minHeight: 400, height: '100%', display: 'grid', placeItems: 'center',
        padding: 24, textAlign: 'center', background: '#F3F4F7',
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: 32, marginBottom: 10 }} aria-hidden="true">□</div>
        <h3 style={{ margin: 0 }}>3D preview is unavailable</h3>
        <p style={{ color: '#6D7280', lineHeight: 1.5 }}>{available ? 'The scene renderer needs to reduce quality before it can display this room.' : 'This device or browser does not expose a usable WebGL context.'}</p>
        <p style={{ color: '#4F5B62', fontSize: 13 }}>{fallbackSummary(scene)}</p>
        <button type="button" onClick={onUsePlan}>Use the 2D plan</button>
      </div>
    </div>
  );
}
