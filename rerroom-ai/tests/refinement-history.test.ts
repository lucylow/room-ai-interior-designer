import { describe, expect, it } from "vitest";
import { activeRefinements, canRedoRefinement, canUndoRefinement, commitRefinement, createRefinementHistory, redoRefinement, undoRefinement } from "../services/refinementHistory";
const command = (id: string) => ({ id, op: "adjust" as const, payload: { instruction: id }, createdAt: 1 });
describe("refinement history", () => {
  it("supports undo and redo without mutating prior state", () => { const first = commitRefinement(createRefinementHistory(), command("warm")); const second = commitRefinement(first, command("lighter")); expect(activeRefinements(second)).toHaveLength(2); const undone = undoRefinement(second); expect(activeRefinements(undone)).toHaveLength(1); expect(canRedoRefinement(undone)).toBe(true); expect(activeRefinements(redoRefinement(undone))).toHaveLength(2); expect(canUndoRefinement(first)).toBe(true); });
  it("drops the redo branch after a new commit", () => { const state = commitRefinement(undoRefinement(commitRefinement(commitRefinement(createRefinementHistory(), command("a")), command("b"))), command("c")); expect(activeRefinements(state).map((item) => item.id)).toEqual(["a", "c"]); expect(canRedoRefinement(state)).toBe(false); });
});
