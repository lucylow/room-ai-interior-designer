import { describe, expect, it } from "vitest";

import { canResume, exposureHint, guidance, nextAngle, scanComplete, scanProgress, validatePhoto } from "../services/cameraCore";

describe("camera workflow utilities", () => {
  it("gives actionable guidance for weak captures", () => {
    expect(guidance({ blur: true })).toBe("Hold still");
    expect(guidance({ dark: true })).toBe("Add more light");
    expect(guidance({ incomplete: true })).toBe("Include floor and ceiling");
  });
  it("accepts a strong photo and rejects quality risks", () => {
    expect(validatePhoto({ width: 1600, height: 1200, sharpness: 0.8, luma: 0.5 }).ok).toBe(true);
    expect(validatePhoto({ width: 500, height: 500 }).warnings.length).toBeGreaterThan(0);
    expect(exposureHint(0.12)).toBe("Dark room");
  });
  it("sequences a minimum three-angle scan", () => {
    expect(nextAngle([])).toBe("front");
    expect(nextAngle(["front", "left"])).toBe("right");
    expect(scanComplete(3)).toBe(true);
    expect(scanProgress(2, 3)).toBe(67);
  });
  it("can resume an incomplete session with captured photos", () => {
    expect(canResume({ id: "scan-1", photos: [{ uri: "file://room.jpg", angle: "front", quality: 0.9, timestamp: 1 }], startedAt: 1, completed: false })).toBe(true);
    expect(canResume(null)).toBe(false);
  });
});
