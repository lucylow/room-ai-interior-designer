import {
  assignExperiment,
  canUseFeature,
  CreditLedger,
  DomainError,
  evaluatePaywall,
  type Feature,
  type PaywallDecision,
  type PaywallPolicy,
} from "../apple-monetization-v11/index.js";
import { ProductRegistry, TransactionLedger } from "../apple-monetization-v11/v12.js";
import {
  calculateSubscriptionAnalytics,
  type AnalyticsResult,
  type LifecycleEvent,
  type SubscriptionSnapshot,
} from "./analytics.js";
import {
  InMemoryNotificationEventStore,
  processAppleNotification,
  reconcileV13Entitlements,
  routeCommerceItem,
  v13FeatureAllowed,
  type AppleNotificationVerifier,
  type AuthoritativeEntitlementSnapshot,
  type CommerceItem,
  type CommerceRoute,
  type NotificationEventStore,
  type VerifiedAppleNotification,
} from "./integration.js";
import { OfferRedemptionLedger } from "./offers.js";
import {
  createV13Subscription,
  hasV13Entitlement,
  transitionV13Subscription,
  type V13Subscription,
  type V13Transition,
} from "./subscriptions.js";

export * from "./analytics.js";
export * from "./integration.js";
export * from "./offers.js";
export * from "./subscriptions.js";
export {
  buildRenewalDisclosure,
  minimizeTelemetry,
  redactSupportTransaction,
} from "../apple-monetization-v11/v12.js";
export type {
  MonetizationTelemetry,
  RenewalDisclosure,
  SafeSupportTransaction,
  TransactionState,
  VerifiedTransaction,
} from "../apple-monetization-v11/v12.js";

/**
 * Composes the V13 domain services. In-memory defaults are for demos/tests only;
 * production callers must inject a durable, atomic notification store and use server-verified inputs.
 */
export class RevenueOSV13 {
  readonly credits = new CreditLedger();
  readonly offers = new OfferRedemptionLedger();
  readonly transactions = new TransactionLedger();
  readonly notificationStore: NotificationEventStore;

  constructor(
    readonly catalog = new ProductRegistry(),
    notificationStore?: NotificationEventStore,
  ) {
    this.notificationStore = notificationStore ?? new InMemoryNotificationEventStore();
  }

  products() {
    return this.catalog.all();
  }

  createSubscription(subscription: V13Subscription): V13Subscription {
    return createV13Subscription(subscription);
  }

  transitionSubscription(subscription: V13Subscription, event: V13Transition): V13Subscription {
    return transitionV13Subscription(subscription, event);
  }

  reconcileAccess(
    subscriptions: readonly V13Subscription[],
    verifiedNonConsumableAppleProductIds: readonly string[],
    asOf: number,
  ): AuthoritativeEntitlementSnapshot {
    return reconcileV13Entitlements(subscriptions, verifiedNonConsumableAppleProductIds, asOf, this.catalog);
  }

  canUse(feature: Feature, snapshot: AuthoritativeEntitlementSnapshot, now: number): boolean {
    return v13FeatureAllowed(feature, snapshot, now);
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

  /** Call only from a trusted server after transaction verification and durable grant processing. */
  applyVerifiedConsumable(userId: string, appleProductId: string, transactionId: string): number {
    const product = this.catalog.getByAppleId(appleProductId);
    if (
      !product ||
      product.kind !== "consumable" ||
      !product.creditKind ||
      !product.credits ||
      !transactionId.trim()
    )
      throw new DomainError("invalid_input");
    return this.credits.grant(userId, product.creditKind, product.credits, `storekit:${transactionId}`);
  }

  hasSubscriptionAccess(subscription: V13Subscription, now: number): boolean {
    return hasV13Entitlement(subscription, now);
  }

  routePurchase(item: CommerceItem): CommerceRoute {
    if (item.kind === "digital_in_app") {
      const product = this.catalog.getByAppleId(item.productId);
      if (!product) throw new DomainError("invalid_input");
      if (product.feature && product.feature !== item.feature) throw new DomainError("invalid_input");
      if (product.tier && !canUseFeature(item.feature, { tier: product.tier, status: "active" }, 0))
        throw new DomainError("invalid_input");
      if (product.creditKind === "ai" && item.feature !== "ai_generation" && item.feature !== "ai_credits")
        throw new DomainError("invalid_input");
      if (product.creditKind === "render" && item.feature !== "hd_render")
        throw new DomainError("invalid_input");
    }
    return routeCommerceItem(item);
  }

  processServerNotification(
    signedPayload: string,
    verifier: AppleNotificationVerifier,
    project: (notification: VerifiedAppleNotification) => Promise<void>,
  ): Promise<"applied" | "duplicate"> {
    return processAppleNotification(signedPayload, verifier, this.notificationStore, project);
  }

  revenueAnalytics(
    snapshots: readonly SubscriptionSnapshot[],
    events: readonly LifecycleEvent[],
    options: Parameters<typeof calculateSubscriptionAnalytics>[2],
  ): AnalyticsResult {
    return calculateSubscriptionAnalytics(snapshots, events, options);
  }
}
