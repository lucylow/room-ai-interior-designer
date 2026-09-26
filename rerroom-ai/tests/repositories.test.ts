import { describe, expect, it } from "vitest";
import { repositories } from "../services/repositories";
import { runtimePolicy } from "../services/runtime";

describe("service boundaries", () => {
  it("exposes typed domain repositories", () => {
    expect(typeof repositories.rooms.list).toBe("function");
    expect(typeof repositories.designs.list).toBe("function");
    expect(typeof repositories.generations.start).toBe("function");
    expect(typeof repositories.catalog.search).toBe("function");
  });
  it("keeps demo mode opt-in", () => {
    expect(runtimePolicy.allowDemoData).toBe(false);
  });
});
