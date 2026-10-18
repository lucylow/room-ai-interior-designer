import React from 'react';
import type { ViewMode } from '../core/types';

export interface VisualizationToolbarProps {
  mode: ViewMode;
  onMode: (mode: ViewMode) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const modes: Array<{ id: ViewMode; label: string }> = [
  { id: 'split', label: 'Split' },
  { id: 'plan', label: '2D Plan' },
  { id: 'three-d', label: '3D View' },
  { id: 'tour', label: 'Tour' },
  { id: 'compare', label: 'Compare' },
];

export function VisualizationToolbar({ mode, onMode, onUndo, onRedo, canUndo = false, canRedo = false }: VisualizationToolbarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 10, borderBottom: '1px solid #E2E3E8', background: '#FFFFFF' }}>
      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        {modes.map(item => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            onClick={() => onMode(item.id)}
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: `1px solid ${mode === item.id ? '#4F5BFF' : '#D8DAE1'}`,
              background: mode === item.id ? '#EEF0FF' : '#FFF',
              color: '#17181B',
              fontWeight: 600,
            }}
          >{item.label}</button>
        ))}
      </div>
      <button type="button" disabled={!canUndo} onClick={onUndo}>Undo</button>
      <button type="button" disabled={!canRedo} onClick={onRedo}>Redo</button>
    </div>
  );
}
