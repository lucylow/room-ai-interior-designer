import { describe, expect, it } from 'vitest';
import { DeterministicDemoAIProvider } from '../../ai/demo-provider';

describe('demo AI', () => {
  it('returns deterministic room understanding', async () => {
    const provider = new DeterministicDemoAIProvider();
    const context = { requestId: 'req-1', purpose: 'room-understanding' as const, fields: [{ name: 'prompt', dataClass: 'ai-prompt' as const, value: 'modern living room', sensitivity: 'personal' as const, redacted: false }], policyVersion: 'ai-policy-1' };
    const result = await provider.understandRoom(context);
    expect(result.provider).toBe('demo');
    expect(result.output.roomType).toBe('living-room');
  });
});
