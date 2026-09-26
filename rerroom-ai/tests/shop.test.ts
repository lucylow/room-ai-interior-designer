import { describe, expect, it } from "vitest";
import { refreshCatalogProduct } from "../services/catalogRefresh";
import { budgetAlternatives, budgetDelta, budgetStatusCopy, canRefreshPrice, filterShopProducts, formatShopPrice, priceFreshnessCopy, priceFreshnessIsRecent, priceRefreshAnnouncement, priceRefreshChipCopy, priceRefreshCopy, priceRefreshExactTime, priceRefreshOfflineCopy, priceRefreshResult, priceRefreshTimeCopy, priceRefreshTimeZoneLabel, recommendationCopy, savingsAmount, savingsCopy, savingsPercent, shouldAutoRefreshPrice, shopProducts, shortlistSavings, shortlistSavingsCopy, shortlistTotal, sortShopProducts, stockStatusCopy } from "../services/shopCore";

describe("shop catalog helpers", () => {
  it("filters by category and working budget", () => {
    expect(filterShopProducts("Lighting").every((item) => item.category === "Lighting")).toBe(true);
    expect(filterShopProducts("All", 50).every((item) => item.price <= 50)).toBe(true);
    expect(filterShopProducts("Storage", 100)).toHaveLength(0);
  });

  it("sorts products without mutating the source catalog", () => {
    const low = sortShopProducts(shopProducts, "price-low");
    const high = sortShopProducts(shopProducts, "price-high");
    expect(low[0].price).toBeLessThanOrEqual(low[1].price);
    expect(high[0].price).toBeGreaterThanOrEqual(high[1].price);
    expect(shopProducts[0].id).toBe("linen-floor-lamp");
  });

  it("keeps product details actionable for the detail route", () => {
    expect(shopProducts.every((item) => item.description && item.dimensions && item.retailer && item.retailerUrl.startsWith("https://"))).toBe(true);
  });

  it("builds room-fit copy and cheaper same-category alternatives", () => {
    const lamp = shopProducts.find((item) => item.id === "linen-floor-lamp")!;
    expect(recommendationCopy(lamp)).toMatch(/linen floor lamp supports a modern warm direction/i);
    expect(budgetAlternatives(shopProducts.find((item) => item.id === "wool-loop-rug")!)[0].price).toBeLessThan(240);
  });

  it("calculates transparent savings context", () => {
    expect(savingsAmount(240, 34)).toBe(206);
    expect(savingsPercent(240, 34)).toBe(86);
    expect(savingsCopy(240, 34)).toBe("Save $206 · 86% less");
    expect(savingsPercent(0, 34)).toBe(0);
  });

  it("aggregates shortlist savings and writes useful summary copy", () => {
    const saved = shopProducts.filter((item) => ["cotton-cushion", "ceramic-vessel"].includes(item.id));
    expect(shortlistSavings(saved)).toBe(206);
    expect(shortlistSavingsCopy(206, 2)).toBe("Up to $206 in room-level savings across 2 pieces");
    expect(shortlistSavingsCopy(0, 1)).toContain("top of each category");
  });

  it("calculates shortlist totals and clear budget status", () => {
    const saved = shopProducts.filter((item) => ["linen-floor-lamp", "cotton-cushion"].includes(item.id));
    expect(shortlistTotal(saved)).toBe(162);
    expect(budgetDelta(162, 500)).toBe(338);
    expect(budgetStatusCopy(162, 500)).toBe("$338 left in your room budget");
    expect(budgetStatusCopy(620, 500)).toBe("$120 over your room budget");
  });

  it("formats product prices for the shopping surface", () => {
    expect(formatShopPrice(128)).toBe("$128");
    expect(formatShopPrice(2500)).toBe("$2,500");
  });

  it("refreshes a catalog product through the typed local service", async () => {
    const result = await refreshCatalogProduct("linen-floor-lamp", 123);
    expect(result.product.id).toBe("linen-floor-lamp");
    expect(result.checkedAt).toBe(123);
    expect(result.source).toBe("local-catalog");
    await expect(refreshCatalogProduct("missing-product", 123)).rejects.toThrow("PRODUCT_NOT_FOUND");
  });

  it("formats exact UTC time and local-plus-UTC copy", () => {
    const timestamp = Date.parse("2026-08-22T14:32:00.000Z");
    expect(priceRefreshExactTime(timestamp)).toBe("2026-08-22 14:32 UTC");
    expect(priceRefreshTimeZoneLabel(timestamp, "UTC")).toBe("UTC");
    expect(priceRefreshTimeCopy(timestamp, "UTC", "12h")).toBe("Aug 22, 2026, 2:32 PM (UTC) · 2026-08-22 14:32 UTC");
    expect(priceRefreshTimeCopy(timestamp, "UTC", "24h")).toBe("Aug 22, 2026, 14:32 (UTC) · 2026-08-22 14:32 UTC");
  });

  it("formats the visible reconnect-refresh status chip", () => {
    expect(priceRefreshChipCopy("refreshing")).toBe("Refreshing after reconnect");
    expect(priceRefreshChipCopy("updated")).toBe("Refreshed after reconnect");
    expect(priceRefreshChipCopy("stale")).toBe("Recheck retailer price");
    expect(priceRefreshChipCopy("idle")).toBe("");
  });

  it("announces reconnect-triggered refresh states clearly", () => {
    expect(priceRefreshAnnouncement("reconnect", "refreshing")).toBe("Connection restored. Refreshing the retailer price now.");
    expect(priceRefreshAnnouncement("reconnect", "updated")).toBe("Retailer price refreshed after reconnecting.");
    expect(priceRefreshAnnouncement("manual", "updated")).toBe("Retailer price refreshed.");
    expect(priceRefreshAnnouncement("reconnect", "stale")).toBe("Retailer price still needs a recheck.");
  });

  it("auto-resumes only after a pending request returns online", () => {
    expect(shouldAutoRefreshPrice("offline", "online", true)).toBe(true);
    expect(shouldAutoRefreshPrice("unknown", "online", true)).toBe(true);
    expect(shouldAutoRefreshPrice("online", "online", true)).toBe(false);
    expect(shouldAutoRefreshPrice("offline", "online", false)).toBe(false);
    expect(shouldAutoRefreshPrice("offline", "unknown", true)).toBe(false);
  });

  it("gates refresh safely when connectivity is unavailable", () => {
    expect(canRefreshPrice("online")).toBe(true);
    expect(canRefreshPrice("offline")).toBe(false);
    expect(canRefreshPrice("unknown")).toBe(false);
    expect(priceRefreshOfflineCopy("offline")).toBe("Reconnect to check the retailer price");
    expect(priceRefreshOfflineCopy("unknown")).toBe("Checking connection before refresh");
  });

  it("describes retailer availability and price freshness deterministically", () => {
    const now = Date.parse("2026-08-22T14:32:00.000Z");
    expect(stockStatusCopy("in-stock")).toBe("In stock");
    expect(stockStatusCopy("low-stock")).toBe("Low stock");
    expect(stockStatusCopy("backorder")).toBe("Available to order");
    expect(priceFreshnessCopy("2026-08-22T09:00:00.000Z", now)).toBe("Price checked today");
    expect(priceFreshnessCopy("2026-08-20T09:00:00.000Z", now)).toBe("Price checked 2 days ago");
    expect(priceFreshnessIsRecent("2026-08-20T09:00:00.000Z", now)).toBe(true);
    expect(priceFreshnessIsRecent("2026-08-10T09:00:00.000Z", now)).toBe(false);
    expect(priceRefreshCopy("refreshing")).toBe("Checking retailer price…");
    expect(priceRefreshCopy("updated")).toBe("Price checked just now");
    expect(priceRefreshCopy("stale")).toBe("Retailer price needs a recheck");
    expect(priceRefreshResult("2026-08-20T09:00:00.000Z", now)).toBe("updated");
    expect(priceRefreshResult("2026-08-10T09:00:00.000Z", now)).toBe("stale");
  });
});
