import type { BillingPeriod, Tier } from "../apple-monetization-v11/index.js";

export type V13PlanTier = Exclude<Tier, "free">;
export type V13BillingPeriod = BillingPeriod;
export type V13SubscriptionStatus = "active" | "grace" | "billing_retry" | "canceled" | "expired" | "revoked";

export interface V13Plan {
  readonly tier: V13PlanTier;
  readonly period: V13BillingPeriod;
}

export interface V13Subscription {
  readonly id: string;
  readonly plan: V13Plan;
  readonly status: V13SubscriptionStatus;
  readonly startedAt: number;
  /** End of the paid period; access is valid strictly before this timestamp unless grace applies. */
  readonly periodEndsAt: number;
  /** Verified grace-period boundary, which can extend access beyond periodEndsAt. */
  readonly graceEndsAt?: number | undefined;
  readonly autoRenew: boolean;
  readonly pendingPlan?: V13Plan | undefined;
  readonly pendingPlanEffectiveAt?: number | undefined;
  readonly canceledAt?: number | undefined;
  readonly revokedAt?: number | undefined;
}

export type V13SubscriptionErrorCode = "invalid_input" | "invalid_transition" | "invalid_effective_date";
export class V13SubscriptionError extends Error {
  constructor(readonly code: V13SubscriptionErrorCode) {
    super(code);
    this.name = "V13SubscriptionError";
  }
}

export type V13Transition =
  | { type: "payment_succeeded"; at: number; periodEndsAt: number }
  | { type: "enter_grace"; at: number; graceEndsAt: number }
  | { type: "enter_billing_retry"; at: number }
  | { type: "cancel"; at: number }
  | { type: "reactivate"; at: number }
  | { type: "expire"; at: number }
  | { type: "revoke"; at: number }
  | { type: "change_plan"; plan: V13Plan; effectiveAt: number; at: number }
  | { type: "apply_pending_plan"; at: number; periodEndsAt: number };

export type V13PlanChangeKind = "upgrade" | "downgrade" | "crossgrade" | "no_change";
const tiers: readonly V13PlanTier[] = ["plus", "pro", "studio"];
const periods: readonly V13BillingPeriod[] = ["month", "year"];
const statuses: readonly V13SubscriptionStatus[] = [
  "active",
  "grace",
  "billing_retry",
  "canceled",
  "expired",
  "revoked",
];
const timestamp = (value: unknown): value is number => Number.isSafeInteger(value) && (value as number) >= 0;
const validPlan = (value: unknown): value is V13Plan =>
  !!value &&
  typeof value === "object" &&
  tiers.includes((value as V13Plan).tier) &&
  periods.includes((value as V13Plan).period);
const tierRank: Record<V13PlanTier, number> = { plus: 1, pro: 2, studio: 3 };

export function classifyV13PlanChange(current: V13Plan, next: V13Plan): V13PlanChangeKind {
  if (!validPlan(current) || !validPlan(next)) throw new V13SubscriptionError("invalid_input");
  if (current.tier === next.tier && current.period === next.period) return "no_change";
  if (tierRank[next.tier] > tierRank[current.tier]) return "upgrade";
  if (tierRank[next.tier] < tierRank[current.tier]) return "downgrade";
  return "crossgrade";
}

function validate(subscription: V13Subscription): void {
  if (
    !subscription ||
    typeof subscription !== "object" ||
    typeof subscription.id !== "string" ||
    !subscription.id.trim() ||
    subscription.id.length > 200 ||
    !validPlan(subscription.plan) ||
    !statuses.includes(subscription.status) ||
    !timestamp(subscription.startedAt) ||
    !timestamp(subscription.periodEndsAt) ||
    subscription.periodEndsAt <= subscription.startedAt ||
    typeof subscription.autoRenew !== "boolean" ||
    (subscription.pendingPlan !== undefined &&
      (!validPlan(subscription.pendingPlan) ||
        !timestamp(subscription.pendingPlanEffectiveAt) ||
        subscription.pendingPlanEffectiveAt < subscription.startedAt)) ||
    (subscription.pendingPlan === undefined && subscription.pendingPlanEffectiveAt !== undefined) ||
    (subscription.graceEndsAt !== undefined &&
      (!timestamp(subscription.graceEndsAt) ||
        subscription.graceEndsAt <= subscription.periodEndsAt ||
        (subscription.status !== "grace" && subscription.status !== "canceled"))) ||
    (subscription.status === "grace" && subscription.graceEndsAt === undefined) ||
    (subscription.canceledAt !== undefined &&
      (!timestamp(subscription.canceledAt) || subscription.canceledAt < subscription.startedAt)) ||
    (subscription.revokedAt !== undefined &&
      (!timestamp(subscription.revokedAt) || subscription.revokedAt < subscription.startedAt))
  ) {
    throw new V13SubscriptionError("invalid_input");
  }
}

function atTime(at: number): void {
  if (!timestamp(at)) throw new V13SubscriptionError("invalid_input");
}

function copy(subscription: V13Subscription, updates: Partial<V13Subscription>): V13Subscription {
  const next = { ...subscription, ...updates };
  validate(next);
  return next;
}

/** Construct from trusted transaction facts; this core does not infer prices or renewal dates. */
export function createV13Subscription(input: V13Subscription): V13Subscription {
  validate(input);
  return {
    ...input,
    plan: { ...input.plan },
    ...(input.pendingPlan ? { pendingPlan: { ...input.pendingPlan } } : {}),
  };
}

/** Effective access boundary from the canonical subscription snapshot. */
export function v13EntitlementEndsAt(subscription: V13Subscription): number {
  validate(subscription);
  if (
    subscription.status === "grace" ||
    (subscription.status === "canceled" && subscription.graceEndsAt !== undefined)
  ) {
    return subscription.graceEndsAt!;
  }
  return subscription.periodEndsAt;
}

/** Pure transition function; persist its output transactionally and serialize concurrent updates. */
export function transitionV13Subscription(current: V13Subscription, event: V13Transition): V13Subscription {
  validate(current);
  if (!event || typeof event !== "object" || typeof event.type !== "string")
    throw new V13SubscriptionError("invalid_input");
  atTime(event.at);
  const { status } = current;

  switch (event.type) {
    case "payment_succeeded":
      if (
        !(status === "active" || status === "grace" || status === "billing_retry") ||
        !timestamp(event.periodEndsAt) ||
        event.periodEndsAt <= event.at ||
        event.at < current.startedAt
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      return copy(current, {
        status: "active",
        periodEndsAt: event.periodEndsAt,
        graceEndsAt: undefined,
        autoRenew: true,
        canceledAt: undefined,
      });

    case "enter_grace":
      if (
        status !== "active" ||
        event.at < current.periodEndsAt ||
        event.at < current.startedAt ||
        !timestamp(event.graceEndsAt) ||
        event.graceEndsAt <= event.at ||
        event.graceEndsAt <= current.periodEndsAt
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      return copy(current, { status: "grace", graceEndsAt: event.graceEndsAt });

    case "enter_billing_retry": {
      const accessEnd = status === "grace" ? current.graceEndsAt! : current.periodEndsAt;
      if (
        !(status === "active" || status === "grace") ||
        event.at < current.startedAt ||
        event.at < accessEnd
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      return copy(current, { status: "billing_retry", graceEndsAt: undefined });
    }

    case "cancel": {
      const allowed = status === "active" || status === "grace" || status === "billing_retry";
      const accessEnd = status === "grace" ? current.graceEndsAt! : current.periodEndsAt;
      if (
        !allowed ||
        event.at < current.startedAt ||
        ((status === "active" || status === "grace") && event.at >= accessEnd)
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      return copy(current, {
        status: "canceled",
        autoRenew: false,
        canceledAt: event.at,
        ...(status === "grace" ? {} : { graceEndsAt: undefined }),
        pendingPlan: undefined,
        pendingPlanEffectiveAt: undefined,
      });
    }

    case "reactivate": {
      const accessEnd = v13EntitlementEndsAt(current);
      if (
        status !== "canceled" ||
        event.at >= accessEnd ||
        event.at < (current.canceledAt ?? current.startedAt)
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      const stillInGrace = current.graceEndsAt !== undefined && event.at >= current.periodEndsAt;
      return copy(current, {
        status: stillInGrace ? "grace" : "active",
        autoRenew: true,
        canceledAt: undefined,
        ...(!stillInGrace ? { graceEndsAt: undefined } : {}),
      });
    }

    case "expire":
      if (
        !(status === "active" || status === "grace" || status === "billing_retry" || status === "canceled") ||
        event.at < v13EntitlementEndsAt(current)
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      return copy(current, {
        status: "expired",
        autoRenew: false,
        graceEndsAt: undefined,
        pendingPlan: undefined,
        pendingPlanEffectiveAt: undefined,
      });

    case "revoke":
      if (status === "expired" || status === "revoked" || event.at < current.startedAt)
        throw new V13SubscriptionError("invalid_transition");
      return copy(current, {
        status: "revoked",
        autoRenew: false,
        graceEndsAt: undefined,
        revokedAt: event.at,
        pendingPlan: undefined,
        pendingPlanEffectiveAt: undefined,
      });

    case "change_plan":
      if (status !== "active" || !validPlan(event.plan)) throw new V13SubscriptionError("invalid_transition");
      if (!timestamp(event.effectiveAt) || event.effectiveAt <= event.at || event.at >= current.periodEndsAt)
        throw new V13SubscriptionError("invalid_effective_date");
      if (classifyV13PlanChange(current.plan, event.plan) === "no_change")
        throw new V13SubscriptionError("invalid_transition");
      return copy(current, { pendingPlan: { ...event.plan }, pendingPlanEffectiveAt: event.effectiveAt });

    case "apply_pending_plan":
      if (
        !(status === "active" || status === "grace") ||
        !current.pendingPlan ||
        current.pendingPlanEffectiveAt === undefined ||
        event.at < current.pendingPlanEffectiveAt ||
        !timestamp(event.periodEndsAt) ||
        event.periodEndsAt <= event.at
      ) {
        throw new V13SubscriptionError("invalid_transition");
      }
      return copy(current, {
        plan: current.pendingPlan,
        periodEndsAt: event.periodEndsAt,
        graceEndsAt: undefined,
        pendingPlan: undefined,
        pendingPlanEffectiveAt: undefined,
      });

    default:
      throw new V13SubscriptionError("invalid_input");
  }
}

/** Subscription entitlement ends strictly before this boundary; retry-only state has no access. */
export function hasV13Entitlement(subscription: V13Subscription, now: number): boolean {
  validate(subscription);
  atTime(now);
  return (
    (subscription.status === "active" ||
      subscription.status === "grace" ||
      subscription.status === "canceled") &&
    now >= subscription.startedAt &&
    now < v13EntitlementEndsAt(subscription)
  );
}
