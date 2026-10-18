export type LODLevel = 'proxy' | 'low' | 'medium' | 'high';

export interface LODPolicy {
  proxyDistance: number;
  lowDistance: number;
  mediumDistance: number;
}

export const DEFAULT_LOD_POLICY: LODPolicy = {
  proxyDistance: 12,
  lowDistance: 7,
  mediumDistance: 3.5,
};

export function lodForDistance(distance: number, policy = DEFAULT_LOD_POLICY): LODLevel {
  if (distance >= policy.proxyDistance) return 'proxy';
  if (distance >= policy.lowDistance) return 'low';
  if (distance >= policy.mediumDistance) return 'medium';
  return 'high';
}

export function triangleBudgetFor(level: LODLevel): number {
  return ({ proxy: 24, low: 180, medium: 1200, high: 6000 } as Record<LODLevel, number>)[level];
}

export function textureScaleFor(level: LODLevel): number {
  return ({ proxy: 0.125, low: 0.25, medium: 0.5, high: 1 } as Record<LODLevel, number>)[level];
}
