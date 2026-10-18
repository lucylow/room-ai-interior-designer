import type { SceneObject, SpatialScene } from '../core/types';
import { dist2 } from '../core/vec';
import { objectPlanCenter } from '../core/transform';
import { collectCollisionIssues } from '../core/collision';
import { roomArea, occupiedFloorArea } from '../core/measurements';

export interface LayoutScore {
  circulation: number;
  openness: number;
  balance: number;
  collisionFree: number;
  total: number;
  notes: string[];
}

export function scoreLayout(scene: SpatialScene): LayoutScore {
  const visible = scene.objects.filter(item => item.visible);
  const issues = collectCollisionIssues(scene);
  const errors = issues.filter(item => item.severity === 'error').length;
  const target = { x: scene.room.width / 2, y: scene.room.depth / 2 };
  const averageDistance = visible.length
    ? visible.reduce((sum, item) => sum + dist2(objectPlanCenter(item), target), 0) / visible.length
    : 0;
  const maxDistance = Math.hypot(scene.room.width, scene.room.depth) / 2;
  const circulation = Math.max(0, Math.min(1, 1 - averageDistance / Math.max(maxDistance, 0.1)));
  const occupancy = occupiedFloorArea(scene) / Math.max(roomArea(scene), 0.1);
  const openness = Math.max(0, Math.min(1, 1 - occupancy));
  const left = visible.filter(item => objectPlanCenter(item).x < target.x).length;
  const right = visible.length - left;
  const balance = visible.length ? 1 - Math.abs(left - right) / visible.length : 1;
  const collisionFree = Math.max(0, 1 - errors / Math.max(1, visible.length));
  const total = (circulation * 0.35 + openness * 0.2 + balance * 0.15 + collisionFree * 0.3);
  const notes: string[] = [];
  if (errors) notes.push(`${errors} blocking collision(s) detected.`);
  if (occupancy > 0.55) notes.push('The floor area is visually dense.');
  if (balance < 0.6) notes.push('Object mass is concentrated on one side.');
  return { circulation, openness, balance, collisionFree, total, notes };
}

export function suggestMovableObjects(scene: SpatialScene): SceneObject[] {
  return scene.objects.filter(item => item.visible && !item.locked).sort((a, b) => {
    const aArea = a.size.width * a.size.depth;
    const bArea = b.size.width * b.size.depth;
    return bArea - aArea;
  });
}
