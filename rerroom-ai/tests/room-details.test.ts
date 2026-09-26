import { describe, expect, it } from "vitest";
import { findSavedRoom, renderedUriForHistory, activeHistoryEntry, toRoomDetail } from "../services/roomDetails";

describe("room detail model", () => {
  it("projects a saved design into a stable detail view model", () => {
    const model = toRoomDetail({ id: "room-1", title: "Living room refresh", roomType: "living room", style: "modern warm", imageUri: "demo://room", conceptCount: 2, updatedAt: "Today" });
    expect(model.design.id).toBe("room-1");
    expect(model.history[0].label).toContain("Original concept");
    expect(model.preservationNote).toContain("Architecture");
  });
  it("does not substitute another room for a missing id", () => { const designs = [{ id: "one", title: "One", style: "Modern", roomType: "Living room", imageUri: "demo://one", updatedAt: "Today", conceptCount: 1 }, { id: "two", title: "Two", style: "Japandi", roomType: "Bedroom", imageUri: "demo://two", updatedAt: "Yesterday", conceptCount: 1 }]; expect(findSavedRoom(designs, "two")?.title).toBe("Two"); expect(findSavedRoom(designs, "missing")).toBeNull(); });
  it("resolves a selected rendered version and falls back for legacy records", () => { const design = { id: "room-3", title: "Room", style: "Modern", roomType: "Living room", imageUri: "legacy://room", updatedAt: "Today", conceptCount: 1, refinements: [{ id: "initial", label: "Original", createdAt: "Today", versionId: "v-1" }], versions: [{ id: "v-1", imageUri: "render://one", createdAt: "Today" }] }; const detail = toRoomDetail(design); expect(renderedUriForHistory(detail.design, activeHistoryEntry(detail))).toBe("render://one"); expect(renderedUriForHistory({ ...design, versions: undefined }, activeHistoryEntry(detail))).toBe("legacy://room"); });
});
