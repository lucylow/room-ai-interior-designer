import { SECURITY_CONSTANTS } from './constants';
import type { RoomObjectState, RoomStateModel, SafeAIAction } from './types';

function finite(value: number): boolean { return Number.isFinite(value); }

export function validateSafeAIAction(action: SafeAIAction, room: RoomStateModel): string[] {
  const errors: string[] = [];
  if (!action.actionId) errors.push('missing-action-id');
  if (room.objects.length > SECURITY_CONSTANTS.maxRoomObjects) errors.push('room-object-limit-exceeded');
  if (action.type !== 'add' && !action.targetId) errors.push('target-required');
  if (action.targetId && !room.objects.some((object) => object.id === action.targetId)) errors.push('target-not-found');

  if (action.type === 'move') {
    if (![action.dx, action.dy, action.dz].every(finite)) errors.push('move-values-not-finite');
    if ([Math.abs(action.dx), Math.abs(action.dy), Math.abs(action.dz)].some((value) => value > SECURITY_CONSTANTS.maxTranslationM)) errors.push('move-out-of-range');
  }
  if (action.type === 'resize') {
    if (![action.width, action.height, action.depth].every(finite)) errors.push('resize-values-not-finite');
    if ([action.width, action.height, action.depth].some((value) => value <= 0 || value > SECURITY_CONSTANTS.maxObjectDimensionM)) errors.push('resize-out-of-range');
  }
  if (action.type === 'rotate') {
    if (!finite(action.rotationY)) errors.push('rotation-not-finite');
    if (Math.abs(action.rotationY) > SECURITY_CONSTANTS.maxRotationDeg) errors.push('rotation-out-of-range');
  }
  if (action.type === 'add') {
    const object = action.object;
    if (!object.label || object.label.length > 200) errors.push('invalid-label');
    if ([object.width, object.height, object.depth].some((value) => !finite(value) || value <= 0 || value > SECURITY_CONSTANTS.maxObjectDimensionM)) errors.push('add-dimensions-out-of-range');
    if ([object.x, object.y, object.z, object.rotationY].some((value) => !finite(value))) errors.push('add-transform-not-finite');
    if (object.locked && object.type === 'custom') errors.push('unsafe-custom-lock-state');
  }
  if (action.type === 'replace') {
    if (!action.label || action.label.length > 200) errors.push('invalid-replacement-label');
  }
  if (action.type === 'style') {
    if (!action.style || action.style.length > 120) errors.push('invalid-style');
  }
  return errors;
}

export function applySafeAIAction(room: RoomStateModel, action: SafeAIAction): RoomStateModel {
  const errors = validateSafeAIAction(action, room);
  if (errors.length > 0) throw new Error(`AI action rejected: ${errors.join(',')}`);
  const now = Date.now();
  const objects = [...room.objects];
  if (action.type === 'add') {
    const id = `ai_${action.actionId}`;
    objects.push({ id, ...action.object, locked: Boolean(action.object.locked) });
  } else if (action.targetId) {
    const index = objects.findIndex((object) => object.id === action.targetId);
    if (index < 0) throw new Error('Target object disappeared before execution.');
    const current = objects[index];
    if (action.type === 'remove') objects.splice(index, 1);
    else if (action.type === 'move') objects[index] = { ...current, x: current.x + action.dx, y: current.y + action.dy, z: current.z + action.dz };
    else if (action.type === 'resize') objects[index] = { ...current, width: action.width, height: action.height, depth: action.depth };
    else if (action.type === 'rotate') objects[index] = { ...current, rotationY: action.rotationY };
    else if (action.type === 'replace') objects[index] = { ...current, type: action.replacementType, label: action.label };
  }
  return { ...room, objects: objects as RoomObjectState[], updatedAt: now, version: room.version + 1 };
}
