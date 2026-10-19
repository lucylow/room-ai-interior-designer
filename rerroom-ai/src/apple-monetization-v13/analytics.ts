/**
 * Deterministic product analytics for subscription snapshots and lifecycle events.
 * This is not Apple settlement, proceeds, tax, or finance reporting. Values remain
 * separated by ISO currency; never aggregate currencies without an explicit FX policy.
 * LTV is an assumption-based planning estimate (monthly recurring amount × assumed
 * customer lifetime in months), not a realized revenue or predictive valuation.
 */
export type BillingPeriod = "month" | "year";
export interface SubscriptionSnapshot {
  id: string;
  customerId: string;
  productId: string;
  currency: string;
  amountMinor: number;
  period: BillingPeriod;
  status: "active" | "grace" | "billing_retry" | "expired" | "revoked";
  capturedAt: number;
}
export type LifecycleType =
  | "started"
  | "renewed"
  | "cancelled"
  | "expired"
  | "reactivated"
  | "refund"
  | "offer_redeemed"
  | "offer_converted";
export interface LifecycleEvent {
  id: string;
  customerId: string;
  type: LifecycleType;
  occurredAt: number;
  currency?: string;
  amountMinor?: number;
  cohort?: string;
  offerId?: string;
}
export interface CurrencyMetrics {
  currency: string;
  mrrMinor: number;
  arrMinor: number;
  arpuMinor: number;
  activePayingCustomers: number;
  ltvEstimateMinor: number;
  ltvAssumptionMonths: number;
  refundsMinor: number;
  refundCount: number;
}
export interface AnalyticsResult {
  currencies: CurrencyMetrics[];
  counts: {
    starts: number;
    cancellations: number;
    expirations: number;
    reactivations: number;
    offerRedemptions: number;
    offerConversions: number;
  };
  retention: { eligibleAtStart: number; retainedAtEnd: number; rate: number };
  churn: { eligibleCustomers: number; churnedCustomers: number; rate: number };
  cohorts: Array<{ cohort: string; customers: number; retainedCustomers: number; retentionRate: number }>;
  offerConversions: Array<{ offerId: string; redemptions: number; conversions: number }>;
}
const invalid = (): never => {
  throw new TypeError("invalid_input");
};
const validId = (s: unknown): s is string => typeof s === "string" && s.trim().length > 0 && s.length <= 200;
const validCurrency = (s: unknown): s is string => typeof s === "string" && /^[A-Z]{3}$/.test(s);
const safe = (n: unknown): n is number => typeof n === "number" && Number.isSafeInteger(n) && n >= 0;
function validateSnapshot(s: SubscriptionSnapshot): void {
  if (
    !s ||
    !validId(s.id) ||
    !validId(s.customerId) ||
    !validId(s.productId) ||
    !validCurrency(s.currency) ||
    !safe(s.amountMinor) ||
    s.amountMinor === 0 ||
    !["month", "year"].includes(s.period) ||
    !["active", "grace", "billing_retry", "expired", "revoked"].includes(s.status) ||
    !safe(s.capturedAt)
  )
    invalid();
}
function validateEvent(e: LifecycleEvent): void {
  if (
    !e ||
    !validId(e.id) ||
    !validId(e.customerId) ||
    !safe(e.occurredAt) ||
    ![
      "started",
      "renewed",
      "cancelled",
      "expired",
      "reactivated",
      "refund",
      "offer_redeemed",
      "offer_converted",
    ].includes(e.type)
  )
    invalid();
  if (e.currency !== undefined && !validCurrency(e.currency)) invalid();
  if (e.amountMinor !== undefined && (!safe(e.amountMinor) || (e.type === "refund" && e.amountMinor === 0)))
    invalid();
  if (e.type === "refund" && (!e.currency || e.amountMinor === undefined)) invalid();
  if ((e.type === "offer_redeemed" || e.type === "offer_converted") && !validId(e.offerId)) invalid();
  if (e.cohort !== undefined && !validId(e.cohort)) invalid();
}
/** Computes point-in-time recurring metrics plus deduplicated lifecycle counts. */
export function calculateSubscriptionAnalytics(
  snapshots: readonly SubscriptionSnapshot[],
  events: readonly LifecycleEvent[],
  options: { asOf: number; cohortStart?: number; cohortEnd?: number; ltvAssumptionMonths?: number },
): AnalyticsResult {
  if (
    !Array.isArray(snapshots) ||
    !Array.isArray(events) ||
    !options ||
    !safe(options.asOf) ||
    (options.cohortStart !== undefined && !safe(options.cohortStart)) ||
    (options.cohortEnd !== undefined && !safe(options.cohortEnd)) ||
    (options.cohortStart !== undefined &&
      options.cohortEnd !== undefined &&
      options.cohortStart > options.cohortEnd) ||
    (options.ltvAssumptionMonths !== undefined &&
      (!safe(options.ltvAssumptionMonths) || options.ltvAssumptionMonths === 0))
  )
    invalid();
  const uniqueSnapshots = new Map<string, SubscriptionSnapshot>();
  for (const s of snapshots) {
    validateSnapshot(s);
    const prior = uniqueSnapshots.get(s.id);
    if (prior && JSON.stringify(prior) !== JSON.stringify(s)) invalid();
    uniqueSnapshots.set(s.id, s);
  }
  const uniqueEvents = new Map<string, LifecycleEvent>();
  for (const e of events) {
    validateEvent(e);
    const prior = uniqueEvents.get(e.id);
    if (prior && JSON.stringify(prior) !== JSON.stringify(e)) invalid();
    uniqueEvents.set(e.id, e);
  }
  const byCurrency = new Map<
    string,
    { mrr: number; customers: Set<string>; refunds: number; refundCount: number }
  >();
  for (const s of uniqueSnapshots.values()) {
    if (!(s.status === "active" || s.status === "grace") || s.capturedAt > options.asOf) continue;
    const amount = s.period === "year" ? Math.floor(s.amountMinor / 12) : s.amountMinor;
    const b = byCurrency.get(s.currency) ?? {
      mrr: 0,
      customers: new Set<string>(),
      refunds: 0,
      refundCount: 0,
    };
    b.mrr += amount;
    if (!Number.isSafeInteger(b.mrr)) invalid();
    b.customers.add(s.customerId);
    byCurrency.set(s.currency, b);
  }
  for (const e of uniqueEvents.values())
    if (e.type === "refund" && e.occurredAt <= options.asOf) {
      const b = byCurrency.get(e.currency!) ?? {
        mrr: 0,
        customers: new Set<string>(),
        refunds: 0,
        refundCount: 0,
      };
      b.refunds += e.amountMinor!;
      if (!Number.isSafeInteger(b.refunds)) invalid();
      b.refundCount++;
      byCurrency.set(e.currency!, b);
    }
  const months = options.ltvAssumptionMonths ?? 12;
  const currencies = [...byCurrency.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([currency, b]) => {
      const arpu = b.customers.size ? Math.floor(b.mrr / b.customers.size) : 0;
      return {
        currency,
        mrrMinor: b.mrr,
        arrMinor: b.mrr * 12,
        arpuMinor: arpu,
        activePayingCustomers: b.customers.size,
        ltvEstimateMinor: arpu * months,
        ltvAssumptionMonths: months,
        refundsMinor: b.refunds,
        refundCount: b.refundCount,
      };
    });
  if (currencies.some((c) => !Number.isSafeInteger(c.arrMinor) || !Number.isSafeInteger(c.ltvEstimateMinor)))
    invalid();
  const es = [...uniqueEvents.values()].filter((e) => e.occurredAt <= options.asOf);
  const count = (type: LifecycleType) => es.filter((e) => e.type === type).length;
  const eligible = es.filter(
    (e) =>
      e.type === "started" &&
      (options.cohortStart === undefined || e.occurredAt >= options.cohortStart) &&
      (options.cohortEnd === undefined || e.occurredAt <= options.cohortEnd),
  );
  const startedAt = new Map<string, number>();
  for (const e of eligible)
    startedAt.set(e.customerId, Math.min(startedAt.get(e.customerId) ?? e.occurredAt, e.occurredAt));
  const renewalAt = new Map<string, number>();
  for (const e of es)
    if (e.type === "renewed" || e.type === "reactivated")
      renewalAt.set(e.customerId, Math.max(renewalAt.get(e.customerId) ?? -1, e.occurredAt));
  const activeSnapshotAt = new Map<string, number>();
  for (const snapshot of uniqueSnapshots.values())
    if ((snapshot.status === "active" || snapshot.status === "grace") && snapshot.capturedAt <= options.asOf)
      activeSnapshotAt.set(
        snapshot.customerId,
        Math.max(activeSnapshotAt.get(snapshot.customerId) ?? -1, snapshot.capturedAt),
      );
  const isRetained = (customerId: string, start: number): boolean =>
    (renewalAt.get(customerId) ?? -1) > start || (activeSnapshotAt.get(customerId) ?? -1) >= start;
  const churnSignal = new Map<string, number>();
  for (const e of es)
    if (e.type === "expired")
      churnSignal.set(e.customerId, Math.max(churnSignal.get(e.customerId) ?? -1, e.occurredAt));
  const churned = [...startedAt.entries()].filter(
    ([customerId, start]) => !isRetained(customerId, start) && (churnSignal.get(customerId) ?? -1) >= start,
  ).length;
  const cohortMap = new Map<string, Map<string, number>>();
  for (const e of es)
    if (e.type === "started" && e.cohort) {
      const customers = cohortMap.get(e.cohort) ?? new Map<string, number>();
      customers.set(e.customerId, Math.min(customers.get(e.customerId) ?? e.occurredAt, e.occurredAt));
      cohortMap.set(e.cohort, customers);
    }
  const cohorts = [...cohortMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cohort, customers]) => {
      const retainedCustomers = [...customers.entries()].filter(([id, start]) =>
        isRetained(id, start),
      ).length;
      return {
        cohort,
        customers: customers.size,
        retainedCustomers,
        retentionRate: customers.size ? retainedCustomers / customers.size : 0,
      };
    });
  const offers = new Map<string, { redemptions: number; conversions: number }>();
  for (const e of es)
    if (e.type === "offer_redeemed" || e.type === "offer_converted") {
      const x = offers.get(e.offerId!) ?? { redemptions: 0, conversions: 0 };
      if (e.type === "offer_redeemed") x.redemptions++;
      else x.conversions++;
      offers.set(e.offerId!, x);
    }
  const eligibleIds = new Set(startedAt.keys());
  const retainedEligible = [...startedAt.entries()].filter(([customerId, start]) =>
    isRetained(customerId, start),
  ).length;
  return {
    currencies,
    counts: {
      starts: count("started"),
      cancellations: count("cancelled"),
      expirations: count("expired"),
      reactivations: count("reactivated"),
      offerRedemptions: count("offer_redeemed"),
      offerConversions: count("offer_converted"),
    },
    retention: {
      eligibleAtStart: eligibleIds.size,
      retainedAtEnd: retainedEligible,
      rate: eligibleIds.size ? retainedEligible / eligibleIds.size : 0,
    },
    churn: {
      eligibleCustomers: eligibleIds.size,
      churnedCustomers: churned,
      rate: eligibleIds.size ? churned / eligibleIds.size : 0,
    },
    cohorts,
    offerConversions: [...offers.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([offerId, x]) => ({ offerId, ...x })),
  };
}
