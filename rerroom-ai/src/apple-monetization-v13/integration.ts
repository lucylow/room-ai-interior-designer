import { canUseFeature, DomainError, type Feature, type Tier } from "../apple-monetization-v11/index.js";
import { ProductRegistry } from "../apple-monetization-v11/v12.js";
import {
  createV13Subscription,
  hasV13Entitlement,
  v13EntitlementEndsAt,
  type V13Subscription,
} from "./subscriptions.js";

export interface AuthoritativeEntitlementSnapshot {
  readonly tier: Tier;
  readonly features: readonly Feature[];
  readonly activeSubscriptionIds: readonly string[];
  readonly subscriptionTiers: readonly { tier: Exclude<Tier, "free">; expiresAt: number }[];
  readonly ownedNonConsumableProductIds: readonly string[];
  readonly asOf: number;
  readonly source: "server";
}
const tierRank: Record<Tier, number> = { free: 0, plus: 1, pro: 2, studio: 3 };

/** Resolve from server-verified inputs only. Do not populate these inputs from client claims. */
export function reconcileV13Entitlements(
  subscriptions: readonly V13Subscription[],
  verifiedNonConsumableAppleProductIds: readonly string[],
  asOf: number,
  catalog = new ProductRegistry(),
): AuthoritativeEntitlementSnapshot {
  if (!Number.isSafeInteger(asOf) || asOf < 0) throw new DomainError("invalid_input");
  const uniqueSubscriptions = new Map<string, V13Subscription>();
  for (const rawSubscription of subscriptions) {
    const subscription = createV13Subscription(rawSubscription);
    const prior = uniqueSubscriptions.get(subscription.id);
    if (prior && JSON.stringify(prior) !== JSON.stringify(subscription))
      throw new DomainError("idempotency_conflict");
    uniqueSubscriptions.set(subscription.id, subscription);
  }
  const active = [...uniqueSubscriptions.values()].filter((subscription) =>
    hasV13Entitlement(subscription, asOf),
  );
  let tier: Tier = "free";
  for (const subscription of active)
    if (tierRank[subscription.plan.tier] > tierRank[tier]) tier = subscription.plan.tier;
  const features = new Set<Feature>();
  const owned = new Set<string>();
  for (const appleProductId of verifiedNonConsumableAppleProductIds) {
    const product = catalog.getByAppleId(appleProductId);
    if (!product || product.kind !== "non_consumable" || !product.feature) continue;
    owned.add(product.appleProductId);
    features.add(product.feature);
  }
  return {
    tier,
    features: [...features].sort(),
    activeSubscriptionIds: active.map((subscription) => subscription.id).sort(),
    subscriptionTiers: active
      .map((subscription) => ({
        tier: subscription.plan.tier,
        expiresAt: v13EntitlementEndsAt(subscription),
      }))
      .sort((a, b) => tierRank[a.tier] - tierRank[b.tier] || a.expiresAt - b.expiresAt),
    ownedNonConsumableProductIds: [...owned].sort(),
    asOf,
    source: "server",
  };
}

export function v13FeatureAllowed(
  feature: Feature,
  snapshot: AuthoritativeEntitlementSnapshot,
  now: number,
): boolean {
  if (!snapshot || snapshot.source !== "server" || !Number.isSafeInteger(now) || now < snapshot.asOf)
    return false;
  const tier = snapshot.subscriptionTiers
    .filter((subscription) => now < subscription.expiresAt)
    .reduce<Tier>(
      (best, subscription) => (tierRank[subscription.tier] > tierRank[best] ? subscription.tier : best),
      "free",
    );
  return canUseFeature(
    feature,
    {
      tier,
      status: "active",
      features: snapshot.features,
    },
    now,
  );
}

export type AppleNotificationType =
  | "SUBSCRIBED"
  | "DID_RENEW"
  | "DID_FAIL_TO_RENEW"
  | "EXPIRED"
  | "REFUND"
  | "REVOKE"
  | "DID_CHANGE_RENEWAL_STATUS"
  | "DID_CHANGE_RENEWAL_PREF"
  | "OFFER_REDEEMED"
  | "ONE_TIME_CHARGE"
  | "PRICE_INCREASE";
export interface VerifiedAppleNotification {
  notificationUUID: string;
  notificationType: AppleNotificationType;
  signedDate: number;
  payloadFingerprint: string;
  productId?: string;
  transactionId?: string;
  originalTransactionId?: string;
  environment: "Sandbox" | "Production";
}

/** The production adapter must validate JWS certificate chain, bundle/app IDs, environment and signed dates. */
export interface AppleNotificationVerifier {
  verifyAndDecode(signedPayload: string): Promise<VerifiedAppleNotification>;
}
export interface NotificationEventStore {
  /** Must atomically deduplicate, run the projection once, and persist only after handler success. */
  processOnce(
    notification: VerifiedAppleNotification,
    handler: () => Promise<void>,
  ): Promise<"applied" | "duplicate">;
}

/** Test/demo-only store. Replace with a transactionally durable database implementation in production. */
export class InMemoryNotificationEventStore implements NotificationEventStore {
  private readonly applied = new Map<string, string>();
  private readonly inFlight = new Map<string, { fingerprint: string; work: Promise<void> }>();

  async processOnce(
    notification: VerifiedAppleNotification,
    handler: () => Promise<void>,
  ): Promise<"applied" | "duplicate"> {
    validateNotification(notification);
    const appliedFingerprint = this.applied.get(notification.notificationUUID);
    if (appliedFingerprint !== undefined) {
      if (appliedFingerprint !== notification.payloadFingerprint)
        throw new DomainError("idempotency_conflict");
      return "duplicate";
    }
    const pending = this.inFlight.get(notification.notificationUUID);
    if (pending) {
      if (pending.fingerprint !== notification.payloadFingerprint)
        throw new DomainError("idempotency_conflict");
      await pending.work;
      return "duplicate";
    }
    const work = handler();
    this.inFlight.set(notification.notificationUUID, { fingerprint: notification.payloadFingerprint, work });
    try {
      await work;
      this.applied.set(notification.notificationUUID, notification.payloadFingerprint);
      return "applied";
    } finally {
      this.inFlight.delete(notification.notificationUUID);
    }
  }
}

function validateNotification(notification: VerifiedAppleNotification): void {
  if (
    !notification ||
    typeof notification.notificationUUID !== "string" ||
    !notification.notificationUUID.trim() ||
    typeof notification.payloadFingerprint !== "string" ||
    !notification.payloadFingerprint.trim() ||
    !Number.isSafeInteger(notification.signedDate) ||
    notification.signedDate < 0 ||
    !["Sandbox", "Production"].includes(notification.environment) ||
    ![
      "SUBSCRIBED",
      "DID_RENEW",
      "DID_FAIL_TO_RENEW",
      "EXPIRED",
      "REFUND",
      "REVOKE",
      "DID_CHANGE_RENEWAL_STATUS",
      "DID_CHANGE_RENEWAL_PREF",
      "OFFER_REDEEMED",
      "ONE_TIME_CHARGE",
      "PRICE_INCREASE",
    ].includes(notification.notificationType)
  )
    throw new DomainError("invalid_input");
  if (notification.productId !== undefined && !notification.productId.trim())
    throw new DomainError("invalid_input");
  if (notification.transactionId !== undefined && !notification.transactionId.trim())
    throw new DomainError("invalid_input");
  if (notification.originalTransactionId !== undefined && !notification.originalTransactionId.trim())
    throw new DomainError("invalid_input");
}

export async function processAppleNotification(
  signedPayload: string,
  verifier: AppleNotificationVerifier,
  store: NotificationEventStore,
  project: (notification: VerifiedAppleNotification) => Promise<void>,
): Promise<"applied" | "duplicate"> {
  if (typeof signedPayload !== "string" || !signedPayload.trim()) throw new DomainError("invalid_input");
  const notification = await verifier.verifyAndDecode(signedPayload);
  validateNotification(notification);
  return store.processOnce(notification, () => project(notification));
}

export type CommerceItem =
  | { kind: "digital_in_app"; productId: string; feature: Feature }
  | { kind: "physical_good"; sku: string }
  | { kind: "person_to_person_service"; serviceId: string };
export type CommerceRoute = "apple_iap" | "physical_retail_checkout" | "service_policy_review";

/** Route by what the customer receives; physical furniture is never sent through digital IAP. */
export function routeCommerceItem(item: CommerceItem): CommerceRoute {
  if (!item || typeof item !== "object") throw new DomainError("invalid_input");
  switch (item.kind) {
    case "digital_in_app":
      if (!item.productId.trim() || !item.feature.trim()) throw new DomainError("invalid_input");
      return "apple_iap";
    case "physical_good":
      if (!item.sku.trim()) throw new DomainError("invalid_input");
      return "physical_retail_checkout";
    case "person_to_person_service":
      if (!item.serviceId.trim()) throw new DomainError("invalid_input");
      return "service_policy_review";
    default:
      throw new DomainError("invalid_input");
  }
}
