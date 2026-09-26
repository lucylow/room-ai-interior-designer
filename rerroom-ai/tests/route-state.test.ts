import { describe, expect, it } from "vitest";
import { isSameRoom, parseCreateHandoff } from "../services/routeState";
describe("Create route handoff", () => {
  it("accepts a valid room and history label", () => { const handoff = parseCreateHandoff({ roomId: ["room_2"], historyId: ["history-2"], historyLabel: "Make it warmer" }); expect(handoff).toEqual({ roomId: "room_2", historyId: "history-2", historyLabel: "Make it warmer" }); expect(isSameRoom(handoff, "room_2")).toBe(true); });
  it("falls back safely for invalid room ids and labels", () => { expect(parseCreateHandoff({ roomId: "room/../../other", historyLabel: "x" })).toEqual({ roomId: "living-room-refresh", historyLabel: "x" }); expect(parseCreateHandoff({ roomId: "room-1", historyLabel: "x".repeat(121) }).historyLabel).toBeUndefined(); });
});
