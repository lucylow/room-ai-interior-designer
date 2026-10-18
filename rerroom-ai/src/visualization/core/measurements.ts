import type { Measurement, SceneObject, SpatialScene, Vec2, Vec3 } from './types';
import { dist2, dist3 } from './vec';
import { polygonArea } from './geometry';

export function distanceMeasurement(id: string, a: Vec3, b: Vec3, label?: string): Measurement {
  return { id, kind: 'distance', a, b, value: dist3(a, b), unit: 'm', label, visible: true };
}

export function heightMeasurement(id: string, base: Vec3, top: Vec3, label?: string): Measurement {
  const value = Math.abs(top.y - base.y);
  return { id, kind: 'height', a: base, b: top, value, unit: 'm', label, visible: true };
}

export function planDistance(a: Vec2, b: Vec2): number {
  return dist2(a, b);
}

export function pathLength(points: Vec3[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) total += dist3(points[i - 1], points[i]);
  return total;
}

export function planArea(points: Vec2[]): number {
  return polygonArea(points);
}

export function roomArea(scene: SpatialScene): number {
  return scene.room.width * scene.room.depth;
}

export function furnitureFootprint(object: SceneObject): number {
  return Math.abs(object.size.width * object.transform.scale.x) *
    Math.abs(object.size.depth * object.transform.scale.z);
}

export function occupiedFloorArea(scene: SpatialScene): number {
  return scene.objects.filter(item => item.visible).reduce((sum, object) => sum + furnitureFootprint(object), 0);
}

export function perimeter(width: number, depth: number): number {
  return 2 * (Math.max(0, width) + Math.max(0, depth));
}

export function angleBetween(a: Vec3, b: Vec3): number {
  const aLen = Math.hypot(a.x, a.y, a.z);
  const bLen = Math.hypot(b.x, b.y, b.z);
  if (!aLen || !bLen) return 0;
  const cosine = (a.x * b.x + a.y * b.y + a.z * b.z) / (aLen * bLen);
  return Math.acos(Math.min(1, Math.max(-1, cosine))) * 180 / Math.PI;
}
