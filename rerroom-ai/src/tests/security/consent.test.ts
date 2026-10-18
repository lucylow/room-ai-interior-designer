import { describe, expect, it } from 'vitest';
import { ConsentRegistry } from '../../security/consent';

describe('consent', () => {
  it('defaults cloud and AI processing off', () => {
    const registry = new ConsentRegistry();
    expect(registry.get('cloud-storage')).toBe(false);
    expect(registry.get('ai-processing')).toBe(false);
  });

  it('can revoke optional consent', () => {
    const registry = new ConsentRegistry();
    registry.set('ai-processing', true);
    registry.revokeAllExceptEssential();
    expect(registry.get('ai-processing')).toBe(false);
    expect(registry.get('diagnostics')).toBe(true);
  });
});
