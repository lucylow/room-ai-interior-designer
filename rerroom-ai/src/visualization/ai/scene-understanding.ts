import type { SceneObject, SpatialScene } from '../core/types';
import { objectPlanCenter } from '../core/transform';
import { furnitureFootprint } from '../core/measurements';

export function describeScene(scene: SpatialScene): {
  room: { widthM: number; depthM: number; ceilingM: number };
  objects: Array<{ id: string; label: string; type: string; x: number; z: number; footprintM2: number }>;
  openings: number;
} {
  return {
    room: { widthM: scene.room.width, depthM: scene.room.depth, ceilingM: scene.room.ceiling },
    objects: scene.objects.filter(item => item.visible).map((item: SceneObject) => ({
      id: item.id,
      label: item.label,
      type: item.type,
      x: objectPlanCenter(item).x,
      z: objectPlanCenter(item).y,
      footprintM2: furnitureFootprint(item),
    })),
    openings: scene.room.openings.length,
  };
}

export function sceneFingerprint(scene: SpatialScene): string {
  const parts = scene.objects
    .filter(item => item.visible)
    .map(item => `${item.id}:${item.transform.position.x.toFixed(2)}:${item.transform.position.z.toFixed(2)}:${item.size.width.toFixed(2)}:${item.size.depth.toFixed(2)}`)
    .sort();
  return `${scene.room.width.toFixed(2)}x${scene.room.depth.toFixed(2)}|${parts.join('|')}`;
}
