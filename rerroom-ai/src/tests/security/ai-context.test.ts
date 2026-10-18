import { describe, expect, it } from 'vitest';
import { buildAIContext } from '../../security/ai-context';
import { AIDataPolicyEngine } from '../../security/ai-data-policy';
import { ConsentRegistry } from '../../security/consent';
import { DEFAULT_AI_POLICY } from '../../security/constants';

describe('AI context minimization', () => {
  it('removes identifiers and private labels from nested room layout data', () => {
    const consent = new ConsentRegistry();
    consent.set('ai-processing', true);
    const engine = new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY);
    const result = buildAIContext([
      {
        name: 'layout',
        dataClass: 'room-layout',
        value: {
          objects: [{ id: 'private-object-id', label: 'Alice personal room', type: 'sofa', x: 1.5, width: 2 }],
          ownerEmail: 'alice@example.com',
          address: '100 Example Street',
        },
      },
    ], 'ai-generation', engine, DEFAULT_AI_POLICY);
    const value = result.context.fields[0].value;
    const serialized = JSON.stringify(value);
    expect(serialized).not.toContain('private-object-id');
    expect(serialized).not.toContain('Alice');
    expect(serialized).not.toContain('alice@example.com');
    expect(serialized).not.toContain('Example Street');
    expect(serialized).toContain('1.5');
    expect(result.context.fields[0].redacted).toBe(true);
  });

  it('blocks images and measurements when their explicit policy flags are off', () => {
    const consent = new ConsentRegistry();
    consent.set('ai-processing', true);
    const policy = { ...DEFAULT_AI_POLICY, allowImages: false, allowMeasurements: false };
    const engine = new AIDataPolicyEngine(consent, policy);
    const result = buildAIContext([
      { name: 'photo', dataClass: 'room-image', value: 'data:image/png;base64,private' },
      { name: 'dimensions', dataClass: 'measurement', value: { widthM: 4 } },
    ], 'ai-generation', engine, policy);
    expect(result.context.fields).toHaveLength(0);
    expect(result.blocked).toEqual(['photo', 'dimensions']);
  });
});
