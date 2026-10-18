import type { SceneObject, SpatialScene, Vec3 } from './types';
import { clamp, dist3 } from './vec';

export type SnapMode = 'grid' | 'wall' | 'object-center' | 'object-edge' | 'none';

export interface SnapOptions {
  modes: SnapMode[];
  gridSize: number;
  wallDistance: number;
  objectDistance: number;
}

export interface SnapResult {
  position: Vec3;
  mode: SnapMode;
  targetId?: string;
  distance: number;
}

function grid(value: number, size: number): number {
  if (size <= 0) return value;
  return Math.round(value / size) * size;
}

export function snapToGrid(position: Vec3, gridSize: number): Vec3 {
  return { x: grid(position.x, gridSize), y: position.y, z: grid(position.z, gridSize) };
}

export function snapToNearestObject(object: SceneObject, scene: SpatialScene, maxDistance: number): SnapResult | null {
  let best: SnapResult | null = null;
  for (const candidate of scene.objects) {
    if (candidate.id === object.id || !candidate.visible) continue;
    const target = candidate.transform.position;
    const distance = dist3(object.transform.position, target);
    if (distance > maxDistance) continue;
    if (!best || distance < best.distance) {
      best = { position: { ...object.transform.position, x: target.x, z: target.z }, mode: 'object-center', targetId: candidate.id, distance };
    }
  }
  return best;
}

export function snapToWalls(object: SceneObject, scene: SpatialScene, maxDistance: number): SnapResult | null {
  const halfX = Math.abs(object.size.width * object.transform.scale.x) / 2;
  const halfZ = Math.abs(object.size.depth * object.transform.scale.z) / 2;
  const p = object.transform.position;
  const candidates: SnapResult[] = [
    { position: { ...p, x: halfX }, mode: 'wall' as const, distance: Math.abs(p.x - halfX) },
    { position: { ...p, x: scene.room.width - halfX }, mode: 'wall' as const, distance: Math.abs(p.x - (scene.room.width - halfX)) },
    { position: { ...p, z: halfZ }, mode: 'wall' as const, distance: Math.abs(p.z - halfZ) },
    { position: { ...p, z: scene.room.depth - halfZ }, mode: 'wall' as const, distance: Math.abs(p.z - (scene.room.depth - halfZ)) },
  ].filter(item => item.distance <= maxDistance);
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0] ?? null;
}

export function snapPosition(object: SceneObject, scene: SpatialScene, options: SnapOptions): SnapResult {
  const candidates: SnapResult[] = [];
  if (options.modes.includes('grid')) {
    const target = snapToGrid(object.transform.position, options.gridSize);
    candidates.push({ position: target, mode: 'grid', distance: dist3(target, object.transform.position) });
  }
  if (options.modes.includes('wall')) {
    const wall = snapToWalls(object, scene, options.wallDistance);
    if (wall) candidates.push(wall);
  }
  if (options.modes.includes('object-center')) {
    const other = snapToNearestObject(object, scene, options.objectDistance);
    if (other) candidates.push(other);
  }
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates[0] ?? { position: object.transform.position, mode: 'none', distance: 0 };
}

export function clampDragDelta(delta: Vec3, maxPerFrame = 0.5): Vec3 {
  return {
    x: clamp(delta.x, -maxPerFrame, maxPerFrame),
    y: clamp(delta.y, -maxPerFrame, maxPerFrame),
    z: clamp(delta.z, -maxPerFrame, maxPerFrame),
  };
}
