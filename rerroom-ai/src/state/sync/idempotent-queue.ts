import { idempotencyKey, randomId } from '../../security/ids';
import { SECURITY_CONSTANTS } from '../../security/constants';
import type { MutationEnvelope } from '../../security/types';

export function createMutation<T>(entity: string, entityId: string, version: number, payload: T): MutationEnvelope<T> {
  const mutationId = randomId('mutation');
  return {
    mutationId,
    idempotencyKey: idempotencyKey(mutationId, entity, entityId, version),
    entity,
    entityId,
    version,
    createdAt: Date.now(),
    payload,
    attempts: 0,
    status: 'queued',
  };
}

export function shouldRetry(mutation: MutationEnvelope<unknown>): boolean {
  return mutation.status === 'failed' && mutation.attempts < SECURITY_CONSTANTS.syncMaxAttempts;
}

export function retryDelayMs(attempts: number): number {
  const exponent = Math.min(6, Math.max(0, attempts));
  return Math.min(30_000, 500 * 2 ** exponent);
}
