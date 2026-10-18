import { useSyncExternalStore } from 'react';

export interface ExternalStore<T> {
  getSnapshot(): T;
  subscribe(listener: () => void): () => void;
  setState(updater: (current: T) => T): void;
}

export function createExternalStore<T>(initial: T): ExternalStore<T> {
  let state = initial;
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => state,
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
    setState: (updater) => {
      const next = updater(state);
      if (Object.is(next, state)) return;
      state = next;
      for (const listener of listeners) listener();
    },
  };
}

export function useStoreSnapshot<T>(store: ExternalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
