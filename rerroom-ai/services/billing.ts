export type PlanId = "free" | "pro" | "pro-plus" | "business";
export type PlanTier = PlanId;
export type Feature = "unlimited-designs" | "whole-home" | "hd-export" | "ai-editor" | "video-walkthrough" | "ar-preview" | "premium-shopping" | "priority-generation" | "basic-generation" | "advanced-refinement" | "commercial-use";
export type Interval = "monthly" | "annual";
export interface Product { id: string; plan: PlanId; interval: Interval; priceCents: number; currency: string; trialDays: number; }
export interface Plan { id: string; tier: PlanTier; period?: Interval; title: string; price: number; currency: string; generationCredits: number; features: string[]; }
export interface EntitlementState { tier: PlanTier; active: boolean; expiresAt?: string; autoRenew: boolean; generationCredits: number; source: "app-store" | "play-store" | "web" | "promo" | "unknown"; }
export interface CreditWallet { userId: string; designCredits: number; hdCredits: number; videoCredits: number; }
export const PRODUCTS: Product[] = [{ id: "pro_monthly", plan: "pro", interval: "monthly", priceCents: 999, currency: "USD", trialDays: 7 }, { id: "pro_annual", plan: "pro", interval: "annual", priceCents: 7999, currency: "USD", trialDays: 7 }, { id: "pro_plus_monthly", plan: "pro-plus", interval: "monthly", priceCents: 1999, currency: "USD", trialDays: 7 }, { id: "business_monthly", plan: "business", interval: "monthly", priceCents: 3999, currency: "USD", trialDays: 14 }];
export const PLAN_FEATURES: Record<PlanId, Feature[]> = { free: ["basic-generation", "premium-shopping"], pro: ["unlimited-designs", "whole-home", "hd-export", "ai-editor", "premium-shopping", "advanced-refinement"], "pro-plus": ["unlimited-designs", "whole-home", "hd-export", "ai-editor", "video-walkthrough", "ar-preview", "premium-shopping", "priority-generation", "advanced-refinement"], business: ["unlimited-designs", "whole-home", "hd-export", "ai-editor", "video-walkthrough", "ar-preview", "premium-shopping", "priority-generation", "advanced-refinement", "commercial-use"] };
export const PLANS: Plan[] = [{ id: "free", tier: "free", title: "Free", price: 0, currency: "USD", generationCredits: 3, features: ["3 room concepts / month", "Basic styles", "Shopping plan"] }, { id: "pro_monthly", tier: "pro", period: "monthly", title: "Pro monthly", price: 9.99, currency: "USD", generationCredits: 40, features: ["40 concepts / month", "HD rendering", "Advanced refinement", "Room history"] }, { id: "pro_plus_monthly", tier: "pro-plus", period: "monthly", title: "Pro Plus", price: 19.99, currency: "USD", generationCredits: 80, features: ["Video walkthroughs", "AR preview", "Priority generation"] }, { id: "business_monthly", tier: "business", period: "monthly", title: "Business monthly", price: 39.99, currency: "USD", generationCredits: 150, features: ["Commercial use", "Priority generation", "Whole-home design"] }];
export function allows(tier: PlanTier, feature: Feature) { return PLAN_FEATURES[tier].includes(feature); }
export function usagePercent(used: number, limit: number) { if (limit <= 0) return 1; return Math.min(1, Math.max(0, used / limit)); }
export function remaining(used: number, limit: number) { return Math.max(0, limit - used); }
export function spendCredits(wallet: CreditWallet, bucket: keyof Omit<CreditWallet, "userId">, amount = 1): CreditWallet { if (amount < 0 || !Number.isSafeInteger(amount) || wallet[bucket] < amount) throw new Error("INSUFFICIENT_CREDITS"); return { ...wallet, [bucket]: wallet[bucket] - amount }; }
export function refundCredits(wallet: CreditWallet, bucket: keyof Omit<CreditWallet, "userId">, amount = 1): CreditWallet { if (amount < 0 || !Number.isSafeInteger(amount)) throw new Error("INVALID_CREDIT_AMOUNT"); return { ...wallet, [bucket]: wallet[bucket] + amount }; }
export function editorCreditCost(operation: "remove" | "replace" | "relight" | "expand") { return { remove: 1, replace: 2, relight: 1, expand: 2 }[operation]; }
export const videoCreditCost = (seconds: number) => Math.max(1, Math.ceil(seconds / 10));
export const wholeHomeCredits = (rooms: number) => Math.max(3, Math.ceil(rooms));
export function canUseAllowance(used: number, limit: number) { return used < limit; }
export function formatPrice(cents: number, currency: string) { return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100); }
export function paywallCopy(placement: "generation-limit" | "hd-export" | "whole-home" | "shopping" | "advanced-refinement") { const copy = { "generation-limit": { headline: "Keep designing your room", benefit: "Unlock more AI redesigns every month.", recommendedTier: "pro" as const }, "hd-export": { headline: "Export your room in high resolution", benefit: "Get a clean, share-ready final image.", recommendedTier: "pro" as const }, "whole-home": { headline: "Design the whole home", benefit: "Keep one AI design language across every room.", recommendedTier: "pro" as const }, shopping: { headline: "Turn your design into a shopping plan", benefit: "Match the design with practical product recommendations.", recommendedTier: "pro" as const }, "advanced-refinement": { headline: "Refine the design with more control", benefit: "Make room-level changes with advanced AI instructions.", recommendedTier: "pro" as const } }; return copy[placement]; }
export async function recoverPurchase<T>(purchase: () => Promise<T>, restore: () => Promise<T>) { try { return await purchase(); } catch { return restore(); } }
export function billingMessage(code: string) { return ({ PAYMENT_DECLINED: "Payment was declined.", NETWORK_ERROR: "Billing is temporarily unavailable.", RESTORE_FAILED: "We couldn’t restore purchases. Please try again." } as Record<string, string>)[code] ?? "Billing error. Please try again."; }
const purchaseKeys = new Set<string>();
export function claimPurchase(key: string) { if (purchaseKeys.has(key)) return false; purchaseKeys.add(key); return true; }

export type RevenueStream = "subscription" | "credits" | "commerce" | "professional" | "business" | "gift";
export interface Money { amountMinor: number; currency: string; }
export interface RevenueProduct { id: string; stream: RevenueStream; name: string; price: Money; active: boolean; }
export type AdvancedEntitlement = "design_unlimited" | "whole_home" | "hd_export" | "ai_editor" | "video_creator" | "ar_preview" | "priority_queue" | "team_workspace";
export const ADVANCED_PLAN_MATRIX: Record<PlanId, AdvancedEntitlement[]> = { free: [], pro: ["design_unlimited", "whole_home", "hd_export", "ai_editor"], "pro-plus": ["design_unlimited", "whole_home", "hd_export", "ai_editor", "video_creator", "ar_preview", "priority_queue"], business: ["design_unlimited", "whole_home", "hd_export", "ai_editor", "video_creator", "ar_preview", "priority_queue", "team_workspace"] };
export const hasAdvancedEntitlement = (plan: PlanId, feature: AdvancedEntitlement) => ADVANCED_PLAN_MATRIX[plan].includes(feature);
export interface CreditBundle { id: string; design?: number; edit?: number; video?: number; priceMinor: number; currency: string; }
export const CREDIT_BUNDLES: CreditBundle[] = [{ id: "starter", design: 10, priceMinor: 499, currency: "USD" }, { id: "creator", design: 30, priceMinor: 999, currency: "USD" }, { id: "video", video: 10, priceMinor: 1299, currency: "USD" }];
export function annualSavings(monthlyCents: number, annualCents: number) { return Math.max(0, monthlyCents * 12 - annualCents); }
export interface PromoCode { code: string; kind: "percent" | "fixed" | "credits"; value: number; expiresAt: string; maxUses?: number; uses: number; }
export function validPromo(promo: PromoCode, now = new Date()) { return new Date(promo.expiresAt) > now && (promo.maxUses == null || promo.uses < promo.maxUses) && promo.value >= 0; }
export function percentDiscount(amountMinor: number, percent: number) { return Math.max(0, Math.round(amountMinor * (1 - Math.max(0, Math.min(100, percent)) / 100))); }
export function fixedDiscount(amountMinor: number, discountMinor: number) { return Math.max(0, amountMinor - Math.max(0, discountMinor)); }
export const referralCode = (userId: string) => `ROOM-${userId.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase()}`;
export const validReferral = (code: string) => /^ROOM-[A-Z0-9]{4,8}$/.test(code);
export interface SubscriptionState { plan: PlanId; status: "trialing" | "active" | "past_due" | "paused" | "canceled" | "expired"; renewsAt?: string; }
export const applyRenewal = (state: SubscriptionState, renewsAt: string): SubscriptionState => ({ ...state, status: "active", renewsAt });
export const applyRefund = (state: SubscriptionState): SubscriptionState => ({ ...state, status: "expired" });
export const billingAccess = (daysLate: number) => daysLate <= 3 ? "grace" as const : daysLate <= 14 ? "restricted" as const : "expired" as const;
export const canPause = (status: SubscriptionState["status"]) => status === "active" || status === "past_due";
export const retentionOffer = (reason: string) => /expensive/i.test(reason) ? { code: "SAVE20", percent: 20 } : null;

export interface SubscriptionOffer { id: string; plan: PlanId; interval: "month" | "year"; priceMinor: number; trialDays: number; }
export interface BillingSnapshot { plan: PlanId; wallet: CreditWallet; subscription?: SubscriptionOffer; syncedAt: string; }
export interface Purchase { id: string; userId: string; productId: string; state: "pending" | "paid" | "refunded" | "failed"; }
export const priceMatches = (serverMinor: number, clientMinor: number) => serverMinor === clientMinor;
export const validCredits = (value: number) => Number.isSafeInteger(value) && value >= 0;
export const validPlan = (plan: string): plan is PlanId => ["free", "pro", "pro-plus", "business"].includes(plan);
export const pauseOffer = { months: 1, discountPercent: 0 } as const;
export const winbackOffer = { months: 3, discountPercent: 25 } as const;
export const videoCredits = (seconds: number) => Math.max(1, Math.ceil(seconds / 10));
export const wholeHomeCreditCost = (rooms: number) => Math.max(3, rooms * 2);
export const aiEditCost = { remove: 1, replace: 2, relight: 1, expand: 2, restyle: 2 } as const;
export const hdExportCost = 1;
export const priorityAllowed = (plan: PlanId) => plan === "pro-plus" || plan === "business";
export const paywallText = (feature: string) => `Unlock ${feature.replace(/[-_]/g, " ")} with RE:ROOM AI Pro.`;
export const upgradeText = (feature: string) => feature === "whole_home" ? "Design your whole home" : feature === "video" ? "Create an AI walkthrough" : "Unlock Pro";
export function refundState(state: Purchase["state"]): Purchase["state"] { return state === "paid" ? "refunded" : state; }
const entitlementCache = new Map<string, { plan: PlanId; expires: number }>();
export function setCachedPlan(userId: string, plan: PlanId, ttlMs = 300000) { entitlementCache.set(userId, { plan, expires: Date.now() + Math.max(0, ttlMs) }); }
export function getCachedPlan(userId: string, now = Date.now()): PlanId | null { const value = entitlementCache.get(userId); if (!value || value.expires < now) return null; return value.plan; }
