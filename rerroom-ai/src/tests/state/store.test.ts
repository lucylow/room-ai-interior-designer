import { describe, expect, it } from 'vitest';
import { createExternalStore } from '../../state/store';
import { createVisualizationStore } from '../../visualization/state/store';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('external store', () => {
  it('updates subscribers', () => {
    const store = createExternalStore({ value: 1 });
    let calls = 0;
    const unsubscribe = store.subscribe(() => { calls += 1; });
    store.setState((state) => ({ value: state.value + 1 }));
    expect(store.getSnapshot().value).toBe(2);
    expect(calls).toBe(1);
    unsubscribe();
  });
});

describe('visualization store boundaries', () => {
  it('rejects invalid scene commits without changing the current scene', () => {
    const store = createVisualizationStore(DEMO_ROOMS[0]);
    const current = store.getSnapshot().scene;
    const invalid = { ...current, room: { ...current.room, width: Number.NaN } };
    expect(() => store.commit(invalid, 'invalid edit')).toThrow(/room.width/i);
    expect(store.getSnapshot().scene).toBe(current);
  });
});
