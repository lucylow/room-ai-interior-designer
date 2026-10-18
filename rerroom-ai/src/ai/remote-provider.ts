import type { AIProvider, DesignGenerationInput, RoomUnderstanding } from './contracts';
import { SecureApiClient } from '../security/api-client';
import type { AIResult, SanitizedAIContext } from '../security/types';

export class RemoteAIProvider implements AIProvider {
  readonly kind = 'remote' as const;
  constructor(private readonly api: SecureApiClient, public readonly model = 'server-selected') {}

  understandRoom(context: SanitizedAIContext, signal?: AbortSignal): Promise<AIResult<RoomUnderstanding>> {
    return this.api.request<AIResult<RoomUnderstanding>>('/v1/ai/room-understanding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context }),
      signal,
    });
  }

  generateDesign(input: DesignGenerationInput, signal?: AbortSignal): Promise<AIResult<import('./contracts').DesignGenerationOutput>> {
    return this.api.request<AIResult<import('./contracts').DesignGenerationOutput>>('/v1/ai/design-generation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal,
    });
  }
}
