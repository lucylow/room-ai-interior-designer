import { afterEach, describe, expect, it } from 'vitest';
import { generateProtectedConcept } from '../../ai/app-controller';
import { setConsent } from '../../state/domains/privacy-store';

const consentDecision = (granted: boolean) => ({
  scope: 'ai-processing' as const,
  granted,
  updatedAt: Date.now(),
  source: 'settings' as const,
  version: 1,
});

const room = {
  id: 'test-room',
  name: 'Sample living room',
  type: 'Living Room',
  dimensions: { widthM: 4.2, lengthM: 3.6, ceilingM: 2.6 },
};

afterEach(() => setConsent(consentDecision(false)));

describe('app AI boundary', () => {
  it('fails closed unless AI processing consent is granted', async () => {
    setConsent(consentDecision(false));
    await expect(generateProtectedConcept({ room, style: 'Warm Modern', prompt: 'Make it feel calm.' })).rejects.toThrow();
  });

  it('uses the local provider with only the minimized, policy-allowed context after opt-in', async () => {
    setConsent(consentDecision(true));
    const result = await generateProtectedConcept({ room, style: 'Warm Modern', prompt: 'Make it feel calm.' });
    expect(result.output).toBeDefined();
    expect(result.context.fields.map((field) => field.name)).toEqual(['prompt', 'style', 'roomType', 'layout', 'measurements']);
    expect(result.context.fields.some((field) => field.name.toLowerCase().includes('image'))).toBe(false);
    expect(result.context.purpose).toBe('ai-generation');
  });
});
