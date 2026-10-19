import {
  DomainError,
  type BillingPeriod,
  type Feature,
  type MonetizationProduct,
  type RevenueEvent,
} from "./index";

const V12_PRODUCTS: readonly MonetizationProduct[] = [
  {
    id: "plus-monthly",
    appleProductId: "com.reroom.ai.plus.monthly",
    kind: "subscription",
    displayName: "RE:ROOM Plus",
    tier: "plus",
    billingPeriod: "month",
  },
  {
    id: "plus-yearly",
    appleProductId: "com.reroom.ai.plus.yearly",
    kind: "subscription",
    displayName: "RE:ROOM Plus Annual",
    tier: "plus",
    billingPeriod: "year",
  },
  {
    id: "pro-monthly",
    appleProductId: "com.reroom.ai.pro.monthly",
    kind: "subscription",
    displayName: "RE:ROOM Pro",
    tier: "pro",
    billingPeriod: "month",
  },
  {
    id: "pro-yearly",
    appleProductId: "com.reroom.ai.pro.yearly",
    kind: "subscription",
    displayName: "RE:ROOM Pro Annual",
    tier: "pro",
    billingPeriod: "year",
  },
  {
    id: "studio-monthly",
    appleProductId: "com.reroom.ai.studio.monthly",
    kind: "subscription",
    displayName: "RE:ROOM Studio",
    tier: "studio",
    billingPeriod: "month",
  },
  {
    id: "studio-yearly",
    appleProductId: "com.reroom.ai.studio.yearly",
    kind: "subscription",
    displayName: "RE:ROOM Studio Annual",
    tier: "studio",
    billingPeriod: "year",
  },
  {
    id: "ai-credits-100",
    appleProductId: "com.reroom.ai.credits.100",
    kind: "consumable",
    displayName: "100 AI Credits",
    creditKind: "ai",
    credits: 100,
  },
  {
    id: "ai-credits-500",
    appleProductId: "com.reroom.ai.credits.500",
    kind: "consumable",
    displayName: "500 AI Credits",
    creditKind: "ai",
    credits: 500,
  },
  {
    id: "generation-credits-25",
    appleProductId: "com.reroom.ai.generation.credits.25",
    kind: "consumable",
    displayName: "25 AI Credits",
    creditKind: "ai",
    credits: 25,
  },
  {
    id: "hd-render-10",
    appleProductId: "com.reroom.ai.render.credits.10",
    kind: "consumable",
    displayName: "10 HD Renders",
    creditKind: "render",
    credits: 10,
  },
  {
    id: "hd-render-50",
    appleProductId: "com.reroom.ai.render.credits.50",
    kind: "consumable",
    displayName: "50 HD Renders",
    creditKind: "render",
    credits: 50,
  },
  {
    id: "professional-export-pack",
    appleProductId: "com.reroom.ai.export.pack",
    kind: "non_consumable",
    displayName: "Professional Export Pack",
    feature: "export_pack",
  },
  {
    id: "professional-templates",
    appleProductId: "com.reroom.ai.pro.templates",
    kind: "non_consumable",
    displayName: "Professional Templates",
    feature: "pro_templates",
  },
  {
    id: "cad-export-unlock",
    appleProductId: "com.reroom.ai.cad.export",
    kind: "non_consumable",
    displayName: "CAD Export",
    feature: "cad_export",
  },
  {
    id: "commercial-license",
    appleProductId: "com.reroom.ai.commercial",
    kind: "non_consumable",
    displayName: "Commercial License",
    feature: "commercial_use",
  },
  {
    id: "3dgs-capture-unlock",
    appleProductId: "com.reroom.ai.3dgs.capture.unlock",
    kind: "non_consumable",
    displayName: "3D Capture Tools",
    feature: "3dgs_capture",
  },
  {
    id: "virtual-tour-unlock",
    appleProductId: "com.reroom.ai.virtual.tour.unlock",
    kind: "non_consumable",
    displayName: "Virtual Tour Tools",
    feature: "virtual_tour",
  },
];

/** Product IDs and feature mappings are app configuration; localized prices always come from StoreKit. */
export class ProductRegistry {
  private readonly byId = new Map<string, MonetizationProduct>();
  private readonly byAppleId = new Map<string, MonetizationProduct>();

  constructor(products: readonly MonetizationProduct[] = V12_PRODUCTS) {
    for (const product of products) {
      if (
        !product ||
        typeof product.id !== "string" ||
        !product.id.trim() ||
        product.id.length > 200 ||
        typeof product.appleProductId !== "string" ||
        !product.appleProductId.trim() ||
        product.appleProductId.length > 200 ||
        typeof product.displayName !== "string" ||
        !product.displayName.trim() ||
        !["subscription", "consumable", "non_consumable"].includes(product.kind) ||
        this.byId.has(product.id) ||
        this.byAppleId.has(product.appleProductId)
      ) {
        throw new DomainError("invalid_input");
      }
      if (
        product.kind === "subscription" &&
        (!product.tier ||
          !["plus", "pro", "studio"].includes(product.tier) ||
          !product.billingPeriod ||
          !["month", "year"].includes(product.billingPeriod))
      )
        throw new DomainError("invalid_input");
      if (
        product.kind === "consumable" &&
        (!product.creditKind ||
          !["ai", "render"].includes(product.creditKind) ||
          !Number.isSafeInteger(product.credits) ||
          (product.credits ?? 0) <= 0)
      )
        throw new DomainError("invalid_input");
      if (product.kind === "non_consumable" && !product.feature) throw new DomainError("invalid_input");
      if (
        (product.feature !== undefined &&
          ![
            "ai_generation",
            "ai_credits",
            "unlimited_projects",
            "advanced_ai",
            "hd_render",
            "commercial_use",
            "3dgs_capture",
            "cad_export",
            "bim_export",
            "unlimited_variations",
            "priority_render",
            "design_history",
            "cloud_backup",
            "team_collaboration",
            "material_estimator",
            "virtual_tour",
            "export_pack",
            "pro_templates",
            "design_compare",
            "room_measurements",
            "advanced_lighting",
            "presentation_mode",
            "brand_removal",
            "batch_generation",
          ].includes(product.feature)) ||
        (product.kind !== "subscription" &&
          (product.tier !== undefined || product.billingPeriod !== undefined)) ||
        (product.kind !== "consumable" && (product.creditKind !== undefined || product.credits !== undefined))
      )
        throw new DomainError("invalid_input");
      this.byId.set(product.id, Object.freeze({ ...product }));
      this.byAppleId.set(product.appleProductId, Object.freeze({ ...product }));
    }
  }

  all(): MonetizationProduct[] {
    return [...this.byId.values()].map((product) => ({ ...product }));
  }
  get(id: string): MonetizationProduct | undefined {
    const product = this.byId.get(id);
    return product ? { ...product } : undefined;
  }
  getByAppleId(id: string): MonetizationProduct | undefined {
    const product = this.byAppleId.get(id);
    return product ? { ...product } : undefined;
  }
}

export interface RenewalDisclosure {
  productName: string;
  localizedPrice: string;
  billingPeriod: BillingPeriod;
  autoRenews: true;
  trial?: { days: number; renewalPrice: string; renewalPeriod: BillingPeriod };
}

/** Keeps trial and renewal terms explicit; localized price text must be supplied by a StoreKit Product adapter. */
export function buildRenewalDisclosure(
  product: MonetizationProduct,
  localizedPrice: string,
  trial?: { days: number; renewalPrice: string },
): RenewalDisclosure {
  if (product.kind !== "subscription" || !product.billingPeriod || !localizedPrice.trim())
    throw new DomainError("invalid_input");
  if (trial && (!Number.isSafeInteger(trial.days) || trial.days <= 0 || !trial.renewalPrice.trim()))
    throw new DomainError("invalid_input");
  return {
    productName: product.displayName,
    localizedPrice,
    billingPeriod: product.billingPeriod,
    autoRenews: true,
    ...(trial
      ? {
          trial: { days: trial.days, renewalPrice: trial.renewalPrice, renewalPeriod: product.billingPeriod },
        }
      : {}),
  };
}

export type PublicEventName =
  | "paywall_view"
  | "purchase_started"
  | "purchase_completed"
  | "purchase_failed"
  | "restore_started"
  | "restore_completed"
  | "credit_consumed"
  | "feature_blocked"
  | "subscription_renewed"
  | "subscription_expired"
  | "refund_processed";
export interface MonetizationTelemetry {
  id: string;
  type: PublicEventName;
  timestamp: string;
  productId?: string;
  feature?: Feature;
  amountMinor?: number;
  currency?: string;
}
const EVENT_NAMES = new Set<PublicEventName>([
  "paywall_view",
  "purchase_started",
  "purchase_completed",
  "purchase_failed",
  "restore_started",
  "restore_completed",
  "credit_consumed",
  "feature_blocked",
  "subscription_renewed",
  "subscription_expired",
  "refund_processed",
]);

/** Explicit field allowlist drops user IDs, receipt/JWS material, email, IP, and arbitrary metadata. */
export function minimizeTelemetry(event: RevenueEvent & { type?: PublicEventName }): MonetizationTelemetry {
  if (!event.id.trim() || !Number.isFinite(event.createdAt) || event.createdAt < 0)
    throw new DomainError("invalid_input");
  const type = event.type ?? (event.kind === "purchase" ? "purchase_completed" : "refund_processed");
  if (!EVENT_NAMES.has(type)) throw new DomainError("invalid_input");
  return {
    id: event.id,
    type,
    timestamp: new Date(event.createdAt).toISOString(),
    ...(event.productId.trim() ? { productId: event.productId } : {}),
    ...(Number.isSafeInteger(event.amountMinor) ? { amountMinor: event.amountMinor } : {}),
    ...(event.currency.trim() ? { currency: event.currency } : {}),
  };
}

export type TransactionState = "purchased" | "restored" | "refunded" | "revoked";
export interface VerifiedTransaction {
  transactionId: string;
  originalTransactionId?: string;
  productId: string;
  state: TransactionState;
  purchasedAt: number;
  expiresAt?: number;
  environment: "sandbox" | "production";
}
const terminalStates = new Set<TransactionState>(["refunded", "revoked"]);

/** Demo-only in-memory deduper; the boolean is not proof and must never be client/server auth. Backend verification is authoritative. */
export class TransactionLedger {
  private readonly transactions = new Map<string, VerifiedTransaction>();

  ingest(transaction: VerifiedTransaction, verifiedByStoreKit: boolean): VerifiedTransaction {
    if (!verifiedByStoreKit) throw new DomainError("invalid_input");
    if (
      !transaction.transactionId.trim() ||
      !transaction.productId.trim() ||
      !Number.isSafeInteger(transaction.purchasedAt) ||
      transaction.purchasedAt < 0 ||
      !["purchased", "restored", "refunded", "revoked"].includes(transaction.state) ||
      !["sandbox", "production"].includes(transaction.environment) ||
      (transaction.expiresAt !== undefined &&
        (!Number.isSafeInteger(transaction.expiresAt) || transaction.expiresAt <= transaction.purchasedAt))
    )
      throw new DomainError("invalid_input");
    const previous = this.transactions.get(transaction.transactionId);
    if (previous) {
      if (
        previous.productId !== transaction.productId ||
        previous.originalTransactionId !== transaction.originalTransactionId ||
        previous.purchasedAt !== transaction.purchasedAt ||
        previous.expiresAt !== transaction.expiresAt ||
        previous.environment !== transaction.environment
      )
        throw new DomainError("idempotency_conflict");
      if (previous.state === transaction.state) return { ...previous };
      if (
        terminalStates.has(previous.state) ||
        (transaction.state !== "refunded" && transaction.state !== "revoked")
      )
        throw new DomainError("invalid_transition");
    }
    const copy = { ...transaction };
    this.transactions.set(transaction.transactionId, copy);
    return { ...copy };
  }

  get(transactionId: string): VerifiedTransaction | undefined {
    const transaction = this.transactions.get(transactionId);
    return transaction ? { ...transaction } : undefined;
  }

  current(now = Date.now()): VerifiedTransaction[] {
    if (!Number.isSafeInteger(now) || now < 0) throw new DomainError("invalid_input");
    return [...this.transactions.values()]
      .filter(
        (transaction) =>
          !terminalStates.has(transaction.state) &&
          (transaction.expiresAt === undefined || now < transaction.expiresAt),
      )
      .map((transaction) => ({ ...transaction }));
  }
}

export interface SafeSupportTransaction {
  productId: string;
  state: TransactionState;
  purchasedAt: number;
  expiresAt?: number;
  environment: "sandbox" | "production";
}
/** Support views intentionally omit transaction IDs, original transaction IDs, receipts, and customer identifiers. */
export function redactSupportTransaction(transaction: VerifiedTransaction): SafeSupportTransaction {
  return {
    productId: transaction.productId,
    state: transaction.state,
    purchasedAt: transaction.purchasedAt,
    ...(transaction.expiresAt !== undefined ? { expiresAt: transaction.expiresAt } : {}),
    environment: transaction.environment,
  };
}
