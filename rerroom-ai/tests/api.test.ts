import { describe, expect, it } from "vitest";
import { ApiError, API_CONFIG, apiUrl, request } from "../services/api";

describe("typed API boundary", () => {
  it("normalizes API paths without exposing credentials", () => {
    expect(apiUrl("/v1/rooms")).toBe(`${API_CONFIG.baseUrl}/v1/rooms`);
    expect(apiUrl("v1/designs")).toBe(`${API_CONFIG.baseUrl}/v1/designs`);
  });
  it("returns an actionable configuration error when no backend is configured", async () => {
    await expect(request("/v1/rooms")).rejects.toMatchObject({ code: "API_NOT_CONFIGURED" });
    expect(new ApiError(408, "TIMEOUT", "retry").name).toBe("ApiError");
  });
});
