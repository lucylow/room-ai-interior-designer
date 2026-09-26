export const MAX_REASSIGNMENT_HISTORY = 5;
export interface ReassignmentMove { productId: string; previousRoomId?: string; previousRoomTitle?: string; targetRoomTitle: string; createdAt: number; }

export function appendReassignmentMove(history: ReassignmentMove[], move: ReassignmentMove): ReassignmentMove[] {
  return [move, ...history.filter((entry) => entry.productId !== move.productId)].slice(0, MAX_REASSIGNMENT_HISTORY);
}

export function removeReassignmentMove(history: ReassignmentMove[], createdAt: number): ReassignmentMove[] {
  return history.filter((entry) => entry.createdAt !== createdAt);
}

export function latestReassignmentMove(history: ReassignmentMove[]): ReassignmentMove | null {
  return history[0] ?? null;
}

export function reassignmentMoveLabel(move: ReassignmentMove, productName?: string): string {
  return `${productName ?? "Piece"} moved to ${move.targetRoomTitle}`;
}

export function reassignmentMoveTime(createdAt: number, now: number): string {
  const elapsedSeconds = Math.max(0, Math.floor((now - createdAt) / 1000));
  if (elapsedSeconds < 60) return "Just now";
  const minutes = Math.floor(elapsedSeconds / 60);
  return `${minutes}m ago`;
}

export function reassignmentMoveDetail(move: ReassignmentMove, previousRoomTitle?: string): string {
  return `${previousRoomTitle ?? "Saved shortlist"} → ${move.targetRoomTitle}`;
}

export function reassignmentMoveExactTime(createdAt: number): string {
  const iso = new Date(createdAt).toISOString();
  return `${iso.slice(11, 16)} UTC`;
}
