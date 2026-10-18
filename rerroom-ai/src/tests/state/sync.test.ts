import { describe, expect, it } from 'vitest';
import { createMutation, retryDelayMs } from '../../state/sync/idempotent-queue';

describe('sync', () => {
  it('creates stable idempotency metadata', () => {
    const mutation = createMutation('room', 'r1', 3, { value: 'x' });
    expect(mutation.idempotencyKey).toContain('room:r1:3');
    expect(mutation.status).toBe('queued');
  });

  it('backs off exponentially', () => {
    expect(retryDelayMs(0)).toBe(500);
    expect(retryDelayMs(4)).toBe(8000);
  });
});
