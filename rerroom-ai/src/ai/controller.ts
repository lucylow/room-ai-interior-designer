import { AIDataPolicyEngine } from '../security/ai-data-policy';
import { buildAIContext, type ContextField } from '../security/ai-context';
import { detectPromptInjection } from '../security/prompt-injection';
import { applySafeAIAction, validateSafeAIAction } from '../security/safe-ai-actions';
import type { AIDataPolicy, AIInsight, ProcessingPurpose, RoomObjectState, RoomStateModel, SafeAIAction } from '../security/types';
import type { AIProvider, DesignGenerationOutput } from './contracts';

function numeric(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function roomType(value: unknown): RoomStateModel['roomType'] {
  const allowed: RoomStateModel['roomType'][] = ['living-room', 'bedroom', 'kitchen', 'office', 'dining-room', 'bathroom', 'other'];
  return typeof value === 'string' && allowed.includes(value as RoomStateModel['roomType'])
    ? value as RoomStateModel['roomType']
    : 'other';
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new Error('AI request was cancelled.');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

const supportedObjectTypes = ['sofa', 'table', 'rug', 'lamp', 'cabinet', 'bed', 'chair', 'plant', 'custom'];

function isProviderAction(value: unknown): value is SafeAIAction {
  if (!isRecord(value) || typeof value.actionId !== 'string' || !value.actionId || value.actionId.length > 256 ||
      (value.targetId !== undefined && (typeof value.targetId !== 'string' || value.targetId.length > 256)) ||
      (value.reason !== undefined && (typeof value.reason !== 'string' || value.reason.length > 1000))) return false;
  switch (value.type) {
    case 'move': return isFiniteNumber(value.dx) && isFiniteNumber(value.dy) && isFiniteNumber(value.dz);
    case 'resize': return isFiniteNumber(value.width) && isFiniteNumber(value.height) && isFiniteNumber(value.depth);
    case 'rotate': return isFiniteNumber(value.rotationY);
    case 'remove': return true;
    case 'replace': return supportedObjectTypes.includes(String(value.replacementType)) && typeof value.label === 'string' && value.label.length <= 200;
    case 'style': return typeof value.style === 'string' && value.style.length > 0 && value.style.length <= 120;
    case 'add': {
      const object = value.object;
      return isRecord(object) && supportedObjectTypes.includes(String(object.type)) && typeof object.label === 'string' && object.label.length <= 200 &&
        ['x', 'y', 'z', 'width', 'height', 'depth', 'rotationY'].every(key => isFiniteNumber(object[key])) && typeof object.locked === 'boolean';
    }
    default: return false;
  }
}

function assertProviderDesignResult(value: unknown): asserts value is { output: DesignGenerationOutput } {
  if (!isRecord(value) || !isRecord(value.output)) throw new Error('AI provider returned an invalid response.');
  const output = value.output;
  const validSeverities = ['info', 'low', 'medium', 'high'];
  const validCategories = ['privacy', 'spatial', 'design', 'cost', 'safety'];
  const validSources = ['local-rules', 'model', 'demo'];
  const validInsights = (item: unknown): boolean => isRecord(item) && typeof item.id === 'string' && item.id.length <= 256 &&
    validSeverities.includes(String(item.severity)) && validCategories.includes(String(item.category)) &&
    typeof item.title === 'string' && item.title.length <= 256 && typeof item.summary === 'string' && item.summary.length <= 2000 &&
    Array.isArray(item.evidence) && item.evidence.length <= 50 && item.evidence.every(entry => typeof entry === 'string' && entry.length <= 1000) &&
    validSources.includes(String(item.source));
  if (typeof output.style !== 'string' || output.style.length > 120 || typeof output.rationale !== 'string' || output.rationale.length > 4000 ||
      !Array.isArray(output.actions) || output.actions.length > 100 || !output.actions.every(isProviderAction) ||
      !Array.isArray(output.insights) || output.insights.length > 100 || !output.insights.every(validInsights)) {
    throw new Error('AI provider returned an invalid response.');
  }
}

function assertRoomUnderstandingResult(value: unknown): void {
  if (!isRecord(value) || !isRecord(value.output)) throw new Error('AI provider returned an invalid response.');
  const output = value.output;
  const roomTypes = ['living-room', 'bedroom', 'kitchen', 'office', 'dining-room', 'bathroom', 'other'];
  const validTextList = (items: unknown) => Array.isArray(items) && items.length <= 100 && items.every(item => typeof item === 'string' && item.length <= 1000);
  if (!roomTypes.includes(String(output.roomType)) || !isFiniteNumber(output.confidence) || output.confidence < 0 || output.confidence > 1 ||
      !Array.isArray(output.detectedObjects) || output.detectedObjects.length > 250 || !output.detectedObjects.every(item => isRecord(item) &&
        typeof item.type === 'string' && item.type.length <= 128 && typeof item.label === 'string' && item.label.length <= 256 &&
        isFiniteNumber(item.confidence) && item.confidence >= 0 && item.confidence <= 1) ||
      !validTextList(output.constraints) || !validTextList(output.privacyNotes)) throw new Error('AI provider returned an invalid response.');
}

function providerRoomProjection(room: RoomStateModel, context: ReturnType<typeof buildAIContext>['context']) {
  const layoutField = context.fields.find((field) => field.dataClass === 'room-layout' && field.value !== null && typeof field.value === 'object');
  const measurementField = context.fields.find((field) => field.dataClass === 'measurement');
  const roomTypeField = context.fields.find((field) => field.name === 'roomType');
  const rawLayout = layoutField?.value;
  const rawObjects = Array.isArray(rawLayout)
    ? rawLayout
    : rawLayout && typeof rawLayout === 'object' && Array.isArray((rawLayout as { objects?: unknown }).objects)
      ? (rawLayout as { objects: unknown[] }).objects
      : [];
  const providerToLocalId = new Map<string, string>();
  const supportedTypes = new Set<RoomObjectState['type']>(['sofa', 'table', 'rug', 'lamp', 'cabinet', 'bed', 'chair', 'plant', 'custom']);
  const objects: RoomObjectState[] = rawObjects.slice(0, 250).flatMap((item, index) => {
    if (!item || typeof item !== 'object' || !room.objects[index]) return [];
    const record = item as Record<string, unknown>;
    const type = typeof record.type === 'string' && supportedTypes.has(record.type as RoomObjectState['type'])
      ? record.type as RoomObjectState['type']
      : room.objects[index].type;
    const providerId = `object-${index + 1}`;
    providerToLocalId.set(providerId, room.objects[index].id);
    return [{
      id: providerId,
      type,
      label: type,
      x: numeric(record, 'x'),
      y: numeric(record, 'y'),
      z: numeric(record, 'z'),
      width: numeric(record, 'width'),
      height: numeric(record, 'height'),
      depth: numeric(record, 'depth'),
      rotationY: numeric(record, 'rotationY'),
      locked: Boolean(record.locked),
    }];
  });
  const rawMeasurements = measurementField?.value;
  const measurementRecord = rawMeasurements && typeof rawMeasurements === 'object'
    ? rawMeasurements as Record<string, unknown>
    : {};

  return {
    room: {
      id: 'room',
      name: 'Room',
      roomType: roomType(roomTypeField?.value),
      objects,
      measurements: {
        ...(Number.isFinite(measurementRecord.widthM) ? { widthM: measurementRecord.widthM as number } : {}),
        ...(Number.isFinite(measurementRecord.depthM) ? { depthM: measurementRecord.depthM as number } : {}),
        ...(Number.isFinite(measurementRecord.ceilingM) ? { ceilingM: measurementRecord.ceilingM as number } : {}),
      },
      updatedAt: 0,
      version: 1,
      sensitivity: 'sensitive' as const,
    } satisfies RoomStateModel,
    providerToLocalId,
  };
}

export class DataAIController {
  constructor(
    private readonly provider: AIProvider,
    private readonly policyEngine: AIDataPolicyEngine,
    private readonly policy: AIDataPolicy,
  ) {}

  buildContext(fields: ContextField[], purpose: ProcessingPurpose) {
    return buildAIContext(fields, purpose, this.policyEngine, this.policy);
  }

  private ensureContextStillAllowed(fields: ContextField[], purpose: ProcessingPurpose, original: ReturnType<typeof buildAIContext>['context']['fields']): void {
    const current = this.buildContext(fields, purpose).context.fields;
    if (JSON.stringify(current) !== JSON.stringify(original)) throw new Error('AI consent or policy changed during the request.');
  }

  async understandRoom(fields: ContextField[], signal?: AbortSignal): Promise<Awaited<ReturnType<AIProvider['understandRoom']>>> {
    throwIfAborted(signal);
    const contextResult = this.buildContext(fields, 'room-understanding');
    if (contextResult.context.fields.length === 0) throw new Error('No room data is allowed by the current AI privacy policy.');
    const result = await this.provider.understandRoom(contextResult.context, signal);
    throwIfAborted(signal);
    this.ensureContextStillAllowed(fields, 'room-understanding', contextResult.context.fields);
    assertRoomUnderstandingResult(result);
    return result;
  }

  async generateDesign(room: RoomStateModel, fields: ContextField[], signal?: AbortSignal): Promise<{ output: DesignGenerationOutput; safeRoom: RoomStateModel; insights: AIInsight[]; blockedFields: string[]; warnings: string[]; context: ReturnType<typeof buildAIContext>['context'] }> {
    throwIfAborted(signal);
    const promptValue = fields.find((item) => item.name === 'prompt')?.value;
    if (typeof promptValue === 'string' && detectPromptInjection(promptValue).risky) throw new Error('Design prompt requires review before AI processing.');
    const contextResult = this.buildContext(fields, 'ai-generation');
    if (!contextResult.context.fields.length) throw new Error('AI generation requires an explicit allowed data context.');

    // Only pass the already-filtered context projection. Original room names, IDs, labels,
    // asset references, and data classes not granted by policy stay on the client.
    const projection = providerRoomProjection(room, contextResult.context);
    const result = await this.provider.generateDesign({ context: contextResult.context, room: projection.room }, signal);
    throwIfAborted(signal);
    this.ensureContextStillAllowed(fields, 'ai-generation', contextResult.context.fields);
    assertProviderDesignResult(result);

    let safeRoom = room;
    const acceptedInsights: AIInsight[] = [...result.output.insights];
    for (const action of result.output.actions) {
      const localizedAction: SafeAIAction = action.targetId
        ? { ...action, targetId: projection.providerToLocalId.get(action.targetId) ?? '__unknown_provider_target__' }
        : action;
      const errors = validateSafeAIAction(localizedAction, safeRoom);
      if (errors.length) {
        acceptedInsights.push({ id: action.actionId, severity: 'high', category: 'safety', title: 'AI action blocked', summary: errors.join(', '), evidence: [], source: 'model' });
        continue;
      }
      safeRoom = applySafeAIAction(safeRoom, localizedAction);
    }
    return { output: result.output, safeRoom, insights: acceptedInsights, blockedFields: contextResult.blocked, warnings: contextResult.warnings, context: contextResult.context };
  }
}
