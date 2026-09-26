export const REASSIGN_UNDO_WINDOW_MS = 8000;

export function isReassignmentUndoAvailable(createdAt: number, now: number): boolean {
  return Number.isFinite(createdAt) && Number.isFinite(now) && now >= createdAt && now - createdAt < REASSIGN_UNDO_WINDOW_MS;
}

export function reassignmentUndoRemaining(createdAt: number, now: number): number {
  if (!isReassignmentUndoAvailable(createdAt, now)) return 0;
  return Math.max(0, REASSIGN_UNDO_WINDOW_MS - (now - createdAt));
}

export function reassignmentNoticeCopy(roomTitle: string): string {
  return `Piece moved to ${roomTitle}. You can undo this for a few seconds.`;
}
