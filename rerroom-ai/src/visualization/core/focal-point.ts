import type { SceneObject, SpatialScene, Vec2 } from './types';
import { dist2 } from './vec';
import { objectPlanCenter } from './transform';

export function focalCandidates(scene: SpatialScene): SceneObject[] {
  return [...scene.objects]
    .filter(item => item.visible)
    .sort((a, b) => {
      const aArea = a.size.width * a.size.depth;
      const bArea = b.size.width * b.size.depth;
      return bArea - aArea;
    });
}

export function focalPoint(scene: SpatialScene): Vec2 {
  const candidates = focalCandidates(scene);
  if (!candidates.length) return { x: scene.room.width / 2, y: scene.room.depth / 2 };
  const first = objectPlanCenter(candidates[0]);
  return first;
}

export function nearestToFocal(scene: SpatialScene, focal = focalPoint(scene)): SceneObject | undefined {
  return scene.objects
    .filter(item => item.visible)
    .sort((a, b) => dist2(objectPlanCenter(a), focal) - dist2(objectPlanCenter(b), focal))[0];
}
