export type OfferKind = "intro" | "promo" | "win_back" | "offer_code";
export type SubscriptionStatus = "active" | "grace" | "expired" | "revoked" | "none";

export interface SubscriptionContext {
  status: SubscriptionStatus;
  productId?: string;
  expiresAt?: number;
  history: Array<{ productId: string; purchasedAt: number; status?: SubscriptionStatus }>;
}

export interface OfferDisclosure {
  productName: string;
  localizedPrice: string;
  billingPeriod: string;
  autoRenews: boolean;
  trial?: { duration: number; unit: string; renewalPrice: string; renewalPeriod: string };
  renewal?: { price: string; period: string };
  terms: string;
}

export interface Offer {
  id: string;
  kind: OfferKind;
  productId: string;
  startsAt: number;
  endsAt: number;
  maxPerUser?: number;
  totalLimit?: number;
  code?: string;
  disclosure: OfferDisclosure;
}

export interface RedeemRequest {
  offerId: string;
  userId: string;
  productId: string;
  idempotencyKey: string;
  now: number;
  subscription: SubscriptionContext;
  code?: string;
}

export interface Redemption {
  offerId: string;
  userId: string;
  productId: string;
  idempotencyKey: string;
  redeemedAt: number;
  disclosure: OfferDisclosure;
}

export class OfferError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "OfferError";
  }
}
const fail = (code: string): never => {
  throw new OfferError(code);
};
const nonempty = (s: unknown): s is string => typeof s === "string" && s.trim().length > 0;

export function validateOffer(offer: Offer): void {
  if (
    !offer ||
    !nonempty(offer.id) ||
    offer.id.length > 200 ||
    !nonempty(offer.productId) ||
    offer.productId.length > 200 ||
    !Number.isSafeInteger(offer.startsAt) ||
    offer.startsAt < 0 ||
    !Number.isSafeInteger(offer.endsAt) ||
    offer.endsAt <= offer.startsAt
  )
    fail("invalid_offer");
  if (!["intro", "promo", "win_back", "offer_code"].includes(offer.kind)) fail("invalid_offer");
  if (
    (offer.maxPerUser !== undefined && (!Number.isSafeInteger(offer.maxPerUser) || offer.maxPerUser < 1)) ||
    (offer.totalLimit !== undefined && (!Number.isSafeInteger(offer.totalLimit) || offer.totalLimit < 1))
  )
    fail("invalid_offer");
  const d = offer.disclosure;
  if (
    !d ||
    !nonempty(d.productName) ||
    !nonempty(d.localizedPrice) ||
    !nonempty(d.billingPeriod) ||
    !nonempty(d.terms) ||
    typeof d.autoRenews !== "boolean"
  )
    fail("invalid_disclosure");
  if (d.autoRenews && !d.renewal && !d.trial) fail("invalid_disclosure");
  if (d.renewal && (!nonempty(d.renewal.price) || !nonempty(d.renewal.period))) fail("invalid_disclosure");
  if (
    d.trial &&
    (!Number.isFinite(d.trial.duration) ||
      d.trial.duration <= 0 ||
      !nonempty(d.trial.unit) ||
      !nonempty(d.trial.renewalPrice) ||
      !nonempty(d.trial.renewalPeriod))
  )
    fail("invalid_disclosure");
  if (offer.kind === "offer_code" && !nonempty(offer.code)) fail("invalid_offer");
}

export function eligibilityReason(offer: Offer, request: RedeemRequest): string | undefined {
  validateOffer(offer);
  if (
    !request ||
    !nonempty(request.userId) ||
    request.userId.length > 200 ||
    !nonempty(request.idempotencyKey) ||
    request.idempotencyKey.length > 200 ||
    !Number.isSafeInteger(request.now) ||
    request.now < 0 ||
    !nonempty(request.productId) ||
    !request.subscription ||
    !["active", "grace", "expired", "revoked", "none"].includes(request.subscription.status) ||
    !Array.isArray(request.subscription.history)
  )
    return "invalid_request";
  if (
    request.subscription.expiresAt !== undefined &&
    (!Number.isSafeInteger(request.subscription.expiresAt) || request.subscription.expiresAt < 0)
  )
    return "invalid_request";
  if (
    request.subscription.history.some(
      (item) =>
        !item ||
        !nonempty(item.productId) ||
        !Number.isSafeInteger(item.purchasedAt) ||
        item.purchasedAt < 0 ||
        (item.status !== undefined &&
          !["active", "grace", "expired", "revoked", "none"].includes(item.status)),
    )
  )
    return "invalid_request";
  if (request.offerId !== offer.id) return "offer_not_found";
  if (request.productId !== offer.productId) return "product_mismatch";
  if (request.now < offer.startsAt) return "not_started";
  if (request.now >= offer.endsAt) return "offer_expired";
  const sub = request.subscription;
  if (
    sub.expiresAt !== undefined &&
    (!Number.isFinite(sub.expiresAt) || sub.expiresAt <= request.now) &&
    (sub.status === "active" || sub.status === "grace")
  )
    return "subscription_expired";
  const active =
    (sub.status === "active" || sub.status === "grace") &&
    (sub.expiresAt === undefined || sub.expiresAt > request.now);
  const history = sub.history;
  if (offer.kind === "intro" && (active || history.length > 0)) return "subscription_history_ineligible";
  if (offer.kind === "promo" && sub.status === "revoked") return "subscription_ineligible";
  if (
    offer.kind === "win_back" &&
    (active || (sub.status !== "expired" && !history.some((h) => h.status === "expired")))
  )
    return "subscription_history_ineligible";
  if (offer.kind === "offer_code" && request.code !== offer.code) return "invalid_code";
  return undefined;
}

/** In-memory local policy ledger only; it does not validate StoreKit signatures or authorize App Store offers. */
export class OfferRedemptionLedger {
  private offers = new Map<string, Offer>();
  private redemptions: Redemption[] = [];
  private byKey = new Map<string, { fingerprint: string; redemption: Redemption }>();

  addOffer(offer: Offer): void {
    validateOffer(offer);
    if (this.offers.has(offer.id)) fail("offer_exists");
    this.offers.set(offer.id, structuredClone(offer));
  }

  redeem(request: RedeemRequest): Redemption {
    if (!request || !nonempty(request.userId) || !nonempty(request.idempotencyKey)) fail("invalid_request");
    const key = `${request.userId}\u0000${request.idempotencyKey}`;
    const prior = this.byKey.get(key);
    if (prior) {
      const fingerprint = JSON.stringify([request.offerId, request.productId, request.code ?? null]);
      if (prior.fingerprint === fingerprint) return structuredClone(prior.redemption);
      fail("idempotency_conflict");
    }
    const offer = this.offers.get(request.offerId);
    if (!offer) throw new OfferError("offer_not_found");
    const reason = eligibilityReason(offer, request);
    if (reason) fail(reason);
    const userCount = this.redemptions.filter(
      (r) => r.offerId === offer.id && r.userId === request.userId,
    ).length;
    if (userCount >= (offer.maxPerUser ?? 1)) fail("user_limit_reached");
    const totalCount = this.redemptions.filter((r) => r.offerId === offer.id).length;
    if (offer.totalLimit !== undefined && totalCount >= offer.totalLimit) fail("total_limit_reached");
    const result: Redemption = {
      offerId: offer.id,
      userId: request.userId,
      productId: request.productId,
      idempotencyKey: request.idempotencyKey,
      redeemedAt: request.now,
      disclosure: structuredClone(offer.disclosure),
    };
    this.redemptions.push(result);
    this.byKey.set(key, {
      fingerprint: JSON.stringify([request.offerId, request.productId, request.code ?? null]),
      redemption: result,
    });
    return structuredClone(result);
  }

  list(): Redemption[] {
    return structuredClone(this.redemptions);
  }
}
