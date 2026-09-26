import { describe, expect, it } from "vitest";
import { canTransition, changeScope, mergeIntent, normalizeMime, normalizeVoice, privacyMetadata, sampleTimes, validateAsset } from "../services/advancedProcessing";

describe("advanced AI processing", () => {
  it("merges intent without duplicating preserved objects", () => {
    const intent = mergeIntent({ roomType: "living-room", goal: "refresh", style: "modern", preserve: ["sofa"], avoid: [] }, { preserve: ["sofa", "window"], avoid: ["clutter"] });
    expect(intent.preserve).toEqual(["sofa", "window"]);
    expect(intent.avoid).toEqual(["clutter"]);
  });
  it("normalizes multimodal refinement commands", () => {
    expect(normalizeVoice("Make it warmer!!!")).toBe("make it warmer");
    expect(changeScope("only change the rug")).toBe("local");
  });
});

describe("dataset processing", () => {
  it("normalizes and validates private media metadata", () => {
    expect(normalizeMime("image/jpg")).toBe("image/jpeg");
    expect(validateAsset({ byteSize: 1000, mimeType: "image/jpg", width: 120, height: 400 })).toContain("LOW_RESOLUTION");
    expect(privacyMetadata({ gps: "secret", source: "camera" })).toEqual({ source: "camera", locationStripped: true });
  });
  it("samples frames and validates recoverable job transitions", () => {
    expect(sampleTimes(5000, 2000)).toEqual([0, 2000, 4000]);
    expect(canTransition("queued", "running")).toBe(true);
    expect(canTransition("complete", "queued")).toBe(false);
  });
});
