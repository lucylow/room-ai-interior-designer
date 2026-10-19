import { describe, expect, it } from "vitest";
import {
  OfferError,
  OfferRedemptionLedger,
  type Offer,
  type OfferDisclosure,
  type RedeemRequest,
} from "../apple-monetization-v13/offers";

const disclosure = {
  productName: "Pro Monthly",
  localizedPrice: "$9.99",
  billingPeriod: "month",
  autoRenews: true,
  renewal: { price: "$9.99", period: "month" },
  terms: "Renews monthly until cancelled.",
};
const offer = (kind: Offer["kind"] = "promo", patch: Partial<Offer> = {}): Offer => ({
  id: "offer-a",
  kind,
  productId: "pro.month",
  startsAt: 100,
  endsAt: 500,
  disclosure,
  ...(kind === "offer_code" ? { code: "SAVE" } : {}),
  ...patch,
});
const request = (patch: Partial<RedeemRequest> = {}): RedeemRequest => ({
  offerId: "offer-a",
  userId: "u1",
  productId: "pro.month",
  idempotencyKey: "key-1",
  now: 200,
  subscription: { status: "none", history: [] },
  ...patch,
});
const errorCode = (fn: () => unknown, code: string) => {
  try {
    fn();
    throw new Error("expected error");
  } catch (e) {
    expect(e).toBeInstanceOf(OfferError);
    expect((e as OfferError).code).toBe(code);
  }
};

describe("Apple monetization v13 local offer policy", () => {
  it.each(["intro", "promo", "win_back", "offer_code"] as const)(
    "redeems eligible %s offer with explicit disclosure",
    (kind) => {
      const ledger = new OfferRedemptionLedger();
      ledger.addOffer(offer(kind));
      const sub =
        kind === "win_back"
          ? {
              status: "expired" as const,
              history: [{ productId: "old", purchasedAt: 1, status: "expired" as const }],
            }
          : { status: "none" as const, history: [] };
      const r = ledger.redeem(
        request({ subscription: sub, ...(kind === "offer_code" ? { code: "SAVE" } : {}) }),
      );
      expect(r.disclosure).toEqual(disclosure);
      expect(r.redeemedAt).toBe(200);
    },
  );

  it("blocks intro after any prior subscription and requires expired history for win-back", () => {
    const l = new OfferRedemptionLedger();
    l.addOffer(offer("intro"));
    errorCode(
      () =>
        l.redeem(
          request({ subscription: { status: "none", history: [{ productId: "old", purchasedAt: 1 }] } }),
        ),
      "subscription_history_ineligible",
    );
    const w = new OfferRedemptionLedger();
    w.addOffer(offer("win_back"));
    errorCode(() => w.redeem(request()), "subscription_history_ineligible");
    errorCode(
      () => w.redeem(request({ subscription: { status: "active", expiresAt: 400, history: [] } })),
      "subscription_history_ineligible",
    );
  });

  it("checks product, code, start/end and expired subscription boundaries", () => {
    const l = new OfferRedemptionLedger();
    l.addOffer(offer("offer_code"));
    errorCode(() => l.redeem(request({ code: "wrong" })), "invalid_code");
    errorCode(() => l.redeem(request({ code: "SAVE", productId: "other" })), "product_mismatch");
    errorCode(() => l.redeem(request({ code: "SAVE", now: 99 })), "not_started");
    errorCode(() => l.redeem(request({ code: "SAVE", now: 500 })), "offer_expired");
    errorCode(
      () =>
        l.redeem(request({ code: "SAVE", subscription: { status: "active", expiresAt: 200, history: [] } })),
      "subscription_expired",
    );
  });

  it("enforces per-user and global redemption limits", () => {
    const l = new OfferRedemptionLedger();
    l.addOffer(offer("promo", { maxPerUser: 1, totalLimit: 2 }));
    l.redeem(request());
    errorCode(() => l.redeem(request({ idempotencyKey: "second" })), "user_limit_reached");
    l.redeem(request({ userId: "u2", idempotencyKey: "other" }));
    // A third distinct user reaches the campaign-wide cap first.
    errorCode(() => l.redeem(request({ userId: "u3", idempotencyKey: "third" })), "total_limit_reached");
  });

  it("returns idempotent result for exact retry and rejects conflicting replay", () => {
    const l = new OfferRedemptionLedger();
    l.addOffer(offer());
    const first = l.redeem(request());
    expect(l.redeem(request({ now: 300 })).redeemedAt).toBe(first.redeemedAt);
    errorCode(() => l.redeem(request({ productId: "other" })), "idempotency_conflict");
    errorCode(() => l.redeem(request({ code: "different" })), "idempotency_conflict");
    expect(l.list()).toHaveLength(1);
  });

  it("requires complete transparent trial renewal disclosures and valid offer windows", () => {
    const l = new OfferRedemptionLedger();
    const disclosureWithoutRenewal: OfferDisclosure = structuredClone(disclosure);
    delete disclosureWithoutRenewal.renewal;
    errorCode(
      () => l.addOffer(offer("promo", { disclosure: disclosureWithoutRenewal })),
      "invalid_disclosure",
    );
    errorCode(() => l.addOffer(offer("intro", { startsAt: 500 })), "invalid_offer");
    const trial = {
      ...disclosureWithoutRenewal,
      trial: { duration: 7, unit: "days", renewalPrice: "$9.99", renewalPeriod: "month" },
    };
    l.addOffer(offer("intro", { id: "trial", disclosure: trial }));
    expect(l.redeem(request({ offerId: "trial" })).disclosure.trial).toEqual(trial.trial);
  });
});
