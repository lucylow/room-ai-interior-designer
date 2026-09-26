import { describe, expect, it } from "vitest";
import { discoverCategories, filterInspirationStyles, inspirationStyles } from "../services/discoverCore";

describe("discover inspiration", () => {
  it("exposes the core browsing categories", () => {
    expect(discoverCategories).toEqual(["All", "Calm", "Warm", "Light"]);
  });

  it("returns all styles or only the selected feeling", () => {
    expect(filterInspirationStyles("All")).toHaveLength(inspirationStyles.length);
    expect(filterInspirationStyles("Warm").every((item) => item.category === "Warm")).toBe(true);
    expect(filterInspirationStyles("Calm")).toHaveLength(1);
  });

  it("keeps each profile actionable", () => {
    expect(inspirationStyles.every((item) => item.name && item.detail && item.prompt && item.palette.length === 3)).toBe(true);
  });
});
