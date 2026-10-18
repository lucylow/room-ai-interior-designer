export interface RendererConfig {
  antialias: boolean;
  alpha: boolean;
  logarithmicDepthBuffer: boolean;
  powerPreference: 'high-performance' | 'low-power' | 'default';
  pixelRatio: number;
  shadows: boolean;
  toneMapping: 'aces' | 'linear';
  outputColorSpace: 'srgb' | 'display-p3';
}

export function rendererConfig(quality: number, prefersBatterySaver = false): RendererConfig {
  const q = Math.max(0.25, Math.min(1, quality));
  return {
    antialias: q >= 0.55,
    alpha: false,
    logarithmicDepthBuffer: false,
    powerPreference: prefersBatterySaver ? 'low-power' : q >= 0.75 ? 'high-performance' : 'default',
    pixelRatio: Math.min(2, 0.75 + q * 1.25),
    shadows: q >= 0.55,
    toneMapping: q >= 0.75 ? 'aces' : 'linear',
    outputColorSpace: 'srgb',
  };
}

export function recommendPixelRatio(devicePixelRatio: number, quality: number): number {
  return Math.min(Math.max(1, devicePixelRatio), Math.max(1, Math.min(2, quality * 2)));
}
