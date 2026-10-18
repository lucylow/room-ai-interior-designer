import type { SceneObject, SpatialScene, Vec2 } from './types';
import { aabbFromCenter, aabbIntersects, pointToSegmentDistance } from './geometry';
import { objectAabbHalfExtents } from './transform';

export interface CollisionIssue {
  code:
    | 'object-overlap'
    | 'room-boundary'
    | 'door-clearance'
    | 'window-clearance';
  severity: 'info' | 'warning' | 'error';
  targetId: string;
  otherId?: string;
  message: string;
}

function objectAabb(object: SceneObject) {
  const half = objectAabbHalfExtents(object);
  const c = object.transform.position;
  return aabbFromCenter(c, { x: half.x * 2, y: half.y * 2, z: half.z * 2 });
}

export function checkPairCollision(a: SceneObject, b: SceneObject): boolean {
  if (!a.visible || !b.visible) return false;
  return aabbIntersects(objectAabb(a), objectAabb(b), 0.002);
}

export function checkRoomBoundary(scene: SpatialScene, object: SceneObject): CollisionIssue | null {
  const half = objectAabbHalfExtents(object);
  const { x, z } = object.transform.position;
  const out = x - half.x < 0 || z - half.z < 0 || x + half.x > scene.room.width || z + half.z > scene.room.depth;
  return out ? {
    code: 'room-boundary',
    severity: 'error',
    targetId: object.id,
    message: `${object.label} extends outside the room boundary.`,
  } : null;
}

export function checkDoorClearance(scene: SpatialScene, object: SceneObject, clearance = 0.45): CollisionIssue[] {
  const results: CollisionIssue[] = [];
  for (const opening of scene.room.openings) {
    if (opening.kind !== 'door') continue;
    const wall = scene.room.walls.find(item => item.id === opening.wallId);
    if (!wall) continue;
    const dx = wall.end.x - wall.start.x;
    const dy = wall.end.y - wall.start.y;
    const length = Math.hypot(dx, dy);
    if (!Number.isFinite(length) || length < 1e-6 || !Number.isFinite(opening.offset) || !Number.isFinite(opening.width)) continue;
    const t = Math.max(0, Math.min(1, opening.offset / length));
    const door: Vec2 = {
      x: wall.start.x + dx * t,
      y: wall.start.y + dy * t,
    };
    const halfWidth = Math.min(opening.width, length) / 2;
    const tangent = { x: dx / length, y: dy / length };
    const start = { x: door.x - tangent.x * halfWidth, y: door.y - tangent.y * halfWidth };
    const end = { x: door.x + tangent.x * halfWidth, y: door.y + tangent.y * halfWidth };
    const p = { x: object.transform.position.x, y: object.transform.position.z };
    const half = objectAabbHalfExtents(object);
    if (pointToSegmentDistance(p, start, end) < clearance + Math.hypot(half.x, half.z)) {
      results.push({
        code: 'door-clearance',
        severity: 'warning',
        targetId: object.id,
        otherId: opening.id,
        message: `${object.label} is close to a doorway and may block circulation.`,
      });
    }
  }
  return results;
}

export function collectCollisionIssues(scene: SpatialScene): CollisionIssue[] {
  const issues: CollisionIssue[] = [];
  for (const object of scene.objects) {
    if (!object.visible) continue;
    const boundary = checkRoomBoundary(scene, object);
    if (boundary) issues.push(boundary);
    issues.push(...checkDoorClearance(scene, object));
  }
  for (let i = 0; i < scene.objects.length; i += 1) {
    for (let j = i + 1; j < scene.objects.length; j += 1) {
      const a = scene.objects[i], b = scene.objects[j];
      if (checkPairCollision(a, b)) {
        issues.push({
          code: 'object-overlap',
          severity: 'error',
          targetId: a.id,
          otherId: b.id,
          message: `${a.label} overlaps ${b.label}.`,
        });
      }
    }
  }
  return issues;
}
