import React from 'react';

export function CompareSlider({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12 }}>Before / After</span>
      <input
        aria-label="Compare split"
        type="range"
        min={0.05}
        max={0.95}
        step={0.01}
        value={value}
        onChange={event => onChange(Number(event.target.value))}
      />
      <span style={{ width: 44, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{Math.round(value * 100)}%</span>
    </label>
  );
}
