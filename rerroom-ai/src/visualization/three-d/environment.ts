export interface EnvironmentSettings {
  background: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  groundReflectivity: number;
  exposure: number;
}

export const BRIGHT_INTERIOR_ENVIRONMENT: EnvironmentSettings = {
  background: '#EEF1F4',
  fogColor: '#EEF1F4',
  fogNear: 10,
  fogFar: 45,
  groundReflectivity: 0.08,
  exposure: 1,
};

export const WARM_INTERIOR_ENVIRONMENT: EnvironmentSettings = {
  background: '#F5F0E8',
  fogColor: '#F5F0E8',
  fogNear: 9,
  fogFar: 42,
  groundReflectivity: 0.1,
  exposure: 1.05,
};

export function environmentForTheme(theme: 'bright' | 'warm' | 'presentation', quality: number): EnvironmentSettings {
  const source = theme === 'warm' ? WARM_INTERIOR_ENVIRONMENT : BRIGHT_INTERIOR_ENVIRONMENT;
  const q = Math.max(0.3, Math.min(1, quality));
  return {
    ...source,
    fogNear: source.fogNear + (1 - q) * 4,
    fogFar: source.fogFar - (1 - q) * 8,
    exposure: source.exposure * (0.9 + q * 0.1),
  };
}
