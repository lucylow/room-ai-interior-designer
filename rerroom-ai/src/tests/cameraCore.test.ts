import { describe, expect, it } from "vitest";
import { validatePhoto } from "../../services/cameraCore";

describe("photo metadata validation", () => {
  it.each([
    { width: Number.NaN, height: 1200 },
    { width: 1200, height: Number.POSITIVE_INFINITY },
    { width: 0, height: 1200 },
    { width: 1200, height: -1 },
  ])("rejects invalid dimensions: $width × $height", (dimensions) => {
    const result = validatePhoto(dimensions);
    expect(result.ok).toBe(false);
    expect(result.warnings).toContain("Photo dimensions could not be read. Choose another photo");
  });

  it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])("rejects invalid file size %s", (bytes) => {
    const result = validatePhoto({ width: 1200, height: 1200, bytes });
    expect(result.ok).toBe(false);
    expect(result.warnings).toContain("Photo size could not be read. Choose another photo");
  });

  it("accepts valid photo metadata", () => {
    expect(validatePhoto({ width: 1200, height: 900, bytes: 2_000_000 })).toEqual({ ok: true, warnings: [] });
  });
});
