import { describe, expect, it } from "vitest";
import { connectivityCopy, toConnectivity } from "../services/networkCore";

describe("network connectivity policy", () => {
  it("prioritizes confirmed internet reachability", () => {
    expect(toConnectivity({ isConnected: false, isInternetReachable: true })).toBe("online");
  });

  it("treats unavailable internet as offline", () => {
    expect(toConnectivity({ isConnected: true, isInternetReachable: false })).toBe("offline");
    expect(toConnectivity({ isConnected: false, isInternetReachable: null })).toBe("offline");
  });

  it("keeps an unresolved initial state distinct", () => {
    expect(toConnectivity({ isConnected: true, isInternetReachable: null })).toBe("unknown");
    expect(connectivityCopy("unknown").label).toBe("Checking connection");
  });

  it("provides copy that preserves local-first expectations", () => {
    expect(connectivityCopy("offline").message).toContain("Saved rooms remain available");
    expect(connectivityCopy("online").message).toContain("Ready to refresh");
  });
});
