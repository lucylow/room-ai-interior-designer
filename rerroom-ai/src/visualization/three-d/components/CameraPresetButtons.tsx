import React from 'react';
import type { CameraPresetId } from '../../core/types';

const PRESETS: CameraPresetId[] = ['top', 'hero', 'eye-level', 'corner', 'wide', 'detail', 'ceiling'];

export function CameraPresetButtons({ onChange }: { onChange: (preset: CameraPresetId) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {PRESETS.map(preset => (
        <button key={preset} type="button" onClick={() => onChange(preset)} aria-label={`Camera ${preset}`}>
          {preset.replace('-', ' ')}
        </button>
      ))}
    </div>
  );
}
