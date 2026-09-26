import type { EditCommand } from "./mediaEditor";
export interface RefinementHistoryState { entries: EditCommand[]; cursor: number; }
export function createRefinementHistory(entries: EditCommand[] = []): RefinementHistoryState { return { entries: entries.slice(-20), cursor: Math.max(-1, Math.min(entries.length - 1, entries.length - 1)) }; }
export function commitRefinement(state: RefinementHistoryState, command: EditCommand): RefinementHistoryState { const entries = [...state.entries.slice(0, state.cursor + 1), command].slice(-20); return { entries, cursor: entries.length - 1 }; }
export function undoRefinement(state: RefinementHistoryState): RefinementHistoryState { return state.cursor < 0 ? state : { ...state, cursor: state.cursor - 1 }; }
export function redoRefinement(state: RefinementHistoryState): RefinementHistoryState { return state.cursor >= state.entries.length - 1 ? state : { ...state, cursor: state.cursor + 1 }; }
export const canUndoRefinement = (state: RefinementHistoryState) => state.cursor >= 0;
export const canRedoRefinement = (state: RefinementHistoryState) => state.cursor < state.entries.length - 1;
export const activeRefinements = (state: RefinementHistoryState) => state.entries.slice(0, state.cursor + 1);
