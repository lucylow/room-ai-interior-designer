import type { SceneObject, SpatialScene, Vec2 } from '../core/types';
import { objectPlanCorners } from '../core/transform';

interface CacheItem {
  version: number;
  corners: Vec2[];
}

export class PlanGeometryCache {
  private cache = new Map<string, CacheItem>();

  get(object: SceneObject, sceneVersion: number): Vec2[] {
    const hit = this.cache.get(object.id);
    if (hit && hit.version === sceneVersion) return hit.corners;
    const corners = objectPlanCorners(object);
    this.cache.set(object.id, { version: sceneVersion, corners });
    return corners;
  }

  build(scene: SpatialScene): Map<string, Vec2[]> {
    const result = new Map<string, Vec2[]>();
    for (const object of scene.objects) result.set(object.id, this.get(object, scene.metadata.version));
    return result;
  }

  invalidate(id?: string): void {
    if (id) this.cache.delete(id);
    else this.cache.clear();
  }

  size(): number { return this.cache.size; }
}
