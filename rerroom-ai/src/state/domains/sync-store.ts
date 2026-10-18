import type { MutationEnvelope } from '../../security/types';
import { createExternalStore, type ExternalStore } from '../store';

export interface SyncDomainState { queue: MutationEnvelope<unknown>[]; online: boolean; lastSyncAt?: number; }
export const syncStore: ExternalStore<SyncDomainState> = createExternalStore({ queue: [], online: true });

export function enqueueMutation<T>(mutation: MutationEnvelope<T>): void {
  syncStore.setState((state) => ({ ...state, queue: [...state.queue.filter((item) => item.mutationId !== mutation.mutationId), mutation] }));
}

export function markMutation<T = unknown>(mutationId: string, status: MutationEnvelope<T>['status'], error?: string): void {
  syncStore.setState((state) => ({ ...state, queue: state.queue.map((item) => item.mutationId === mutationId ? { ...item, status, attempts: status === 'sending' ? item.attempts + 1 : item.attempts, lastError: error } : item) }));
}

export function removeAckedMutations(): void { syncStore.setState((state) => ({ ...state, queue: state.queue.filter((item) => item.status !== 'acked'), lastSyncAt: Date.now() })); }
export function setOnline(online: boolean): void { syncStore.setState((state) => ({ ...state, online })); }
