import { describe, expect, it } from "vitest";
import {
  classifyV13PlanChange,
  createV13Subscription,
  hasV13Entitlement,
  transitionV13Subscription,
  V13SubscriptionError,
  type V13Subscription,
} from "../apple-monetization-v13/subscriptions.js";

const base = (): V13Subscription =>
  createV13Subscription({
    id: "sub-1",
    plan: { tier: "plus", period: "month" },
    status: "active",
    startedAt: 100,
    periodEndsAt: 200,
    autoRenew: true,
  });
const transition = (s: V13Subscription, event: Parameters<typeof transitionV13Subscription>[1]) =>
  transitionV13Subscription(s, event);
const expectCode = (fn: () => unknown, code: string) => {
  try {
    fn();
    throw new Error("expected error");
  } catch (error) {
    expect(error).toBeInstanceOf(V13SubscriptionError);
    expect((error as V13SubscriptionError).code).toBe(code);
  }
};

describe("V13 subscription state machine", () => {
  it("accepts all Plus, Pro and Studio monthly and annual plans", () => {
    for (const tier of ["plus", "pro", "studio"] as const)
      for (const period of ["month", "year"] as const) {
        expect(createV13Subscription({ ...base(), plan: { tier, period } }).plan).toEqual({ tier, period });
      }
  });
  it("models grace, retry, renewal, cancellation, reactivation, expiry and revocation", () => {
    let s = transition(base(), { type: "enter_grace", at: 200, graceEndsAt: 230 });
    expect(hasV13Entitlement(s, 229)).toBe(true);
    expect(hasV13Entitlement(s, 230)).toBe(false);
    s = transition(s, { type: "enter_billing_retry", at: 230 });
    expect(hasV13Entitlement(s, 230)).toBe(false);
    s = transition(s, { type: "payment_succeeded", at: 240, periodEndsAt: 340 });
    expect(s.status).toBe("active");
    expect(s.periodEndsAt).toBe(340);
    s = transition(s, { type: "cancel", at: 250 });
    expect(s.status).toBe("canceled");
    expect(s.autoRenew).toBe(false);
    s = transition(s, { type: "reactivate", at: 260 });
    expect(s.status).toBe("active");
    s = transition(s, { type: "cancel", at: 270 });
    s = transition(s, { type: "expire", at: 340 });
    expect(s.status).toBe("expired");
    s = transition(base(), { type: "revoke", at: 301 });
    expect(s.status).toBe("revoked");
  });
  it("schedules upgrade, downgrade or crossgrade for caller-specified effective time, without proration assumptions", () => {
    for (const plan of [
      { tier: "pro", period: "month" },
      { tier: "plus", period: "year" },
      { tier: "studio", period: "year" },
    ] as const) {
      const pending = transition(base(), { type: "change_plan", plan, at: 120, effectiveAt: 240 });
      expect(pending.plan).toEqual(base().plan);
      expect(pending.pendingPlan).toEqual(plan);
      expect(pending.pendingPlanEffectiveAt).toBe(240);
      expect(transition(pending, { type: "apply_pending_plan", at: 240, periodEndsAt: 340 }).plan).toEqual(
        plan,
      );
    }
  });
  it("enforces legal transitions, effective dates, and deterministic time boundary semantics", () => {
    expect(hasV13Entitlement(base(), 99)).toBe(false);
    expect(hasV13Entitlement(base(), 199)).toBe(true);
    expect(hasV13Entitlement(base(), 200)).toBe(false);
    expect(hasV13Entitlement(transition(base(), { type: "cancel", at: 150 }), 199)).toBe(true);
    expect(hasV13Entitlement(transition(base(), { type: "cancel", at: 150 }), 200)).toBe(false);
    expectCode(() => transition(base(), { type: "reactivate", at: 150 }), "invalid_transition");
    expectCode(
      () =>
        transition(base(), {
          type: "change_plan",
          plan: { tier: "pro", period: "year" },
          at: 120,
          effectiveAt: 120,
        }),
      "invalid_effective_date",
    );
    expectCode(
      () =>
        transition(transition(base(), { type: "expire", at: 200 }), {
          type: "payment_succeeded",
          at: 210,
          periodEndsAt: 300,
        }),
      "invalid_transition",
    );
  });
  it("classifies tier and billing-period changes without estimating Apple proration or price", () => {
    expect(classifyV13PlanChange({ tier: "plus", period: "month" }, { tier: "pro", period: "month" })).toBe(
      "upgrade",
    );
    expect(classifyV13PlanChange({ tier: "studio", period: "year" }, { tier: "pro", period: "year" })).toBe(
      "downgrade",
    );
    expect(classifyV13PlanChange({ tier: "pro", period: "month" }, { tier: "pro", period: "year" })).toBe(
      "crossgrade",
    );
    expect(classifyV13PlanChange({ tier: "pro", period: "year" }, { tier: "pro", period: "year" })).toBe(
      "no_change",
    );
  });
  it("rejects malformed data and fractional or negative timestamps with stable codes", () => {
    expectCode(() => createV13Subscription({ ...base(), id: " " }), "invalid_input");
    expectCode(() => transition(base(), { type: "enter_grace", at: 100.5, graceEndsAt: 200 }), "invalid_input");
    expectCode(() => hasV13Entitlement(base(), -1), "invalid_input");
  });
});
