import React from 'react';
import { DEFAULT_PLAN_LAYERS, toggleLayer } from '../two-d/layers';
import type { PlanLayer, PlanLayerId } from '../two-d/layers';

export function LayerPanel({ layers = DEFAULT_PLAN_LAYERS, onChange }: { layers?: PlanLayer[]; onChange: (layers: PlanLayer[]) => void }) {
  return (
    <aside aria-label="Plan layers" style={{ padding: 12, background: '#FFF', border: '1px solid #E2E3E8', borderRadius: 12 }}>
      <strong>Layers</strong>
      {layers.map(layer => (
        <label key={layer.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => onChange(toggleLayer(layers, layer.id as PlanLayerId))}
          />
          {layer.label}
        </label>
      ))}
    </aside>
  );
}
