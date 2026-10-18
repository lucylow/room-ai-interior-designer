import type { AIInsight, AIResult, SanitizedAIContext, SafeAIAction, RoomStateModel } from '../security/types';

export interface RoomUnderstanding {
  roomType: RoomStateModel['roomType'];
  confidence: number;
  detectedObjects: Array<{ type: string; label: string; confidence: number }>;
  constraints: string[];
  privacyNotes: string[];
}

export interface DesignGenerationInput {
  context: SanitizedAIContext;
  room: RoomStateModel;
}

export interface DesignGenerationOutput {
  style: string;
  rationale: string;
  actions: SafeAIAction[];
  insights: AIInsight[];
}

export interface AIProvider {
  readonly kind: 'demo' | 'remote';
  readonly model: string;
  understandRoom(context: SanitizedAIContext, signal?: AbortSignal): Promise<AIResult<RoomUnderstanding>>;
  generateDesign(input: DesignGenerationInput, signal?: AbortSignal): Promise<AIResult<DesignGenerationOutput>>;
}
