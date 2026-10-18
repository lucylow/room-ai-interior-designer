import type { SelectionState } from '../core/types';

export interface SelectionHistory {
  entries: SelectionState[];
  cursor: number;
}

export function createSelectionHistory(): SelectionHistory {
  return { entries: [{ selectedIds: [], mode: 'object' }], cursor: 0 };
}

export function pushSelection(history: SelectionHistory, selection: SelectionState): SelectionHistory {
  const entries = history.entries.slice(0, history.cursor + 1).concat(selection).slice(-50);
  return { entries, cursor: entries.length - 1 };
}

export function undoSelection(history: SelectionHistory): SelectionState {
  return history.entries[Math.max(0, history.cursor - 1)] ?? history.entries[0];
}

export function redoSelection(history: SelectionHistory): SelectionState {
  return history.entries[Math.min(history.entries.length - 1, history.cursor + 1)] ?? history.entries[history.cursor];
}
