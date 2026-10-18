import type { MutationEnvelope } from '../../security/types';
import { retryDelayMs, shouldRetry } from './idempotent-queue';

export interface MutationSender {
  send<T>(mutation: MutationEnvelope<T>): Promise<void>;
}

export async function drainQueue(
  queue: MutationEnvelope<unknown>[],
  sender: MutationSender,
  onStatus: (mutationId: string, status: MutationEnvelope<unknown>['status'], error?: string) => void,
): Promise<void> {
  for (const mutation of queue) {
    if (mutation.status === 'acked') continue;
    if (mutation.status === 'failed' && !shouldRetry(mutation)) continue;
    onStatus(mutation.mutationId, 'sending');
    try {
      await sender.send(mutation);
      onStatus(mutation.mutationId, 'acked');
    } catch (error) {
      onStatus(mutation.mutationId, 'failed', error instanceof Error ? error.message : 'Unknown sync failure');
      if (mutation.attempts < 2) await new Promise((resolve) => setTimeout(resolve, retryDelayMs(mutation.attempts)));
    }
  }
}
