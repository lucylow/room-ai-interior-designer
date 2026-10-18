import type { SpatialScene } from './types';
import { roomArea, occupiedFloorArea } from './measurements';
import { collectCollisionIssues } from './collision';

export interface SceneMetrics {
  roomAreaM2: number;
  occupiedAreaM2: number;
  occupancyRatio: number;
  visibleObjectCount: number;
  collisionCount: number;
  warningCount: number;
  objectTypeCounts: Record<string, number>;
}

export function analyzeScene(scene: SpatialScene): SceneMetrics {
  const area = roomArea(scene);
  const occupied = occupiedFloorArea(scene);
  const issues = collectCollisionIssues(scene);
  const objectTypeCounts: Record<string, number> = {};
  for (const object of scene.objects.filter(item => item.visible)) {
    objectTypeCounts[object.type] = (objectTypeCounts[object.type] ?? 0) + 1;
  }
  return {
    roomAreaM2: area,
    occupiedAreaM2: occupied,
    occupancyRatio: area ? occupied / area : 0,
    visibleObjectCount: scene.objects.filter(item => item.visible).length,
    collisionCount: issues.filter(item => item.severity === 'error').length,
    warningCount: issues.filter(item => item.severity === 'warning').length,
    objectTypeCounts,
  };
}
