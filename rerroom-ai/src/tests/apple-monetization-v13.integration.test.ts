import { describe, expect, it, vi } from "vitest";
import {
  RevenueOSV13,
  type V13Subscription,
  type VerifiedAppleNotification,
} from "../apple-monetization-v13";
import { DomainError } from "../apple-monetization-v11";

const subscription = (overrides: Partial<V13Subscription> = {}): V13Subscription => ({
  id: "sub-pro-1",
  plan: { tier: "pro", period: "month" },
  status: "active",
  startedAt: 100,
  periodEndsAt: 1_000,
  autoRenew: true,
  ...overrides,
});

const notification: VerifiedAppleNotification = {
  notificationUUID: "apple-notice-1",
  notificationType: "DID_RENEW",
  signedDate: 200,
  payloadFingerprint: "server-verified-digest",
  productId: "com.reroom.ai.pro.monthly",
  transactionId: "tx-1",
  originalTransactionId: "orig-1",
  environment: "Sandbox",
};

describe("V13 integrated Revenue OS", () => {
  it("resolves the highest valid tier and respects exact expiry, revocation, and permanent unlocks", () => {
    const os = new RevenueOSV13();
    const snapshot = os.reconcileAccess(
      [
        subscription(),
        subscription({ id: "sub-studio", plan: { tier: "studio", period: "year" }, periodEndsAt: 500 }),
        subscription({
          id: "sub-revoked",
          plan: { tier: "studio", period: "year" },
          status: "revoked",
          periodEndsAt: 900,
        }),
      ],
      ["com.reroom.ai.export.pack"],
      200,
    );
    expect(snapshot.tier).toBe("studio");
    expect(os.canUse("bim_export", snapshot, 499)).toBe(true);
    expect(os.canUse("bim_export", snapshot, 500)).toBe(false);
    expect(os.canUse("hd_render", snapshot, 500)).toBe(true);
    expect(os.canUse("export_pack", snapshot, 500)).toBe(true);
    expect(os.canUse("hd_render", snapshot, 1_000)).toBe(false);
    expect(os.canUse("bim_export", snapshot, 199)).toBe(false);
    expect(() =>
      os.reconcileAccess(
        [subscription(), subscription({ plan: { tier: "studio", period: "year" } })],
        [],
        200,
      ),
    ).toThrow(DomainError);
  });

  it("uses transaction IDs for idempotent catalog-backed consumable grants and rejects non-consumables", () => {
    const os = new RevenueOSV13();
    const appleId = "com.reroom.ai.credits.100";
    expect(os.applyVerifiedConsumable("u-1", appleId, "tx-credit-1")).toBe(100);
    expect(os.applyVerifiedConsumable("u-1", appleId, "tx-credit-1")).toBe(100);
    expect(os.credits.balance("u-1", "ai")).toBe(100);
    expect(() => os.applyVerifiedConsumable("u-1", "com.reroom.ai.export.pack", "tx-bad")).toThrow(
      DomainError,
    );
  });

  it("verifies a notification before the atomic idempotent projection and permits failed retries", async () => {
    const os = new RevenueOSV13();
    const verifier = {
      verifyAndDecode: vi.fn(async (payload: string) => {
        if (payload === "bad") throw new Error("invalid signature");
        return notification;
      }),
    };
    const project = vi.fn(async () => undefined);
    await expect(os.processServerNotification("bad", verifier, project)).rejects.toThrow("invalid signature");
    expect(project).not.toHaveBeenCalled();
    expect(await os.processServerNotification("signed-jws", verifier, project)).toBe("applied");
    expect(await os.processServerNotification("signed-jws", verifier, project)).toBe("duplicate");
    expect(project).toHaveBeenCalledTimes(1);
  });

  it("does not mark a failed notification as applied, so delivery can retry", async () => {
    const os = new RevenueOSV13();
    const verifier = { verifyAndDecode: async () => notification };
    let attempt = 0;
    const project = async () => {
      attempt += 1;
      if (attempt === 1) throw new Error("temporary projection failure");
    };
    await expect(os.processServerNotification("signed", verifier, project)).rejects.toThrow(
      "temporary projection failure",
    );
    expect(await os.processServerNotification("signed", verifier, project)).toBe("applied");
    expect(attempt).toBe(2);
  });

  it("routes digital features to IAP while keeping furniture on the physical checkout path", () => {
    const os = new RevenueOSV13();
    expect(
      os.routePurchase({
        kind: "digital_in_app",
        productId: "com.reroom.ai.export.pack",
        feature: "export_pack",
      }),
    ).toBe("apple_iap");
    expect(() =>
      os.routePurchase({
        kind: "digital_in_app",
        productId: "com.reroom.ai.export.pack",
        feature: "commercial_use",
      }),
    ).toThrow(DomainError);
    expect(() =>
      os.routePurchase({ kind: "digital_in_app", productId: "unknown.product", feature: "export_pack" }),
    ).toThrow(DomainError);
    expect(os.routePurchase({ kind: "physical_good", sku: "sofa-001" })).toBe("physical_retail_checkout");
    expect(os.routePurchase({ kind: "person_to_person_service", serviceId: "designer-consult" })).toBe(
      "service_policy_review",
    );
  });

  it("composes tier transitions and reports available monthly and yearly products", () => {
    const os = new RevenueOSV13();
    const initial = os.createSubscription(subscription());
    const canceled = os.transitionSubscription(initial, { type: "cancel", at: 300 });
    const restored = os.transitionSubscription(canceled, { type: "reactivate", at: 350 });
    expect(restored.status).toBe("active");
    expect(
      os
        .products()
        .filter((product) => product.kind === "subscription")
        .map((product) => product.billingPeriod)
        .sort(),
    ).toEqual(["month", "month", "month", "year", "year", "year"]);
    expect(
      os.showPaywall("user-1", [], 100, { cooldownMs: 60, maxImpressions: 3, windowMs: 1_000 }).show,
    ).toBe(true);
    expect(os.experimentVariant("user-1", "paywall-copy", ["control", "short"])).toMatch(/^(control|short)$/);
  });
});
