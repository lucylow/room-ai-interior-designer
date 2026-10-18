import { requestId } from '../security/ids';
import type { AIProvider, DesignGenerationInput, DesignGenerationOutput, RoomUnderstanding } from './contracts';
import type { AIInsight, AIResult, SanitizedAIContext, SafeAIAction } from '../security/types';

function field(context: SanitizedAIContext, name: string): unknown {
  return context.fields.find((item) => item.name === name)?.value;
}

export class DeterministicDemoAIProvider implements AIProvider {
  readonly kind = 'demo' as const;
  readonly model = 'rerroom-demo-rules-1';

  async understandRoom(context: SanitizedAIContext, signal?: AbortSignal): Promise<AIResult<RoomUnderstanding>> {
    if (signal?.aborted) throw new Error('AI request was cancelled.');
    const prompt = String(field(context, 'prompt') ?? '').toLowerCase();
    const roomType: RoomUnderstanding['roomType'] = prompt.includes('bed') ? 'bedroom' : prompt.includes('office') ? 'office' : prompt.includes('kitchen') ? 'kitchen' : 'living-room';
    const detectedObjects = roomType === 'bedroom'
      ? [{ type: 'bed', label: 'Primary bed', confidence: 0.94 }, { type: 'lamp', label: 'Bedside lighting', confidence: 0.72 }]
      : [{ type: 'sofa', label: 'Primary seating', confidence: 0.93 }, { type: 'table', label: 'Coffee table', confidence: 0.81 }, { type: 'rug', label: 'Area rug', confidence: 0.78 }];
    const constraints = ['Keep door clearance open.', 'Preserve camera-visible room geometry.', 'Avoid blocking the primary circulation path.'];
    const privacyNotes = ['Demo mode does not upload the original image.', 'AI context is synthetic and locally generated.'];
    return this.result({ roomType, confidence: 0.91, detectedObjects, constraints, privacyNotes }, context);
  }

  async generateDesign(input: DesignGenerationInput, signal?: AbortSignal): Promise<AIResult<DesignGenerationOutput>> {
    if (signal?.aborted) throw new Error('AI request was cancelled.');
    const style = String(field(input.context, 'style') ?? 'warm-modern');
    const target = input.room.objects.find((object) => object.type === 'table' && !object.locked) ?? input.room.objects.find((object) => !object.locked);
    const actions: SafeAIAction[] = [];
    if (target) actions.push({ type: 'move', actionId: requestId(), targetId: target.id, dx: 0.08, dy: 0, dz: 0, reason: 'Improve circulation around the center furniture grouping.' });
    if (!input.room.objects.some((object) => object.type === 'lamp')) {
      actions.push({
        type: 'add',
        actionId: requestId(),
        object: { type: 'lamp', label: 'AI floor lamp', x: 1.1, y: 0, z: 1.2, width: 0.32, height: 1.65, depth: 0.32, rotationY: 0, locked: false },
        reason: 'Add layered ambient lighting.',
      });
    }
    const insights: AIInsight[] = [
      { id: requestId(), severity: 'info', category: 'design', title: 'Layered lighting', summary: 'The demo plan adds a secondary light source for visual balance.', evidence: ['No floor lamp detected in current object list.'], source: 'demo' },
      { id: requestId(), severity: 'low', category: 'spatial', title: 'Circulation', summary: 'A small center-table adjustment may create a cleaner path.', evidence: ['Target object is movable.'], source: 'demo' },
    ];
    return this.result({ style, rationale: 'Deterministic demo recommendation based on room objects and user style preference.', actions, insights }, input.context);
  }

  private result<T>(output: T, context: SanitizedAIContext): AIResult<T> {
    return { requestId: context.requestId, provider: 'demo', model: this.model, createdAt: Date.now(), output, policyVersion: context.policyVersion, rejectedFields: [] };
  }
}
