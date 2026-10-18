import { privacyConsentRegistry } from '../state/domains/privacy-store';
import type { RoomStateModel } from '../security/types';
import { roomStateToScene } from '../visualization/integration/room-state-adapter';
import { applySecurityContext } from '../recommendation-engine/integration/security-context-adapter';
import { recommendationToVisualizationPatch, buildPreviewQueue } from '../recommendation-engine/integration/visualization-adapter';
import { runPipeline } from '../recommendation-engine/engine/pipeline';
import { defaultPolicy } from '../recommendation-engine/policy/recommendation-policy';
import { demoRoom, demoPrefs, demoBudget } from '../recommendation-engine/demo/data';
import type { RecommendationRequest, RecommendationSet, RoomContext, UserPreferences } from '../recommendation-engine/core/types';

const VALID_ROOM_TYPES = new Set(['living-room', 'bedroom', 'kitchen', 'office', 'dining-room', 'bathroom', 'other']);
const OBJECT_TYPES = new Set(['sofa', 'table', 'rug', 'lamp', 'cabinet', 'bed', 'chair', 'plant', 'custom']);

export interface PreparedRecommendationContext {
  room: RoomContext;
  preferences: UserPreferences;
  synthetic: boolean;
  warnings: string[];
}

function finiteDimension(value: unknown, fallback: number, maximum: number): { value: number; observed: boolean } {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0.1 && value <= maximum) {
    return { value, observed: true };
  }
  return { value: fallback, observed: false };
}

function score(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function neutralPreferences(): UserPreferences {
  return {
    preferredStyles: [],
    avoidedStyles: [],
    preferredColors: [],
    avoidedColors: [],
    materials: [],
    dislikes: [],
    householdNeeds: [],
    priorities: ['layout', 'comfort', 'storage'],
    currency: 'USD',
    renovationHorizon: 'exploring',
    maintenanceTolerance: 'medium',
    sustainabilityPriority: 0.5,
    accessibilityPriority: 0.5,
    shoppingEnabled: false,
    learningEnabled: false,
    historyEnabled: false,
  };
}

function roomTypeForEngine(value: string): RoomContext['roomType'] {
  const normalized = value.toLowerCase().replace(/\s+/g, '-');
  if (VALID_ROOM_TYPES.has(normalized)) return normalized as RoomContext['roomType'];
  if (normalized.includes('dining')) return 'dining-room';
  if (normalized.includes('entry')) return 'entryway';
  if (normalized.includes('nursery')) return 'nursery';
  if (normalized.includes('studio')) return 'studio';
  return 'other';
}

function prepareSyntheticRoom(): PreparedRecommendationContext {
  const room: RoomContext = {
    ...demoRoom,
    roomId: 'demo-room',
    name: 'Illustrative demo room',
    objects: demoRoom.objects.slice(0, 50).map((object, index) => ({
      ...object,
      id: `object-${index + 1}`,
      label: `Furniture ${index + 1}`,
      styleTags: [],
      colorTags: [],
      attributes: undefined,
    })),
    openings: demoRoom.openings.slice(0, 20).map((opening, index) => ({ ...opening, id: `opening-${index + 1}` })),
    inferredFunctions: ['general living'],
    constraints: ['Synthetic example data; verify room measurements and openings before acting.'],
  };
  return {
    room,
    preferences: { ...demoPrefs, learningEnabled: false, historyEnabled: false, shoppingEnabled: false },
    synthetic: true,
    warnings: ['Using bundled synthetic demo data; no saved room or personal history was used.'],
  };
}

/** Convert only bounded geometry and room type. Never forward room/object IDs, names, labels, images or free text. */
export function prepareRecommendationContext(source?: RoomStateModel): PreparedRecommendationContext {
  if (!source) return prepareSyntheticRoom();
  if (!source.measurements || typeof source.roomType !== 'string' || !Array.isArray(source.objects) ||
      source.objects.length > 250 || source.objects.some((object) => !object || typeof object !== 'object')) {
    throw new Error('The current room data is incomplete or invalid.');
  }

  // Reuse the visualization boundary validator; invalid scenes do not enter the recommendation engine.
  roomStateToScene(source);
  const width = finiteDimension(source.measurements.widthM, 5, 100);
  const depth = finiteDimension(source.measurements.depthM, 4, 100);
  const ceiling = finiteDimension(source.measurements.ceilingM, 2.7, 20);
  const roomArea = width.value * depth.value;
  const objects = source.objects.map((object, index) => {
    if (!OBJECT_TYPES.has(object.type)) throw new Error('The current room contains an unsupported furniture type.');
    const values = [object.x, object.y, object.z, object.width, object.height, object.depth, object.rotationY];
    if (!values.every((value) => typeof value === 'number' && Number.isFinite(value)) ||
        object.width <= 0 || object.height <= 0 || object.depth <= 0 ||
        object.width > 10 || object.height > 10 || object.depth > 10) {
      throw new Error('The current room contains invalid furniture geometry.');
    }
    return {
      id: `object-${index + 1}`,
      type: object.type,
      label: `Furniture ${index + 1}`,
      position: { x: object.x, y: object.y + object.height / 2, z: object.z },
      size: { width: object.width, height: object.height, depth: object.depth },
      rotationY: object.rotationY,
      locked: object.locked,
      confidence: 0.5,
    };
  });
  const footprint = objects.reduce((total, object) => total + object.size.width * object.size.depth, 0);
  const density = score(footprint / Math.max(roomArea, 0.1));
  const storageCount = objects.filter((object) => ['cabinet', 'table'].includes(object.type)).length;
  const observedMeasurements = width.observed && depth.observed && ceiling.observed;

  const room: RoomContext = {
    roomId: 'current-room',
    name: 'Current room',
    roomType: roomTypeForEngine(source.roomType),
    measurements: { widthM: width.value, depthM: depth.value, ceilingM: ceiling.value, confidence: observedMeasurements ? 0.55 : 0.3 },
    objects,
    openings: [],
    naturalLightScore: 0.5,
    circulationScore: score(0.75 - density * 0.5),
    clutterScore: score(density * 1.5),
    storageScore: score(storageCount / Math.max(2, roomArea / 12)),
    visualBalanceScore: 0.5,
    accessibilityScore: 0.5,
    safetyScore: 0.5,
    acousticScore: 0.5,
    comfortScore: 0.5,
    sustainabilityScore: 0.5,
    workflowScore: 0.5,
    styleSignals: {},
    colorSignals: {},
    inferredFunctions: [roomTypeForEngine(source.roomType)],
    constraints: ['Opening/window positions and style preferences are unavailable; treat scores as rough heuristics.'],
  };

  return {
    room,
    preferences: neutralPreferences(),
    synthetic: false,
    warnings: [
      'Room labels and identifiers were removed before processing.',
      'No opening/window geometry, style preferences, shopping history or household profile was supplied.',
      'Room-quality signals are rough estimates, not measurements or professional advice.',
    ],
  };
}

function assertSafeResult(result: RecommendationSet, room: RoomContext): void {
  const boundedText = (value: unknown, maxLength: number): value is string =>
    typeof value === 'string' && value.length <= maxLength;
  const boundedScore = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
  if (!result || !Array.isArray(result.recommendations) || !Array.isArray(result.insights) ||
      result.recommendations.length > 50 || result.insights.length > 50 ||
      !Array.isArray(result.warnings) || result.warnings.length > 100 ||
      !Array.isArray(result.assumptions) || result.assumptions.length > 100 ||
      !Array.isArray(result.blockedIdeas) || result.blockedIdeas.length > 100 ||
      !boundedText(result.engineVersion, 120) || !boundedText(result.traceId, 256) ||
      typeof result.generatedAt !== 'number' || !Number.isFinite(result.generatedAt) ||
      !result.metrics || typeof result.metrics !== 'object' || Array.isArray(result.metrics) ||
      Object.keys(result.metrics).length > 100 || Object.values(result.metrics).some((value) => !Number.isFinite(value))) {
    throw new Error('The local recommendation engine returned an invalid result.');
  }
  const categories = new Set(['layout', 'style', 'color', 'lighting', 'storage', 'shopping', 'budget', 'safety', 'accessibility', 'maintenance', 'sustainability', 'construction', 'comfort', 'workflow', 'spatial']);
  const allowedActions = new Set(['move-object', 'resize-object', 'rotate-object', 'none']);
  const validObjectIds = new Set(room.objects.map((object) => object.id));
  const prohibited = result.recommendations.some((item) => {
    if (!item || typeof item !== 'object' || !Array.isArray(item.actions) || !Array.isArray(item.evidence) ||
        !Array.isArray(item.tradeoffs) || !Array.isArray(item.alternatives) || item.actions.length > 4 ||
        item.evidence.length > 20 || item.tradeoffs.length > 20 || item.alternatives.length > 20 ||
        !boundedText(item.id, 256) || !boundedText(item.title, 240) || !boundedText(item.summary, 4_000) ||
        !boundedText(item.rationale, 8_000) || !boundedScore(item.score) ||
        !boundedScore(item.confidence) || !boundedScore(item.expectedImpact) || !categories.has(item.category) ||
        item.tradeoffs.some((text) => !boundedText(text, 2_000)) ||
        item.alternatives.some((text) => !boundedText(text, 2_000)) ||
        item.evidence.some((evidence) => !evidence || typeof evidence !== 'object' ||
          !boundedText(evidence.id, 256) || !boundedText(evidence.label, 500) ||
          !boundedText(evidence.value, 2_000) || !boundedScore(evidence.confidence))) return true;
    return item.category === 'shopping' || item.category === 'construction' ||
      item.actions.some((action) => {
        if (!action || typeof action !== 'object' || !action.payload || typeof action.payload !== 'object' ||
            Array.isArray(action.payload) || !allowedActions.has(action.type) ||
            action.type !== 'none' && (!action.targetId || !validObjectIds.has(action.targetId)) ||
            Object.values(action.payload).some((value) => typeof value === 'number' && !Number.isFinite(value) ||
              typeof value === 'string' && value.length > 500 ||
              typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean')) return true;
        return action.payload.construction === true;
      });
  });
  if (prohibited) throw new Error('The local recommendation policy rejected an unsupported action.');
  const malformedInsight = result.insights.some((item) => !item || typeof item !== 'object' ||
    !boundedText(item.id, 256) || !boundedText(item.title, 240) || !boundedText(item.summary, 4_000) ||
    !boundedScore(item.confidence) || !categories.has(item.category) || !Array.isArray(item.evidence) || item.evidence.length > 20 ||
    item.evidence.some((evidence) => !evidence || typeof evidence !== 'object' ||
      !boundedText(evidence.id, 256) || !boundedText(evidence.label, 500) ||
      !boundedText(evidence.value, 2_000) || !boundedScore(evidence.confidence)));
  if (malformedInsight || result.warnings.some((item) => !boundedText(item, 2_000)) ||
      result.assumptions.some((item) => !boundedText(item, 2_000)) ||
      result.blockedIdeas.some((item) => !boundedText(item, 2_000))) {
    throw new Error('The local recommendation engine returned invalid display data.');
  }
}

function requireCurrentConsent(signal?: AbortSignal): void {
  if (signal?.aborted) throw new Error('Recommendation request was cancelled.');
  if (!privacyConsentRegistry.get('ai-processing')) {
    throw new Error('Enable AI processing consent in Privacy Center before generating recommendations.');
  }
}

export async function generateAppRecommendations(
  source?: RoomStateModel,
  signal?: AbortSignal,
): Promise<{ result: RecommendationSet; prepared: PreparedRecommendationContext; previewQueue: ReturnType<typeof buildPreviewQueue> }> {
  requireCurrentConsent(signal);
  const prepared = prepareRecommendationContext(source);
  const request: RecommendationRequest = {
    room: prepared.room,
    preferences: prepared.preferences,
    ...(prepared.synthetic ? { budget: demoBudget } : {}),
    catalog: [],
    recentRecommendations: [],
    previousInsights: [],
    maxRecommendations: 10,
    userPrompt: 'Suggest practical, low-risk improvements supported by the available room data.',
  };
  const secured = applySecurityContext(request, {
    consentGranted: true,
    allowHistory: false,
    allowRemoteModel: false,
    allowShopping: false,
    purpose: 'recommendation',
  });
  const policy = { ...defaultPolicy, allowShopping: false, allowConstruction: false };
  const result = await runPipeline(secured, policy);
  requireCurrentConsent(signal);
  assertSafeResult(result, prepared.room);
  const previewQueue = buildPreviewQueue(prepared.room, result.recommendations, 6);
  // Exercise the single-item adapter too; actions remain preview-only and are never committed here.
  if (result.recommendations[0]) recommendationToVisualizationPatch(prepared.room, result.recommendations[0]);
  return { result, prepared, previewQueue };
}
