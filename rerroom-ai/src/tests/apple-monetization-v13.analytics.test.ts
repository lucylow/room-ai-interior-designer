import { describe, expect, it } from "vitest";
import { calculateSubscriptionAnalytics } from "../apple-monetization-v13/analytics";

describe("v13 subscription analytics", () => {
  it("normalizes recurring values in minor units and computes currency-separated metrics", () => {
    const result = calculateSubscriptionAnalytics(
      [
        {
          id: "s1",
          customerId: "c1",
          productId: "monthly",
          currency: "USD",
          amountMinor: 1000,
          period: "month",
          status: "active",
          capturedAt: 5,
        },
        {
          id: "s2",
          customerId: "c2",
          productId: "annual",
          currency: "USD",
          amountMinor: 12000,
          period: "year",
          status: "grace",
          capturedAt: 5,
        },
        {
          id: "s3",
          customerId: "c2",
          productId: "other",
          currency: "EUR",
          amountMinor: 1200,
          period: "month",
          status: "active",
          capturedAt: 5,
        },
      ],
      [],
      { asOf: 10, ltvAssumptionMonths: 6 },
    );
    expect(result.currencies).toEqual([
      {
        currency: "EUR",
        mrrMinor: 1200,
        arrMinor: 14400,
        arpuMinor: 1200,
        activePayingCustomers: 1,
        ltvEstimateMinor: 7200,
        ltvAssumptionMonths: 6,
        refundsMinor: 0,
        refundCount: 0,
      },
      {
        currency: "USD",
        mrrMinor: 2000,
        arrMinor: 24000,
        arpuMinor: 1000,
        activePayingCustomers: 2,
        ltvEstimateMinor: 6000,
        ltvAssumptionMonths: 6,
        refundsMinor: 0,
        refundCount: 0,
      },
    ]);
  });
  it("deduplicates events and reports refunds separately, retention, cohorts and offers", () => {
    const events = [
      { id: "start", customerId: "c", type: "started" as const, occurredAt: 1, cohort: "jan" },
      { id: "again", customerId: "c", type: "started" as const, occurredAt: 1, cohort: "jan" },
      { id: "start-c2", customerId: "c2", type: "started" as const, occurredAt: 1, cohort: "jan" },
      { id: "renew", customerId: "c", type: "renewed" as const, occurredAt: 2 },
      { id: "expired-c2", customerId: "c2", type: "expired" as const, occurredAt: 3 },
      { id: "renew-before-start", customerId: "c3", type: "renewed" as const, occurredAt: 4 },
      { id: "start-c3", customerId: "c3", type: "started" as const, occurredAt: 5, cohort: "jan" },
      { id: "future-start", customerId: "c4", type: "started" as const, occurredAt: 11, cohort: "feb" },
      {
        id: "refund",
        customerId: "c",
        type: "refund" as const,
        occurredAt: 3,
        currency: "USD",
        amountMinor: 500,
      },
      {
        id: "future-refund",
        customerId: "c",
        type: "refund" as const,
        occurredAt: 11,
        currency: "USD",
        amountMinor: 10000,
      },
      { id: "redeem", customerId: "c", type: "offer_redeemed" as const, occurredAt: 4, offerId: "trial" },
      { id: "convert", customerId: "c", type: "offer_converted" as const, occurredAt: 5, offerId: "trial" },
    ];
    const result = calculateSubscriptionAnalytics([], events, { asOf: 10 });
    expect(result.counts.starts).toBe(4);
    expect(result.counts.expirations).toBe(1);
    expect(result.currencies[0]).toMatchObject({ currency: "USD", refundsMinor: 500, refundCount: 1 });
    expect(result.retention).toEqual({ eligibleAtStart: 3, retainedAtEnd: 1, rate: 1 / 3 });
    expect(result.churn).toEqual({ eligibleCustomers: 3, churnedCustomers: 1, rate: 1 / 3 });
    expect(result.cohorts).toEqual([
      { cohort: "jan", customers: 3, retainedCustomers: 1, retentionRate: 1 / 3 },
    ]);
    expect(result.offerConversions).toEqual([{ offerId: "trial", redemptions: 1, conversions: 1 }]);
  });
  it("rejects malformed input and conflicting duplicate IDs", () => {
    expect(() => calculateSubscriptionAnalytics([], [], { asOf: -1 })).toThrow("invalid_input");
    const base = {
      id: "s",
      customerId: "c",
      productId: "p",
      currency: "USD",
      amountMinor: 10,
      period: "month" as const,
      status: "active" as const,
      capturedAt: 1,
    };
    expect(() =>
      calculateSubscriptionAnalytics([base, { ...base, amountMinor: 11 }], [], { asOf: 2 }),
    ).toThrow("invalid_input");
    expect(() =>
      calculateSubscriptionAnalytics([], [{ id: "r", customerId: "c", type: "refund", occurredAt: 1 }], {
        asOf: 2,
      }),
    ).toThrow("invalid_input");
  });
});
