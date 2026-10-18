import type { MaterialRef } from '../core/types';

export interface RenderMaterial {
  color: string;
  roughness: number;
  metalness: number;
  opacity: number;
  transparent: boolean;
}

export function renderMaterial(material: MaterialRef | undefined, fallback = '#D9D9DE'): RenderMaterial {
  const source = material ?? {
    color: fallback,
    roughness: 0.65,
    metalness: 0.05,
    opacity: 1,
  };
  return {
    color: source.color,
    roughness: Math.min(1, Math.max(0, source.roughness)),
    metalness: Math.min(1, Math.max(0, source.metalness)),
    opacity: Math.min(1, Math.max(0, source.opacity)),
    transparent: source.opacity < 0.999,
  };
}

export function materialById(materials: MaterialRef[], id?: string): MaterialRef | undefined {
  return id ? materials.find(item => item.id === id) : undefined;
}
