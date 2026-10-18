import type { SceneObject, SpatialScene } from './types';
import { collectCollisionIssues } from './collision';
import { clampObjectToRoom } from './transform';

export interface PlacementConstraintResult {
  valid: boolean;
  object: SceneObject;
  errors: string[];
  warnings: string[];
}

export function validateObjectPlacement(scene: SpatialScene, object: SceneObject): PlacementConstraintResult {
  const normalized = clampObjectToRoom(object, scene.room.width, scene.room.depth);
  const candidate = { ...scene, objects: scene.objects.filter(item => item.id !== object.id).concat(normalized) };
  const issues = collectCollisionIssues(candidate).filter(item => item.targetId === object.id || item.otherId === object.id);
  return {
    valid: !issues.some(item => item.severity === 'error'),
    object: normalized,
    errors: issues.filter(item => item.severity === 'error').map(item => item.message),
    warnings: issues.filter(item => item.severity === 'warning').map(item => item.message),
  };
}

export function canPlaceObject(scene: SpatialScene, object: SceneObject): boolean {
  return validateObjectPlacement(scene, object).valid;
}
