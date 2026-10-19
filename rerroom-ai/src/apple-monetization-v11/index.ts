export type Tier = "free" | "plus" | "pro" | "studio";
export type CreditKind = "ai" | "render";
export type SubscriptionStatus = "active" | "grace" | "billing_retry" | "expired" | "revoked";
export type Feature =
  | "ai_generation"
  | "ai_credits"
  | "unlimited_projects"
  | "advanced_ai"
  | "hd_render"
  | "commercial_use"
  | "3dgs_capture"
  | "cad_export"
  | "bim_export"
  | "unlimited_variations"
  | "priority_render"
  | "design_history"
  | "cloud_backup"
  | "team_collaboration"
  | "material_estimator"
  | "virtual_tour"
  | "export_pack"
  | "pro_templates"
  | "design_compare"
  | "room_measurements"
  | "advanced_lighting"
  | "presentation_mode"
  | "brand_removal"
  | "batch_generation";
export type ProductKind = "subscription" | "consumable" | "non_consumable";
export type BillingPeriod = "month" | "year";

export interface MonetizationProduct {
  id: string;
  appleProductId: string;
  kind: ProductKind;
  displayName: string;
  tier?: Exclude<Tier, "free">;
  billingPeriod?: BillingPeriod;
  creditKind?: CreditKind;
  credits?: number;
  feature?: Feature;
}

export interface Entitlement {
  tier: Tier;
  status: SubscriptionStatus;
  expiresAt?: number;
  features?: readonly Feature[];
}

export interface CreditReservation {
  id: string;
  userId: string;
  kind: CreditKind;
  amount: number;
  status: "reserved" | "committed" | "released";
  createdAt: number;
}

export interface CreditAccount {
  balance: number;
  reservations: Map<string, CreditReservation>;
  operations: Map<string, { fingerprint: string; balance: number }>;
}

export class DomainError extends Error {
  constructor(
    readonly code: "invalid_input" | "insufficient_credits" | "idempotency_conflict" | "invalid_transition",
  ) {
    super(code);
    this.name = "DomainError";
  }
}

const validId = (value: string): boolean => value.trim().length > 0 && value.length <= 200;
const validAmount = (value: number): boolean => Number.isSafeInteger(value) && value > 0;

/** A local, deterministic ledger. Production balances must be persisted and serialized server-side. */
export class CreditLedger {
  private readonly accounts = new Map<string, CreditAccount>();

  balance(userId: string, kind: CreditKind): number {
    return this.account(userId, kind).balance;
  }

  grant(userId: string, kind: CreditKind, amount: number, reference: string): number {
    this.validate(userId, amount, reference);
    return this.apply(userId, kind, `grant:${reference}`, amount);
  }

  reserve(
    userId: string,
    kind: CreditKind,
    amount: number,
    reservationId: string,
    now = Date.now(),
  ): CreditReservation {
    this.validate(userId, amount, reservationId);
    if (!Number.isSafeInteger(now) || now < 0) throw new DomainError("invalid_input");
    const account = this.account(userId, kind);
    const previous = account.reservations.get(reservationId);
    if (previous) {
      if (previous.amount !== amount || previous.userId !== userId || previous.kind !== kind)
        throw new DomainError("idempotency_conflict");
      return { ...previous };
    }
    const reserved = [...account.reservations.values()]
      .filter((item) => item.status === "reserved")
      .reduce((sum, item) => sum + item.amount, 0);
    if (account.balance - reserved < amount) throw new DomainError("insufficient_credits");
    const reservation: CreditReservation = {
      id: reservationId,
      userId,
      kind,
      amount,
      status: "reserved",
      createdAt: now,
    };
    account.reservations.set(reservationId, reservation);
    return { ...reservation };
  }

  commit(userId: string, kind: CreditKind, reservationId: string): CreditReservation {
    return this.finishReservation(userId, kind, reservationId, "committed");
  }

  release(userId: string, kind: CreditKind, reservationId: string): CreditReservation {
    return this.finishReservation(userId, kind, reservationId, "released");
  }

  refund(userId: string, kind: CreditKind, amount: number, reference: string): number {
    this.validate(userId, amount, reference);
    return this.apply(userId, kind, `refund:${reference}`, amount);
  }

  private finishReservation(
    userId: string,
    kind: CreditKind,
    id: string,
    next: "committed" | "released",
  ): CreditReservation {
    if (!validId(userId) || !validId(id)) throw new DomainError("invalid_input");
    const item = this.account(userId, kind).reservations.get(id);
    if (!item) throw new DomainError("invalid_input");
    if (item.status === next) return { ...item };
    if (item.status !== "reserved") throw new DomainError("invalid_transition");
    const account = this.account(userId, kind);
    if (next === "committed") {
      if (account.balance < item.amount) throw new DomainError("insufficient_credits");
      account.balance -= item.amount;
    }
    item.status = next;
    return { ...item };
  }

  private apply(userId: string, kind: CreditKind, operationId: string, delta: number): number {
    const account = this.account(userId, kind);
    const fingerprint = `${kind}:${delta}`;
    const existing = account.operations.get(operationId);
    if (existing) {
      if (existing.fingerprint !== fingerprint) throw new DomainError("idempotency_conflict");
      return existing.balance;
    }
    const next = account.balance + delta;
    if (!Number.isSafeInteger(next) || next < 0) throw new DomainError("insufficient_credits");
    account.balance = next;
    account.operations.set(operationId, { fingerprint, balance: next });
    return next;
  }

  private account(userId: string, kind: CreditKind): CreditAccount {
    if (!validId(userId) || (kind !== "ai" && kind !== "render")) throw new DomainError("invalid_input");
    const key = `${userId}\u0000${kind}`;
    let account = this.accounts.get(key);
    if (!account) {
      account = { balance: 0, reservations: new Map(), operations: new Map() };
      this.accounts.set(key, account);
    }
    return account;
  }

  private validate(userId: string, amount: number, reference: string): void {
    if (!validId(userId) || !validAmount(amount) || !validId(reference))
      throw new DomainError("invalid_input");
  }
}

const tierRank: Record<Tier, number> = { free: 0, plus: 1, pro: 2, studio: 3 };
const minimumTier: Record<Feature, Tier> = {
  ai_generation: "free",
  ai_credits: "plus",
  unlimited_projects: "plus",
  advanced_ai: "pro",
  hd_render: "pro",
  commercial_use: "studio",
  "3dgs_capture": "pro",
  cad_export: "pro",
  bim_export: "studio",
  unlimited_variations: "plus",
  priority_render: "studio",
  design_history: "plus",
  cloud_backup: "plus",
  team_collaboration: "studio",
  material_estimator: "plus",
  virtual_tour: "studio",
  export_pack: "studio",
  pro_templates: "plus",
  design_compare: "pro",
  room_measurements: "plus",
  advanced_lighting: "pro",
  presentation_mode: "pro",
  brand_removal: "studio",
  batch_generation: "studio",
};

export function canUseFeature(feature: Feature, entitlement: Entitlement, now = Date.now()): boolean {
  if (!Object.hasOwn(minimumTier, feature) || !Number.isSafeInteger(now)) return false;
  const tier = entitlement.tier;
  if (
    !Object.hasOwn(tierRank, tier) ||
    !["active", "grace", "billing_retry", "expired", "revoked"].includes(entitlement.status)
  )
    return false;
  if (entitlement.status === "revoked" || entitlement.status === "expired") return false;
  if (
    entitlement.expiresAt !== undefined &&
    (!Number.isFinite(entitlement.expiresAt) || entitlement.expiresAt <= now)
  )
    return false;
  return tierRank[tier] >= tierRank[minimumTier[feature]] || entitlement.features?.includes(feature) === true;
}

export interface PaywallPolicy {
  cooldownMs: number;
  maxImpressions: number;
  windowMs: number;
}
export interface PaywallDecision {
  show: boolean;
  reason: "eligible" | "cooldown" | "frequency_cap" | "invalid_context";
}

export function evaluatePaywall(
  userId: string,
  history: readonly number[],
  now: number,
  policy: PaywallPolicy,
): PaywallDecision {
  if (
    !validId(userId) ||
    !Number.isFinite(now) ||
    now < 0 ||
    !Number.isFinite(policy.cooldownMs) ||
    policy.cooldownMs < 0 ||
    !Number.isSafeInteger(policy.maxImpressions) ||
    policy.maxImpressions < 1 ||
    !Number.isFinite(policy.windowMs) ||
    policy.windowMs <= 0 ||
    history.some((t) => !Number.isFinite(t) || t > now)
  ) {
    return { show: false, reason: "invalid_context" };
  }
  const recent = history.filter((t) => now - t < policy.windowMs);
  if (recent.length >= policy.maxImpressions) return { show: false, reason: "frequency_cap" };
  if (recent.some((t) => now - t < policy.cooldownMs)) return { show: false, reason: "cooldown" };
  return { show: true, reason: "eligible" };
}

/** Stable FNV-1a bucket for repeatable experiment assignment; variant order is part of the experiment contract. */
export function assignExperiment(userId: string, experimentId: string, variants: readonly string[]): string {
  if (
    !validId(userId) ||
    !validId(experimentId) ||
    variants.length === 0 ||
    variants.some((v) => !validId(v)) ||
    new Set(variants).size !== variants.length
  )
    throw new DomainError("invalid_input");
  const input = `${experimentId}:${userId}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) hash = Math.imul(hash ^ input.charCodeAt(i), 0x01000193) >>> 0;
  return variants[hash % variants.length]!;
}

export type StoreNotificationStatus = "received" | "verified" | "applied" | "rejected";
export interface StoreNotification {
  id: string;
  status: StoreNotificationStatus;
  updatedAt: number;
}

/** Notification IDs enter the replay set only after signature verification succeeds. */
export class NotificationInbox {
  private readonly records = new Map<string, StoreNotification>();

  receive(id: string, signatureVerified: boolean, now = Date.now()): StoreNotification | undefined {
    if (!validId(id) || !Number.isFinite(now) || now < 0 || !signatureVerified || this.records.has(id))
      return undefined;
    const record: StoreNotification = { id, status: "verified", updatedAt: now };
    this.records.set(id, record);
    return { ...record };
  }

  transition(id: string, next: "applied" | "rejected", now = Date.now()): StoreNotification {
    const current = this.records.get(id);
    if (!current || !Number.isFinite(now) || now < current.updatedAt)
      throw new DomainError("invalid_transition");
    if (current.status === next) return { ...current };
    if (current.status !== "verified") throw new DomainError("invalid_transition");
    current.status = next;
    current.updatedAt = now;
    return { ...current };
  }
}

export interface RevenueEvent {
  id: string;
  userId: string;
  productId: string;
  kind: "purchase" | "refund";
  amountMinor: number;
  currency: string;
  createdAt: number;
}
export function netRevenueMinor(events: readonly RevenueEvent[], currency: string): number {
  if (!validId(currency)) throw new DomainError("invalid_input");
  let total = 0;
  const seen = new Set<string>();
  for (const event of events) {
    if (
      !validId(event.id) ||
      !validId(event.userId) ||
      !validId(event.productId) ||
      !Number.isSafeInteger(event.amountMinor) ||
      event.amountMinor < 0 ||
      !Number.isFinite(event.createdAt) ||
      (event.kind !== "purchase" && event.kind !== "refund")
    )
      throw new DomainError("invalid_input");
    if (event.currency !== currency || seen.has(event.id)) continue;
    seen.add(event.id);
    total += event.kind === "purchase" ? event.amountMinor : -event.amountMinor;
  }
  if (!Number.isSafeInteger(total)) throw new DomainError("invalid_input");
  return total;
}

export class RevenueOS {
  readonly credits = new CreditLedger();
  readonly notifications = new NotificationInbox();

  canUse(feature: Feature, entitlement: Entitlement, now = Date.now()): boolean {
    return canUseFeature(feature, entitlement, now);
  }

  showPaywall(
    userId: string,
    impressions: readonly number[],
    now: number,
    policy: PaywallPolicy,
  ): PaywallDecision {
    return evaluatePaywall(userId, impressions, now, policy);
  }

  experimentVariant(userId: string, experimentId: string, variants: readonly string[]): string {
    return assignExperiment(userId, experimentId, variants);
  }
}
