import { roomStore } from '../src/state/domains/room-store';
import { persistDomain, hydrateDomain } from '../src/state/persistence/persist-domain';

const ROOM_SCHEMA = 3;
const ROOM_KEY = 'rerroom:rooms:v3';

export function persistRooms(): void {
  persistDomain({ key: ROOM_KEY, schema: ROOM_SCHEMA, select: () => roomStore.getSnapshot(), hydrate: () => undefined });
}

export function hydrateRooms(hydrate: (value: ReturnType<typeof roomStore.getSnapshot>) => void): boolean {
  return hydrateDomain({ key: ROOM_KEY, schema: ROOM_SCHEMA, select: () => roomStore.getSnapshot(), hydrate });
}
