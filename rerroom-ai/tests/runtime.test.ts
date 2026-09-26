import { describe, expect, it } from "vitest";
import { apiUrl } from "../services/api";
import { runtimePolicy } from "../services/runtime";

describe("runtime policy", () => {
  it("does not enable demo data unless explicitly configured", () => {
    expect(runtimePolicy.allowDemoData).toBe(false);
  });
  it("keeps URL construction deterministic", () => {
    expect(apiUrl("/v1/generations")).toContain("/v1/generations");
  });
});
