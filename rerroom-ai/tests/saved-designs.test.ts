import { describe, expect, it } from "vitest";
import { demoSavedDesigns, parseSavedDesigns } from "../services/savedDesigns";

describe("saved design persistence", () => {
  it("recovers from malformed local storage", () => {
    expect(parseSavedDesigns("not-json")).toEqual([]);
    expect(parseSavedDesigns(JSON.stringify({ id: "wrong" }))).toEqual([]);
  });
  it("keeps valid records and exposes a stable demo fallback", () => {
    const records = parseSavedDesigns(JSON.stringify(demoSavedDesigns));
    expect(records).toHaveLength(1);
    expect(records[0].id).toBe("living-room-refresh");
  });
});
