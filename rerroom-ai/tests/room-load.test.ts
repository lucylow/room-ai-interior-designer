import { describe, expect, it } from "vitest";
import { classifyRoomLoadError, roomLoadCopy, shouldRetryRoomLoad } from "../services/roomLoad";
describe("room detail loading", () => {
  it("classifies network failures as offline", () => { expect(classifyRoomLoadError(new Error("Network request timed out"))).toBe("offline"); expect(roomLoadCopy("offline").title).toBe("You’re offline"); expect(shouldRetryRoomLoad("offline")).toBe(true); });
  it("keeps unknown failures retryable with neutral copy", () => { expect(classifyRoomLoadError(new Error("Storage read failed"))).toBe("unknown"); expect(roomLoadCopy("unknown").title).toBe("Couldn’t load this room"); expect(shouldRetryRoomLoad("unknown")).toBe(true); });
});
