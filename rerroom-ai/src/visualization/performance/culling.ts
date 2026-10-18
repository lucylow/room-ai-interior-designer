import type { SceneObject, SpatialScene, Vec3 } from '../core/types';
import { dist3 } from '../core/vec';
import { objectAabbHalfExtents } from '../core/transform';

export interface VisibilityFrustum {
  origin: Vec3;
  forward: Vec3;
  maxDistance: number;
  horizontalFov: number;
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function isInView(object: SceneObject, frustum: VisibilityFrustum): boolean {
  if (!object.visible) return false;
  const dx = object.transform.position.x - frustum.origin.x;
  const dy = object.transform.position.y - frustum.origin.y;
  const dz = object.transform.position.z - frustum.origin.z;
  const distance = Math.hypot(dx, dy, dz);
  if (distance > frustum.maxDistance) return false;
  if (distance < 0.001) return true;
  const direction = { x: dx / distance, y: dy / distance, z: dz / distance };
  const facing = dot(direction, frustum.forward);
  const halfAngle = Math.cos((frustum.horizontalFov / 2) * Math.PI / 180);
  const extent = Math.max(objectAabbHalfExtents(object).x, objectAabbHalfExtents(object).z);
  return distance - extent < 0 || facing >= halfAngle;
}

export function visibleObjects(scene: SpatialScene, frustum: VisibilityFrustum): SceneObject[] {
  return scene.objects.filter(object => isInView(object, frustum));
}

export function distanceSortedObjects(scene: SpatialScene, origin: Vec3): SceneObject[] {
  return [...scene.objects]
    .filter(item => item.visible)
    .sort((a, b) => dist3(a.transform.position, origin) - dist3(b.transform.position, origin));
}
