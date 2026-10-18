import type { SceneObject, Vec2, Vec3 } from './types';
import { rectangleCorners } from './geometry';
import { clamp } from './vec';

export function objectPlanCenter(object: SceneObject): Vec2 {
  return { x: object.transform.position.x, y: object.transform.position.z };
}

export function objectPlanSize(object: SceneObject): { width: number; depth: number } {
  return {
    width: Math.abs(object.size.width * object.transform.scale.x),
    depth: Math.abs(object.size.depth * object.transform.scale.z),
  };
}

export function objectPlanCorners(object: SceneObject): Vec2[] {
  const { width, depth } = objectPlanSize(object);
  return rectangleCorners(objectPlanCenter(object), width, depth, object.transform.rotationY);
}

export function objectAabbHalfExtents(object: SceneObject): Vec3 {
  const angle = Math.abs(object.transform.rotationY) % Math.PI;
  const w = Math.abs(object.size.width * object.transform.scale.x);
  const d = Math.abs(object.size.depth * object.transform.scale.z);
  const y = Math.abs(object.size.height * object.transform.scale.y);
  const c = Math.abs(Math.cos(angle)), s = Math.abs(Math.sin(angle));
  return { x: (w * c + d * s) / 2, y: y / 2, z: (w * s + d * c) / 2 };
}

export function clampObjectToRoom(object: SceneObject, roomWidth: number, roomDepth: number, padding = 0): SceneObject {
  const half = objectAabbHalfExtents(object);
  const minX = half.x + padding;
  const maxX = roomWidth - half.x - padding;
  const minZ = half.z + padding;
  const maxZ = roomDepth - half.z - padding;
  return {
    ...object,
    transform: {
      ...object.transform,
      position: {
        ...object.transform.position,
        x: clamp(object.transform.position.x, minX, Math.max(minX, maxX)),
        z: clamp(object.transform.position.z, minZ, Math.max(minZ, maxZ)),
      },
    },
  };
}
