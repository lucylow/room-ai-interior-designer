import type { SceneObject, SpatialScene } from '../core/types';

export interface AccessibleObjectDescription {
  id: string;
  label: string;
  role: 'furniture' | 'fixture' | 'decor' | 'architecture';
  hint: string;
  navigable: boolean;
}

function roleFor(object: SceneObject): AccessibleObjectDescription['role'] {
  if (['sofa', 'chair', 'table', 'bed'].includes(object.type)) return 'furniture';
  if (['cabinet', 'lamp'].includes(object.type)) return 'fixture';
  if (['plant', 'rug'].includes(object.type)) return 'decor';
  return 'architecture';
}

export function accessibleSceneDescription(scene: SpatialScene): AccessibleObjectDescription[] {
  return scene.objects.filter(item => item.visible).map(object => ({
    id: object.id,
    label: object.label,
    role: roleFor(object),
    hint: `Double tap to focus on ${object.label}.`,
    navigable: !object.locked,
  }));
}

export function sceneAriaLabel(scene: SpatialScene): string {
  const count = scene.objects.filter(item => item.visible).length;
  return `${scene.room.width.toFixed(1)} by ${scene.room.depth.toFixed(1)} meter room with ${count} visible objects.`;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
