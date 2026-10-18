import type { SceneObject, SpatialScene, Vec2 } from './types';
import { objectPlanCenter } from './transform';
import { dist2 } from './vec';

export interface CirculationPath {
  from: Vec2;
  to: Vec2;
  distance: number;
  clear: boolean;
}

export interface CirculationScore {
  score: number;
  blockedPaths: CirculationPath[];
  recommendedWidth: number;
}

function objectBlocksSegment(point: Vec2, object: SceneObject): boolean {
  const c = objectPlanCenter(object);
  const halfW = Math.abs(object.size.width * object.transform.scale.x) / 2;
  const halfD = Math.abs(object.size.depth * object.transform.scale.z) / 2;
  return Math.abs(point.x - c.x) <= halfW && Math.abs(point.y - c.y) <= halfD;
}

function clearPath(scene: SpatialScene, from: Vec2, to: Vec2, ignoreIds: Set<string>): boolean {
  const steps = Math.max(2, Math.ceil(dist2(from, to) / 0.15));
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    const p = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
    if (scene.objects.some(object => object.visible && !ignoreIds.has(object.id) && objectBlocksSegment(p, object))) return false;
  }
  return true;
}

export function analyzeCirculation(scene: SpatialScene): CirculationScore {
  const doors = scene.room.openings.filter(opening => opening.kind === 'door');
  const central = { x: scene.room.width / 2, y: scene.room.depth / 2 };
  const paths = doors.map(opening => {
    const wall = scene.room.walls.find(item => item.id === opening.wallId);
    if (!wall) return null;
    const length = Math.hypot(wall.end.x-wall.start.x, wall.end.y-wall.start.y) || 1;
    const t = Math.max(0, Math.min(1, opening.offset / length));
    const from = { x: wall.start.x + (wall.end.x-wall.start.x)*t, y: wall.start.y + (wall.end.y-wall.start.y)*t };
    return { from, to: central, distance: dist2(from, central), clear: clearPath(scene, from, central, new Set()) };
  }).filter((item): item is CirculationPath => item !== null);
  const blockedPaths = paths.filter(item => !item.clear);
  return {
    score: paths.length ? (paths.length - blockedPaths.length) / paths.length : 1,
    blockedPaths,
    recommendedWidth: 0.85,
  };
}
