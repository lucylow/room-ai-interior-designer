import { describe, expect, it } from 'vitest';
import { applySafeAIAction, validateSafeAIAction } from '../../security/safe-ai-actions';
import type { RoomStateModel } from '../../security/types';

const room: RoomStateModel = { id: 'r1', name: 'Demo', roomType: 'living-room', objects: [{ id: 'sofa-1', type: 'sofa', label: 'Sofa', x: 0, y: 0, z: 0, width: 2, height: 0.9, depth: 0.9, rotationY: 0, locked: false }], measurements: {}, updatedAt: Date.now(), version: 1, sensitivity: 'sensitive' };

describe('safe AI actions', () => {
  it('allows bounded moves', () => {
    expect(validateSafeAIAction({ type: 'move', actionId: 'a', targetId: 'sofa-1', dx: 0.1, dy: 0, dz: 0 }, room)).toEqual([]);
    const updated = applySafeAIAction(room, { type: 'move', actionId: 'a', targetId: 'sofa-1', dx: 0.1, dy: 0, dz: 0 });
    expect(updated.objects[0].x).toBeCloseTo(0.1);
  });

  it('blocks unbounded values', () => {
    expect(validateSafeAIAction({ type: 'move', actionId: 'a', targetId: 'sofa-1', dx: 1000, dy: 0, dz: 0 }, room)).toContain('move-out-of-range');
  });

  it('blocks unknown targets', () => {
    expect(validateSafeAIAction({ type: 'remove', actionId: 'a', targetId: 'not-there' }, room)).toContain('target-not-found');
  });
});
