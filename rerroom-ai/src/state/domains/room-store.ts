import { SECURITY_CONSTANTS } from '../../security/constants';
import type { RoomStateModel } from '../../security/types';
import { createExternalStore, type ExternalStore } from '../store';

export interface RoomDomainState {
  activeRoomId?: string;
  rooms: Record<string, RoomStateModel>;
  history: string[];
}

export const roomStore: ExternalStore<RoomDomainState> = createExternalStore({ rooms: {}, history: [] });

export function upsertRoom(room: RoomStateModel): void {
  if (room.objects.length > SECURITY_CONSTANTS.maxRoomObjects) throw new Error('Room contains too many objects.');
  roomStore.setState((state) => ({
    ...state,
    rooms: { ...state.rooms, [room.id]: room },
    activeRoomId: room.id,
    history: [...state.history.filter((id) => id !== room.id), room.id].slice(-50),
  }));
}

export function removeRoom(roomId: string): void {
  roomStore.setState((state) => {
    const rooms = { ...state.rooms };
    delete rooms[roomId];
    return { ...state, rooms, activeRoomId: state.activeRoomId === roomId ? state.history.find((id) => id !== roomId) : state.activeRoomId };
  });
}

export function setActiveRoom(roomId?: string): void {
  roomStore.setState((state) => ({ ...state, activeRoomId: roomId }));
}

export function getActiveRoom(): RoomStateModel | undefined {
  const state = roomStore.getSnapshot();
  return state.activeRoomId ? state.rooms[state.activeRoomId] : undefined;
}
