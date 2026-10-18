import { afterEach, describe, expect, it } from 'vitest';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';
import { createVisualizationAIGate } from '../../visualization/integration/ai-gate';
import { roomStateToScene, sceneToRoomState } from '../../visualization/integration/room-state-adapter';
import { setConsent } from '../../state/domains/privacy-store';
import type { RoomStateModel } from '../../security/types';

const decision = (granted: boolean) => ({
  scope: 'ai-processing' as const,
  granted,
  updatedAt: Date.now(),
  source: 'settings' as const,
  version: 1,
});

afterEach(() => setConsent(decision(false)));

describe('visualization integration', () => {
  it('fails closed when AI-processing consent is missing', async () => {
    setConsent(decision(false));
    await expect(createVisualizationAIGate().request(DEMO_ROOMS[0], 'improve-circulation')).rejects.toThrow(/consent/i);
  });

  it('runs the deterministic local provider after consent and returns bounded validated actions', async () => {
    setConsent(decision(true));
    const result = await createVisualizationAIGate().request(DEMO_ROOMS[0], 'improve-circulation', 3);
    expect(result.proposal.summary).toBeTruthy();
    expect(result.approvedActions.length).toBeLessThanOrEqual(3);
    expect(result.approvedActions.length + result.rejectedActions.length).toBe(result.proposal.actions.length);
  });

  it('adapts room dimensions and furniture into meters-based scene state and back', () => {
    const room: RoomStateModel = {
      id: 'room-adapter-test',
      name: 'Adapter test room',
      roomType: 'living-room',
      objects: [{ id: 'sofa-test', type: 'sofa', label: 'Sofa', x: 1, y: 0, z: 1, width: 2, height: 0.8, depth: 0.9, rotationY: 0.2, locked: false }],
      measurements: { widthM: 4.5, depthM: 3.6, ceilingM: 2.7 },
      updatedAt: 1,
      version: 2,
      sensitivity: 'sensitive',
    };
    const scene = roomStateToScene(room);
    const restored = sceneToRoomState(scene, room);
    expect(scene.metadata.unit).toBe('m');
    expect(scene.objects).toHaveLength(1);
    expect(restored.objects[0].x).toBe(1);
    expect(restored.measurements.widthM).toBe(4.5);
  });

  it('rejects malformed room measurements before the scene reaches either renderer', () => {
    const malformed = {
      id: 'invalid-room', name: 'Invalid', roomType: 'living-room', objects: [],
      measurements: { widthM: Number.NaN, depthM: 3, ceilingM: 2.5 }, updatedAt: 1, version: 1, sensitivity: 'sensitive',
    } as unknown as RoomStateModel;
    expect(() => roomStateToScene(malformed)).toThrow(/room.width/i);
  });

  it('rejects object types that cannot be written back to the room model', () => {
    const scene = { ...DEMO_ROOMS[0], objects: [{ ...DEMO_ROOMS[0].objects[0], type: 'unsupported-type' }] };
    const source: RoomStateModel = {
      id: 'room-source', name: 'Source', roomType: 'living-room', objects: [], measurements: {},
      updatedAt: 1, version: 1, sensitivity: 'sensitive',
    };
    expect(() => sceneToRoomState(scene, source)).toThrow(/unsupported room object type/i);
  });
});
