import AsyncStorage from "@react-native-async-storage/async-storage";

export const PRICE_CHECK_KEY = "rerroom.price-checks.v1";
export type PriceCheckMap = Record<string, number>;

export function parsePriceChecks(raw: string | null): PriceCheckMap {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const entries = Object.entries(value as Record<string, unknown>).filter((entry): entry is [string, number] => entry[0].length > 0 && typeof entry[1] === "number" && Number.isFinite(entry[1]) && entry[1] > 0).slice(0, 100);
    return Object.fromEntries(entries) as PriceCheckMap;
  } catch { return {}; }
}

export async function loadPriceChecks(): Promise<PriceCheckMap> { try { return parsePriceChecks(await AsyncStorage.getItem(PRICE_CHECK_KEY)); } catch { return {}; } }
export async function loadPriceCheck(productId: string): Promise<number | null> { const checks = await loadPriceChecks(); return checks[productId] ?? null; }
export async function savePriceCheck(productId: string, checkedAt: number): Promise<PriceCheckMap> { const next = { ...(await loadPriceChecks()), [productId]: checkedAt }; const bounded = Object.fromEntries(Object.entries(next).slice(-100)); await AsyncStorage.setItem(PRICE_CHECK_KEY, JSON.stringify(bounded)); return bounded; }
