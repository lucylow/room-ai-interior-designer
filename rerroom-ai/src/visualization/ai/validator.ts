import type { SpatialScene } from '../core/types';
import type { SpatialAction } from './contracts';
import { collectCollisionIssues } from '../core/collision';
import { moveObject, rotateObject, resizeObject, setObjectVisibility } from '../core/scene';
import { wrapAngle } from '../core/vec';

export interface SpatialValidation {
  valid: boolean;
  action: SpatialAction;
  reasons: string[];
  preview?: SpatialScene;
}

export function validateSpatialAction(scene: SpatialScene, action: SpatialAction): SpatialValidation {
  const target = scene.objects.find(item => item.id === action.targetId);
  if (!target) return { valid: false, action, reasons: ['Target object does not exist.'] };
  if (target.locked) return { valid: false, action, reasons: ['Target object is locked.'] };
  if (!Number.isFinite(Number(action.targetId ? 1 : 0))) return { valid: false, action, reasons: ['Invalid action target.'] };

  let preview = scene;
  if (action.type === 'move') {
    if (![action.dx, action.dz].every(Number.isFinite) || Math.hypot(action.dx, action.dz) > 2.5) {
      return { valid: false, action, reasons: ['Move exceeds the AI safety bound.'] };
    }
    preview = moveObject(scene, target.id, { x: action.dx, y: 0, z: action.dz });
  } else if (action.type === 'rotate') {
    if (!Number.isFinite(action.rotationY) || Math.abs(action.rotationY) > Math.PI * 4) {
      return { valid: false, action, reasons: ['Rotation exceeds the AI safety bound.'] };
    }
    preview = rotateObject(scene, target.id, wrapAngle(action.rotationY));
  } else if (action.type === 'resize') {
    if (![action.width, action.depth].every(Number.isFinite) ||
        action.width < 0.15 || action.width > 8 ||
        action.depth < 0.15 || action.depth > 8) {
      return { valid: false, action, reasons: ['Resize is outside supported furniture bounds.'] };
    }
    preview = resizeObject(scene, target.id, action.width, target.size.height, action.depth);
  } else if (action.type === 'hide') {
    preview = setObjectVisibility(scene, target.id, false);
  } else if (action.type === 'highlight') {
    return { valid: true, action, reasons: ['Presentation-only action.'], preview: scene };
  }

  const issues = collectCollisionIssues(preview).filter(item => item.targetId === target.id || item.otherId === target.id);
  const errors = issues.filter(item => item.severity === 'error').map(item => item.message);
  return { valid: errors.length === 0, action, reasons: errors, preview };
}

export function validateProposal(scene: SpatialScene, actions: SpatialAction[]): SpatialValidation[] {
  let preview = scene;
  const results: SpatialValidation[] = [];
  for (const action of actions) {
    const result = validateSpatialAction(preview, action);
    results.push(result);
    if (result.valid && result.preview) preview = result.preview;
  }
  return results;
}
