import { describe, expect, it } from "vitest";
import { parseTimeFormat, timeFormatPreferenceCopy } from "../services/timeFormatStorage";
import { priceRefreshTimeCopy } from "../services/shopCore";

describe("time format storage", () => {
  it("renders a deterministic preview for both supported formats", () => {
    const timestamp = Date.parse("2026-08-22T14:32:00.000Z");
    expect(priceRefreshTimeCopy(timestamp, "UTC", "12h")).toContain("2:32 PM");
    expect(priceRefreshTimeCopy(timestamp, "UTC", "24h")).toContain("14:32");
  });

  it("describes the selected display format clearly", () => {
    expect(timeFormatPreferenceCopy("12h")).toBe("Retailer times will use 12-hour format.");
    expect(timeFormatPreferenceCopy("24h")).toBe("Retailer times will use 24-hour format.");
  });

  it("accepts only the supported 24-hour value", () => {
    expect(parseTimeFormat("24h")).toBe("24h");
    expect(parseTimeFormat("12h")).toBe("12h");
    expect(parseTimeFormat(null)).toBe("12h");
    expect(parseTimeFormat("invalid")).toBe("12h");
  });
});
