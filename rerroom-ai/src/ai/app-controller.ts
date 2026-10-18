import { DataAIController } from './controller';
import { DeterministicDemoAIProvider } from './demo-provider';
import { AIDataPolicyEngine } from '../security/ai-data-policy';
import { DEFAULT_AI_POLICY } from '../security/constants';
import type { RoomStateModel } from '../security/types';
import { privacyConsentRegistry } from '../state/domains/privacy-store';
import type { ContextField } from '../security/ai-context';

const engine = new AIDataPolicyEngine(privacyConsentRegistry, DEFAULT_AI_POLICY);
const controller = new DataAIController(new DeterministicDemoAIProvider(), engine, DEFAULT_AI_POLICY);

let lastContext: ReturnType<typeof controller.buildContext>['context'] | null = null;

function normalizeRoomType(type: string): RoomStateModel['roomType'] {
  const value = type.toLowerCase();
  if (value.includes('bed')) return 'bedroom';
  if (value.includes('kitchen')) return 'kitchen';
  if (value.includes('dining')) return 'dining-room';
  if (value.includes('office')) return 'office';
  if (value.includes('bath')) return 'bathroom';
  if (value.includes('living')) return 'living-room';
  return 'other';
}

export function getLastAIContext() {
  return lastContext;
}

/** Run the strictly local demo provider; room imagery and direct identifiers are never included. */
export async function generateProtectedConcept(input: {
  room: { id: string; name: string; type: string; dimensions: { widthM: number; lengthM: number; ceilingM: number } };
  style: string;
  prompt: string;
}, signal?: AbortSignal) {
  lastContext = null;
  const room: RoomStateModel = {
    id: input.room.id,
    name: input.room.name,
    roomType: normalizeRoomType(input.room.type),
    objects: [
      { id: `${input.room.id}-sofa`, type: 'sofa', label: 'Primary seating', x: 1.6, y: 0, z: 1.2, width: 2, height: 0.85, depth: 0.9, rotationY: 0, locked: false },
      { id: `${input.room.id}-table`, type: 'table', label: 'Coffee table', x: 2.2, y: 0, z: 2.0, width: 0.9, height: 0.42, depth: 0.6, rotationY: 0, locked: false },
    ],
    measurements: {
      widthM: input.room.dimensions.widthM,
      depthM: input.room.dimensions.lengthM,
      ceilingM: input.room.dimensions.ceilingM,
    },
    updatedAt: Date.now(),
    version: 1,
    sensitivity: 'sensitive',
  };
  const fields: ContextField[] = [
    { name: 'prompt', dataClass: 'ai-prompt', value: input.prompt },
    { name: 'style', dataClass: 'ai-prompt', value: input.style },
    { name: 'roomType', dataClass: 'room-layout', value: room.roomType },
    { name: 'layout', dataClass: 'room-layout', value: room.objects.map(({ type, x, y, z, width, height, depth, rotationY }) => ({ type, x, y, z, width, height, depth, rotationY })) },
    { name: 'measurements', dataClass: 'measurement', value: room.measurements },
  ];
  const result = await controller.generateDesign(room, fields, signal);
  if (signal?.aborted) throw new Error('AI request was cancelled.');
  lastContext = result.context;
  return result;
}
