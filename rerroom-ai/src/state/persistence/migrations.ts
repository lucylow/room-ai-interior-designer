import type { RoomDomainState } from '../domains/room-store';

export interface Migration<T> { from: number; to: number; run(value: T): T; }

export const roomMigrations: Migration<RoomDomainState>[] = [
  {
    from: 1,
    to: 2,
    run: (value) => ({ ...value, history: value.history ?? [] }),
  },
  {
    from: 2,
    to: 3,
    run: (value) => ({
      ...value,
      rooms: Object.fromEntries(Object.entries(value.rooms).map(([id, room]) => [id, {
        ...room,
        version: room.version ?? 1,
        sensitivity: room.sensitivity ?? 'sensitive',
      }])),
    }),
  },
];

export function migrate<T>(value: T, version: number, target: number, migrations: Migration<T>[]): T {
  let current = value;
  let currentVersion = version;
  while (currentVersion < target) {
    const step = migrations.find((item) => item.from === currentVersion);
    if (!step) throw new Error(`No migration path from ${currentVersion}.`);
    current = step.run(current);
    currentVersion = step.to;
  }
  return current;
}
