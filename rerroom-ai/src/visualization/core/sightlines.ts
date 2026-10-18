import type { SceneObject, SpatialScene, Vec2 } from './types';
import { objectPlanCenter } from './transform';
import { dist2 } from './vec';

export interface Sightline {
  fromId: string;
  toId: string;
  distance: number;
  clear: boolean;
}

function pointBlockedByObject(point: Vec2, object: SceneObject): boolean {
  const center = objectPlanCenter(object);
  const width = object.size.width * object.transform.scale.x;
  const depth = object.size.depth * object.transform.scale.z;
  return Math.abs(point.x - center.x) < Math.abs(width) / 2 &&
    Math.abs(point.y - center.y) < Math.abs(depth) / 2;
}

export function lineClear(scene: SpatialScene, from: Vec2, to: Vec2, ignoredIds: string[] = []): boolean {
  const steps = Math.max(2, Math.ceil(dist2(from, to) / 0.1));
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    const point = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
    if (scene.objects.some(object => object.visible && !ignoredIds.includes(object.id) && pointBlockedByObject(point, object))) {
      return false;
    }
  }
  return true;
}

export function computeSightlines(scene: SpatialScene, source: SceneObject): Sightline[] {
  const from = objectPlanCenter(source);
  return scene.objects
    .filter(item => item.visible && item.id !== source.id)
    .map(item => {
      const to = objectPlanCenter(item);
      return {
        fromId: source.id,
        toId: item.id,
        distance: dist2(from, to),
        clear: lineClear(scene, from, to, [source.id, item.id]),
      };
    });
}
