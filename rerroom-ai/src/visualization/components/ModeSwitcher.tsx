import React from 'react';
import type { ViewMode } from '../core/types';

export function ModeSwitcher({ mode, onChange }: { mode: ViewMode; onChange: (mode: ViewMode) => void }) {
  return (
    <select aria-label="Visualization mode" value={mode} onChange={event => onChange(event.target.value as ViewMode)}>
      <option value="split">Split</option>
      <option value="plan">2D Plan</option>
      <option value="three-d">3D View</option>
      <option value="tour">Tour</option>
      <option value="compare">Compare</option>
    </select>
  );
}
