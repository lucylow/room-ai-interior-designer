import React from 'react';
import type { Measurement } from '../core/types';
import { formatMeters } from '../core/units';

export function MeasurementPanel({ measurements }: { measurements: Measurement[] }) {
  const visible = measurements.filter(item => item.visible);
  return (
    <aside aria-label="Measurement panel" style={{ padding: 14, borderTop: '1px solid #E2E3E8', background: '#FFF' }}>
      <strong>Measurements</strong>
      {visible.length === 0 && <p style={{ color: '#6D7280', margin: '8px 0 0' }}>No measurements yet.</p>}
      {visible.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 8, fontSize: 13 }}>
          <span>{item.label ?? item.kind}</span>
          <strong>{item.unit === 'm' ? formatMeters(item.value) : `${item.value.toFixed(1)} ${item.unit}`}</strong>
        </div>
      ))}
    </aside>
  );
}
