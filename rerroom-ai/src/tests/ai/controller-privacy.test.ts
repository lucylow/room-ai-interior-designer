import { describe, expect, it, vi } from 'vitest';
import { DataAIController } from '../../ai/controller';
import { DeterministicDemoAIProvider } from '../../ai/demo-provider';
import type { AIProvider, DesignGenerationInput, DesignGenerationOutput, RoomUnderstanding } from '../../ai/contracts';
import { AIDataPolicyEngine } from '../../security/ai-data-policy';
import { ConsentRegistry } from '../../security/consent';
import { DEFAULT_AI_POLICY } from '../../security/constants';
import type { AIResult, RoomStateModel } from '../../security/types';

describe('DataAIController provider boundary', () => {
  it('passes only opaque, filtered room data to the provider and maps safe actions back locally', async () => {
    const consent = new ConsentRegistry();
    consent.set('ai-processing', true);
    let captured: DesignGenerationInput | undefined;
    const demo = new DeterministicDemoAIProvider();
    const provider: AIProvider = {
      kind: 'demo',
      model: demo.model,
      understandRoom: (context): Promise<AIResult<RoomUnderstanding>> => demo.understandRoom(context),
      generateDesign: (input) => {
        captured = input;
        return demo.generateDesign(input);
      },
    };
    const controller = new DataAIController(provider, new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY), DEFAULT_AI_POLICY);
    const room: RoomStateModel = {
      id: 'local-room-123',
      name: 'Private address - 77 Hidden Street',
      roomType: 'living-room',
      imageAssetId: 'private-image-asset',
      layoutAssetId: 'private-layout-asset',
      objects: [
        { id: 'private-sofa-id', type: 'sofa', label: 'Contains 212-555-0123 personal notes', x: 1, y: 0, z: 1, width: 2, height: 1, depth: 1, rotationY: 0, locked: false },
        { id: 'private-table-id', type: 'table', label: 'Coffee table', x: 2, y: 0, z: 2, width: 1, height: 0.4, depth: 0.6, rotationY: 0, locked: false },
      ],
      measurements: { widthM: 4, depthM: 3, ceilingM: 2.6 },
      updatedAt: 1,
      version: 1,
      sensitivity: 'sensitive',
    };
    const result = await controller.generateDesign(room, [
      { name: 'prompt', dataClass: 'ai-prompt', value: 'Make the room calm.' },
      { name: 'roomType', dataClass: 'room-layout', value: 'living-room' },
      { name: 'layout', dataClass: 'room-layout', value: room.objects.map((object) => ({ type: object.type, x: object.x, y: object.y, z: object.z, width: object.width, height: object.height, depth: object.depth, rotationY: object.rotationY, locked: object.locked })) },
    ]);

    expect(captured).toBeDefined();
    expect(captured?.room.id).toBe('room');
    expect(captured?.room.name).toBe('Room');
    expect(captured?.room.objects.map((object) => object.id)).toEqual(['object-1', 'object-2']);
    expect(captured?.room.objects[0].label).toBe('sofa');
    expect(captured?.room.measurements).toEqual({});
    const sent = JSON.stringify(captured);
    expect(sent).not.toContain('local-room-123');
    expect(sent).not.toContain('Hidden Street');
    expect(sent).not.toContain('private-sofa-id');
    expect(sent).not.toContain('private-image-asset');
    expect(sent).not.toContain('212-555-0123');
    expect(result.safeRoom.id).toBe(room.id);
  });

  it('discards asynchronous provider output if AI consent is revoked before it returns', async () => {
    const consent = new ConsentRegistry();
    consent.set('ai-processing', true);
    const demo = new DeterministicDemoAIProvider();
    let release!: () => void;
    const pending = new Promise<void>((resolve) => { release = resolve; });
    const provider: AIProvider = {
      kind: 'demo',
      model: demo.model,
      understandRoom: (context, signal) => demo.understandRoom(context, signal),
      generateDesign: async (input, signal) => {
        await pending;
        return demo.generateDesign(input, signal);
      },
    };
    const controller = new DataAIController(provider, new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY), DEFAULT_AI_POLICY);
    const room: RoomStateModel = {
      id: 'r', name: 'Room', roomType: 'living-room', objects: [], measurements: {},
      updatedAt: 1, version: 1, sensitivity: 'sensitive',
    };
    const request = controller.generateDesign(room, [
      { name: 'prompt', dataClass: 'ai-prompt', value: 'Improve the room layout.' },
      { name: 'layout', dataClass: 'room-layout', value: [] },
    ]);
    consent.set('ai-processing', false);
    release();
    await expect(request).rejects.toThrow(/consent or policy changed/i);
  });

  it('does not start a provider call for a pre-aborted request', async () => {
    const consent = new ConsentRegistry();
    consent.set('ai-processing', true);
    const demo = new DeterministicDemoAIProvider();
    const generateDesign = vi.fn((input: DesignGenerationInput, signal?: AbortSignal) => demo.generateDesign(input, signal));
    const controller = new DataAIController({
      kind: 'demo', model: demo.model,
      understandRoom: (context, signal) => demo.understandRoom(context, signal),
      generateDesign,
    }, new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY), DEFAULT_AI_POLICY);
    const abort = new AbortController();
    abort.abort();
    const room: RoomStateModel = { id: 'r', name: 'R', roomType: 'other', objects: [], measurements: {}, updatedAt: 1, version: 1, sensitivity: 'sensitive' };
    await expect(controller.generateDesign(room, [{ name: 'prompt', dataClass: 'ai-prompt', value: 'Plan.' }], abort.signal)).rejects.toThrow(/cancelled/i);
    expect(generateDesign).not.toHaveBeenCalled();
  });

  it('rejects malformed provider action objects at the response boundary', async () => {
    const consent = new ConsentRegistry();
    consent.set('ai-processing', true);
    const provider: AIProvider = {
      kind: 'remote',
      model: 'test-provider',
      understandRoom: async () => { throw new Error('unused'); },
      generateDesign: async () => ({
        output: { style: 'test', rationale: 'test', actions: [{ type: 'add', actionId: 'bad', object: null }], insights: [] },
      } as unknown as AIResult<DesignGenerationOutput>),
    };
    const controller = new DataAIController(provider, new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY), DEFAULT_AI_POLICY);
    const room: RoomStateModel = { id: 'r', name: 'R', roomType: 'other', objects: [], measurements: {}, updatedAt: 1, version: 1, sensitivity: 'sensitive' };
    await expect(controller.generateDesign(room, [{ name: 'prompt', dataClass: 'ai-prompt', value: 'Plan.' }])).rejects.toThrow(/invalid response/i);
  });
});
