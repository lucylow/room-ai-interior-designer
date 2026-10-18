import type { SceneObject, Vec3 } from '../core/types';
import { lodForDistance, type LODLevel } from '../performance/lod';
import { dist3 } from '../core/vec';

export interface RenderableObject {
  object: SceneObject;
  distance: number;
  lod: LODLevel;
  visible: boolean;
}

export function makeRenderableObjects(objects: SceneObject[], camera: Vec3, maxObjects: number, bias: LODLevel = 'high'): RenderableObject[] {
  const biasRank: Record<LODLevel, number> = { proxy: 0, low: 1, medium: 2, high: 3 };
  return objects
    .filter(item => item.visible)
    .map(object => {
      const distance = dist3(object.transform.position, camera);
      const autoLod = lodForDistance(distance);
      const lod = biasRank[autoLod] <= biasRank[bias] ? autoLod : bias;
      return { object, distance, lod, visible: true };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.max(1, maxObjects));
}

export function countTriangles(objects: RenderableObject[]): number {
  const perObject: Record<LODLevel, number> = { proxy: 24, low: 180, medium: 1200, high: 6000 };
  return objects.reduce((sum, item) => sum + perObject[item.lod], 0);
}
