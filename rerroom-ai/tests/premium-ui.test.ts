import { describe, expect, it } from "vitest";
import {
  mockARObjects,
  mockMeasurements,
  mockProducts,
  mockProjects,
  mockRecommendations,
  mockRooms,
} from "../src/premium/data";
import {
  constructionProgress,
  nextRotation,
  nextScale,
  productAvailability,
  productsForRoom,
  projectBudgetSummary,
  validationMessage,
} from "../src/features/catalog";

describe("premium RE:ROOM data baseline", () => {
  it("includes the promised catalog, room, project, and spatial volume", () => {
    expect(mockProducts.length).toBeGreaterThanOrEqual(80);
    expect(mockRooms.length).toBeGreaterThanOrEqual(12);
    expect(mockProjects.length).toBeGreaterThanOrEqual(12);
    expect(mockRecommendations.length).toBeGreaterThanOrEqual(32);
    expect(mockMeasurements.length).toBeGreaterThanOrEqual(60);
    expect(mockARObjects.length).toBeGreaterThanOrEqual(48);
  });

  it("keeps commerce and room records presentation-ready", () => {
    expect(
      mockProducts.every(
        (product) => product.price.amount > 0 && product.rating >= 4 && product.image.uri.length > 0,
      ),
    ).toBe(true);
    expect(
      mockRooms.every(
        (room) => room.dimensions.widthM > 0 && room.dimensions.lengthM > 0 && room.palette.length >= 4,
      ),
    ).toBe(true);
  });
});

describe("catalog utilities", () => {
  it("filters products against a room design style", () => {
    const matches = productsForRoom(mockProducts, mockRooms[0], 8);
    expect(matches).toHaveLength(8);
    expect(matches.every((product) => product.roomStyles.includes(mockRooms[0].style))).toBe(true);
  });

  it("summarizes construction spending and progress", () => {
    const summary = projectBudgetSummary(mockProjects[0]);
    expect(summary.remaining.amount).toBe(mockProjects[0].budget.amount - mockProjects[0].spent.amount);
    expect(summary.percentage).toBeGreaterThan(0);
    expect(constructionProgress(mockProjects[0])).toBeGreaterThanOrEqual(0);
  });

  it("exposes deterministic transform controls and placement feedback", () => {
    expect(nextRotation(350)).toBe(5);
    expect(nextScale(1.34, "increase")).toBe(1.35);
    expect(nextScale(0.66, "decrease")).toBe(0.65);
    expect(validationMessage({ collision: true, snapped: true, anchored: true }).tone).toBe("danger");
    expect(validationMessage({ collision: false, snapped: true, anchored: true }).tone).toBe("success");
  });

  it("communicates availability without an API dependency", () => {
    expect(productAvailability(mockProducts.find((product) => product.inStock) ?? mockProducts[0])).toContain(
      "stock",
    );
    expect(
      productAvailability(mockProducts.find((product) => !product.inStock) ?? mockProducts[0]),
    ).toContain("Backorder");
  });
});
