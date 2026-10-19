import { describe, expect, it } from "vitest";
import {
  assignExperiment,
  canUseFeature,
  CreditLedger,
  DomainError,
  evaluatePaywall,
  netRevenueMinor,
  NotificationInbox,
  RevenueOS,
} from "../apple-monetization-v11";
import {
  buildRenewalDisclosure,
  minimizeTelemetry,
  ProductRegistry,
  redactSupportTransaction,
  TransactionLedger,
} from "../apple-monetization-v11/v12";

const policy = { cooldownMs: 60_000, maxImpressions: 3, windowMs: 86_400_000 };

describe("V11 monetization domain", () => {
  it("reserves credits atomically and handles retries without duplicate debits", () => {
    const ledger = new CreditLedger();
    expect(ledger.grant("user-1", "ai", 10, "purchase-1")).toBe(10);
    expect(ledger.grant("user-1", "ai", 10, "purchase-1")).toBe(10);
    expect(ledger.reserve("user-1", "ai", 7, "generation-1", 100).status).toBe("reserved");
    expect(() => ledger.reserve("user-1", "ai", 4, "generation-2", 101)).toThrow(DomainError);
    expect(ledger.commit("user-1", "ai", "generation-1").status).toBe("committed");
    expect(ledger.commit("user-1", "ai", "generation-1").status).toBe("committed");
    expect(ledger.balance("user-1", "ai")).toBe(3);
    expect(() => ledger.grant("user-1", "ai", 11, "purchase-1")).toThrow("idempotency_conflict");
  });

  it("releases failed jobs and prevents reservation terminal-state reversal", () => {
    const ledger = new CreditLedger();
    ledger.grant("u", "render", 2, "pack");
    ledger.reserve("u", "render", 2, "render-1");
    expect(ledger.release("u", "render", "render-1").status).toBe("released");
    expect(ledger.balance("u", "render")).toBe(2);
    expect(() => ledger.commit("u", "render", "render-1")).toThrow("invalid_transition");
  });

  it("fails closed on revoked or expired entitlements and permits explicit grace access", () => {
    expect(canUseFeature("hd_render", { tier: "pro", status: "active" }, 10)).toBe(true);
    expect(canUseFeature("hd_render", { tier: "pro", status: "grace", expiresAt: 20 }, 10)).toBe(true);
    expect(canUseFeature("hd_render", { tier: "pro", status: "revoked" }, 10)).toBe(false);
    expect(canUseFeature("advanced_ai", { tier: "pro", status: "active", expiresAt: 10 }, 10)).toBe(false);
    expect(canUseFeature("hd_render", { tier: "free", status: "active", features: ["hd_render"] }, 10)).toBe(
      true,
    );
  });

  it("enforces paywall cooldown and frequency cap", () => {
    expect(evaluatePaywall("u", [], 100_000, policy)).toEqual({ show: true, reason: "eligible" });
    expect(evaluatePaywall("u", [90_000], 100_000, policy).reason).toBe("cooldown");
    expect(evaluatePaywall("u", [1_000, 2_000, 3_000], 100_000, policy).reason).toBe("frequency_cap");
    expect(evaluatePaywall("u", [101_000], 100_000, policy).reason).toBe("invalid_context");
  });

  it("assigns the same experiment variant for the same user and experiment", () => {
    expect(assignExperiment("user-42", "annual-paywall", ["control", "annual", "value"])).toBe(
      assignExperiment("user-42", "annual-paywall", ["control", "annual", "value"]),
    );
    expect(() => assignExperiment("u", "x", [])).toThrow("invalid_input");
  });

  it("does not poison replay protection with an unverified notification", () => {
    const inbox = new NotificationInbox();
    expect(inbox.receive("notification-1", false, 100)).toBeUndefined();
    expect(inbox.receive("notification-1", true, 101)?.status).toBe("verified");
    expect(inbox.receive("notification-1", true, 102)).toBeUndefined();
    expect(inbox.transition("notification-1", "applied", 103).status).toBe("applied");
    expect(() => inbox.transition("notification-1", "rejected", 104)).toThrow("invalid_transition");
  });

  it("deduplicates revenue event IDs and isolates storefront currencies", () => {
    const events = [
      {
        id: "p1",
        userId: "u",
        productId: "pro",
        kind: "purchase" as const,
        amountMinor: 1299,
        currency: "USD",
        createdAt: 1,
      },
      {
        id: "p1",
        userId: "u",
        productId: "pro",
        kind: "purchase" as const,
        amountMinor: 1299,
        currency: "USD",
        createdAt: 1,
      },
      {
        id: "r1",
        userId: "u",
        productId: "pro",
        kind: "refund" as const,
        amountMinor: 299,
        currency: "USD",
        createdAt: 2,
      },
      {
        id: "p2",
        userId: "u",
        productId: "plus",
        kind: "purchase" as const,
        amountMinor: 500,
        currency: "CAD",
        createdAt: 3,
      },
    ];
    expect(netRevenueMinor(events, "USD")).toBe(1000);
  });

  it("exposes coherent domain services through the Revenue OS facade", () => {
    const os = new RevenueOS();
    expect(os.canUse("commercial_use", { tier: "studio", status: "active" }, 1)).toBe(true);
    expect(os.experimentVariant("u", "e", ["a", "b"])).toMatch(/^(a|b)$/);
    expect(os.showPaywall("u", [], 1, policy).show).toBe(true);
  });

  it("registers subscription, consumable, and professional export products without fake prices", () => {
    const catalog = new ProductRegistry();
    expect(catalog.getByAppleId("com.reroom.ai.credits.100")?.credits).toBe(100);
    expect(catalog.get("professional-export-pack")?.feature).toBe("export_pack");
    expect(catalog.all().every((product) => !("priceDisplay" in product))).toBe(true);
  });

  it("requires StoreKit-localized recurring and trial renewal terms for a subscription disclosure", () => {
    const product = new ProductRegistry().get("pro-yearly")!;
    expect(buildRenewalDisclosure(product, "$119.99", { days: 7, renewalPrice: "$119.99/year" })).toEqual({
      productName: "RE:ROOM Pro Annual",
      localizedPrice: "$119.99",
      billingPeriod: "year",
      autoRenews: true,
      trial: { days: 7, renewalPrice: "$119.99/year", renewalPeriod: "year" },
    });
    expect(() => buildRenewalDisclosure(product, "")).toThrow("invalid_input");
    expect(() => buildRenewalDisclosure(product, "$1", { days: 0, renewalPrice: "$1" })).toThrow(
      "invalid_input",
    );
  });

  it("allowlists analytics fields and strips identifying or arbitrary metadata", () => {
    const safe = minimizeTelemetry({
      id: "evt-1",
      userId: "email@example.com",
      productId: "pro",
      kind: "purchase",
      amountMinor: 1299,
      currency: "USD",
      createdAt: 1000,
      metadata: { receipt: "secret-jws", email: "private" },
    } as never);
    expect(safe).toEqual({
      id: "evt-1",
      type: "purchase_completed",
      timestamp: new Date(1000).toISOString(),
      productId: "pro",
      amountMinor: 1299,
      currency: "USD",
    });
    expect(JSON.stringify(safe)).not.toContain("email");
    expect(JSON.stringify(safe)).not.toContain("secret-jws");
  });

  it("only accepts verified transaction records and deduplicates refund/revoke updates", () => {
    const ledger = new TransactionLedger();
    const purchase = {
      transactionId: "tx-1",
      originalTransactionId: "orig-1",
      productId: "com.reroom.pro.monthly",
      state: "purchased" as const,
      purchasedAt: 100,
      environment: "sandbox" as const,
    };
    expect(() => ledger.ingest(purchase, false)).toThrow("invalid_input");
    expect(ledger.ingest(purchase, true).state).toBe("purchased");
    expect(ledger.ingest(purchase, true).state).toBe("purchased");
    expect(ledger.current()).toHaveLength(1);
    expect(ledger.ingest({ ...purchase, state: "refunded" }, true).state).toBe("refunded");
    expect(ledger.current()).toHaveLength(0);
    expect(() => ledger.ingest(purchase, true)).toThrow("invalid_transition");
  });

  it("rejects immutable transaction replay conflicts and filters expired entitlements at the exact boundary", () => {
    const ledger = new TransactionLedger();
    const transaction = {
      transactionId: "expiring-1",
      originalTransactionId: "expiring-original",
      productId: "com.reroom.ai.pro.monthly",
      state: "purchased" as const,
      purchasedAt: 1,
      expiresAt: 10,
      environment: "sandbox" as const,
    };
    ledger.ingest(transaction, true);
    expect(ledger.current(9)).toHaveLength(1);
    expect(ledger.current(10)).toHaveLength(0);
    expect(() => ledger.ingest({ ...transaction, expiresAt: 11 }, true)).toThrow("idempotency_conflict");
  });

  it("redacts transaction and customer identifiers from support diagnostics", () => {
    const safe = redactSupportTransaction({
      transactionId: "tx-private",
      originalTransactionId: "orig-private",
      productId: "pro",
      state: "purchased",
      purchasedAt: 10,
      environment: "production",
    });
    expect(safe).toEqual({
      productId: "pro",
      state: "purchased",
      purchasedAt: 10,
      environment: "production",
    });
    expect(JSON.stringify(safe)).not.toContain("private");
  });
});
