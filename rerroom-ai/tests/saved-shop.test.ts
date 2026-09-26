import { describe, expect, it } from "vitest";
import { parseSavedShopEntries, parseSavedShopIds } from "../services/savedShop";
import { REASSIGN_UNDO_WINDOW_MS, isReassignmentUndoAvailable, reassignmentNoticeCopy, reassignmentUndoRemaining } from "../services/reassignmentNotice";

describe("saved Shop persistence", () => {
  it("normalizes valid IDs, removes duplicates, and bounds malformed entries", () => {
    expect(parseSavedShopIds(JSON.stringify(["lamp", "lamp", "rug", ""]))).toEqual(["lamp", "rug"]);
    expect(parseSavedShopIds(JSON.stringify({ id: "lamp" }))).toEqual([]);
    expect(parseSavedShopIds("not-json")).toEqual([]);
    expect(parseSavedShopIds(null)).toEqual([]);
  });

  it("keeps the reassignment undo window bounded and copy explicit", () => {
    const createdAt = 1000;
    expect(isReassignmentUndoAvailable(createdAt, createdAt)).toBe(true);
    expect(isReassignmentUndoAvailable(createdAt, createdAt + REASSIGN_UNDO_WINDOW_MS - 1)).toBe(true);
    expect(isReassignmentUndoAvailable(createdAt, createdAt + REASSIGN_UNDO_WINDOW_MS)).toBe(false);
    expect(reassignmentUndoRemaining(createdAt, createdAt + 2500)).toBe(REASSIGN_UNDO_WINDOW_MS - 2500);
    expect(reassignmentUndoRemaining(createdAt, createdAt + REASSIGN_UNDO_WINDOW_MS)).toBe(0);
    expect(reassignmentNoticeCopy("Living room")).toContain("Living room");
  });

  it("normalizes room assignments while preserving legacy IDs", () => {
    expect(parseSavedShopEntries(JSON.stringify(["lamp", { productId: "cushion", roomId: "living" }, { productId: "cushion", roomId: "living" }, { productId: "vase", roomId: "" }]))).toEqual([{ productId: "lamp" }, { productId: "cushion", roomId: "living" }, { productId: "vase" }]);
    expect(parseSavedShopIds(JSON.stringify(["lamp", { productId: "cushion", roomId: "living" }]))).toEqual(["lamp", "cushion"]);
  });
});
