import type { LightingPreset } from '../core/types';

export const LIGHTING_PRESETS: LightingPreset[] = [
  { id: 'daylight', name: 'Daylight', ambient: 0.7, keyIntensity: 1.8, fillIntensity: 0.65, colorTemperature: 5600, sunAzimuth: 0.8, sunElevation: 0.9, shadows: true },
  { id: 'soft-evening', name: 'Soft Evening', ambient: 0.55, keyIntensity: 1.15, fillIntensity: 0.85, colorTemperature: 3900, sunAzimuth: -0.6, sunElevation: 0.4, shadows: true },
  { id: 'studio', name: 'Studio', ambient: 0.85, keyIntensity: 1.35, fillIntensity: 1.0, colorTemperature: 5000, sunAzimuth: 0, sunElevation: 1.2, shadows: false },
  { id: 'moody', name: 'Moody', ambient: 0.35, keyIntensity: 1.7, fillIntensity: 0.25, colorTemperature: 3000, sunAzimuth: 1.3, sunElevation: 0.55, shadows: true },
];

export function lightingById(id: string): LightingPreset {
  return LIGHTING_PRESETS.find(item => item.id === id) ?? LIGHTING_PRESETS[0];
}

export function lightingIntensity(preset: LightingPreset, quality = 1) {
  return {
    ambient: preset.ambient * Math.max(0.5, quality),
    key: preset.keyIntensity * Math.max(0.5, quality),
    fill: preset.fillIntensity * Math.max(0.5, quality),
    shadows: preset.shadows && quality >= 0.55,
  };
}
