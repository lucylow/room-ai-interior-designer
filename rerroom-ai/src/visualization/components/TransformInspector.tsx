import React from 'react';
import type { SceneObject } from '../core/types';
import { formatMeters } from '../core/units';

export interface TransformInspectorProps {
  object?: SceneObject;
  onMove?: (axis: 'x' | 'y' | 'z', value: number) => void;
  onRotate?: (value: number) => void;
  onResize?: (axis: 'width' | 'height' | 'depth', value: number) => void;
}

export function TransformInspector({ object, onMove, onRotate, onResize }: TransformInspectorProps) {
  if (!object) return <aside style={{ padding: 16, color: '#6D7280' }}>Select an object to inspect it.</aside>;
  const position = object.transform.position;
  return (
    <aside aria-label="Transform inspector" style={{ width: 280, padding: 16, borderLeft: '1px solid #E2E3E8', background: '#FFF' }}>
      <h3 style={{ margin: '0 0 10px' }}>{object.label}</h3>
      <p style={{ margin: '0 0 14px', color: '#6D7280', fontSize: 13 }}>{object.type}</p>
      <section>
        <strong>Position</strong>
        {(['x', 'y', 'z'] as const).map(axis => (
          <label key={axis} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <span style={{ width: 18 }}>{axis.toUpperCase()}</span>
            <input
              type="number"
              step="0.01"
              value={position[axis]}
              onChange={event => onMove?.(axis, Number(event.target.value))}
              style={{ width: '100%', padding: 7 }}
              aria-label={`${axis} position in meters`}
            />
          </label>
        ))}
      </section>
      <section style={{ marginTop: 18 }}>
        <strong>Rotation</strong>
        <input
          type="number"
          step="1"
          value={Math.round(object.transform.rotationY * 180 / Math.PI)}
          onChange={event => onRotate?.(Number(event.target.value) * Math.PI / 180)}
          style={{ width: '100%', padding: 7, marginTop: 8 }}
          aria-label="Rotation in degrees"
        />
      </section>
      <section style={{ marginTop: 18 }}>
        <strong>Dimensions</strong>
        {(['width', 'height', 'depth'] as const).map(axis => (
          <label key={axis} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
            <span style={{ width: 60, fontSize: 13 }}>{axis}</span>
            <input
              type="number"
              min="0.05"
              step="0.01"
              value={object.size[axis]}
              onChange={event => onResize?.(axis, Number(event.target.value))}
              style={{ width: '100%', padding: 7 }}
            />
          </label>
        ))}
      </section>
      <p style={{ marginTop: 18, fontSize: 12, color: '#6D7280' }}>
        Position: {formatMeters(position.x)}, {formatMeters(position.z)}
      </p>
    </aside>
  );
}
