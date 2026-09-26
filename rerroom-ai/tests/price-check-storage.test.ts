import { describe, expect, it } from "vitest";
import { parsePriceChecks } from "../services/priceCheckStorage";

describe("price check storage", () => {
  it("normalizes valid timestamps and ignores malformed entries", () => {
    expect(parsePriceChecks(JSON.stringify({ lamp: 123, rug: -1, vessel: "later", "": 456, console: 789 }))).toEqual({ lamp: 123, console: 789 });
  });

  it("recovers safely from empty, non-object, and invalid payloads", () => {
    expect(parsePriceChecks(null)).toEqual({});
    expect(parsePriceChecks("[]")).toEqual({});
    expect(parsePriceChecks("not-json")).toEqual({});
  });
});
