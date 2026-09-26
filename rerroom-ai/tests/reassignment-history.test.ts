import { describe, expect, it } from "vitest";
import { MAX_REASSIGNMENT_HISTORY, appendReassignmentMove, latestReassignmentMove, reassignmentMoveDetail, reassignmentMoveExactTime, reassignmentMoveLabel, removeReassignmentMove, type ReassignmentMove } from "../services/reassignmentHistory";

const move = (productId: string, createdAt: number): ReassignmentMove => ({ productId, targetRoomTitle: "Living room", createdAt });

describe("reassignment history", () => {
  it("keeps newest moves first and bounds the history", () => {
    let history: ReassignmentMove[] = [];
    for (let index = 0; index < MAX_REASSIGNMENT_HISTORY + 2; index += 1) history = appendReassignmentMove(history, move(`piece-${index}`, index));
    expect(history).toHaveLength(MAX_REASSIGNMENT_HISTORY);
    expect(history[0].productId).toBe("piece-6");
    expect(history.at(-1)?.productId).toBe("piece-2");
  });

  it("replaces the prior move for the same piece", () => {
    const history = appendReassignmentMove([move("lamp", 1), move("rug", 2)], move("lamp", 3));
    expect(history.map((entry) => entry.productId)).toEqual(["lamp", "rug"]);
    expect(history[0].createdAt).toBe(3);
  });

  it("supports latest lookup, removal, and readable labels", () => {
    const history = [move("lamp", 3), move("rug", 2)];
    expect(latestReassignmentMove(history)?.productId).toBe("lamp");
    expect(removeReassignmentMove(history, 3)).toEqual([history[1]]);
    expect(reassignmentMoveLabel(history[0])).toBe("Piece moved to Living room");
    expect(reassignmentMoveDetail(history[0], "Bedroom")).toBe("Bedroom → Living room");
    expect(reassignmentMoveDetail(history[0])).toBe("Saved shortlist → Living room");
    expect(reassignmentMoveExactTime(Date.parse("2026-08-22T14:32:00.000Z"))).toBe("14:32 UTC");
    expect(latestReassignmentMove([])).toBeNull();
  });
});
