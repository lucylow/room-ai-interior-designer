import AsyncStorage from "@react-native-async-storage/async-storage";

export const SAVED_SHOP_KEY = "rerroom.saved-shop.v1";
export interface SavedShopEntry { productId: string; roomId?: string; }

function normalizeEntry(value: unknown): SavedShopEntry | null {
  if (typeof value === "string" && value.length > 0) return { productId: value };
  if (!value || typeof value !== "object") return null;
  const entry = value as Partial<SavedShopEntry>;
  return typeof entry.productId === "string" && entry.productId.length > 0
    ? { productId: entry.productId, roomId: typeof entry.roomId === "string" && entry.roomId.length > 0 ? entry.roomId : undefined }
    : null;
}

export function parseSavedShopEntries(raw: string | null): SavedShopEntry[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const entries = value.map(normalizeEntry).filter((item): item is SavedShopEntry => item !== null);
    const seen = new Set<string>();
    return entries.filter((entry) => { const key = `${entry.productId}:${entry.roomId ?? "global"}`; if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, 100);
  } catch { return []; }
}

export function parseSavedShopIds(raw: string | null): string[] { return [...new Set(parseSavedShopEntries(raw).map((entry) => entry.productId))]; }
export async function loadSavedShopEntries(): Promise<SavedShopEntry[]> { try { return parseSavedShopEntries(await AsyncStorage.getItem(SAVED_SHOP_KEY)); } catch { return []; } }
export async function saveSavedShopEntries(entries: SavedShopEntry[]): Promise<SavedShopEntry[]> { const next = entries.slice(0, 100); await AsyncStorage.setItem(SAVED_SHOP_KEY, JSON.stringify(next)); return next; }
export async function loadSavedShopIds(roomId?: string): Promise<string[]> { const entries = await loadSavedShopEntries(); return [...new Set(entries.filter((entry) => !roomId || !entry.roomId || entry.roomId === roomId).map((entry) => entry.productId))]; }
export async function saveSavedShopIds(ids: string[]): Promise<string[]> { const next = [...new Set(ids)].slice(0, 100); await AsyncStorage.setItem(SAVED_SHOP_KEY, JSON.stringify(next)); return next; }
export async function toggleSavedShopId(id: string, roomId?: string): Promise<string[]> { const entries = await loadSavedShopEntries(); const matches = entries.some((entry) => entry.productId === id && (!roomId || !entry.roomId || entry.roomId === roomId)); const next = matches ? entries.filter((entry) => !(entry.productId === id && (!roomId || !entry.roomId || entry.roomId === roomId))) : [...entries, { productId: id, roomId }]; await saveSavedShopEntries(next); return loadSavedShopIds(roomId); }
export async function removeSavedShopId(id: string, roomId?: string): Promise<string[]> { const entries = await loadSavedShopEntries(); const next = entries.filter((entry) => !(entry.productId === id && (!roomId || !entry.roomId || entry.roomId === roomId))); await saveSavedShopEntries(next); return loadSavedShopIds(roomId); }
export function moveSavedShopEntry(entries: SavedShopEntry[], productId: string, roomId?: string): SavedShopEntry[] { return [...entries.filter((entry) => entry.productId !== productId), { productId, ...(roomId ? { roomId } : {}) }]; }
export async function assignSavedShopId(id: string, roomId: string): Promise<string[]> { const next = moveSavedShopEntry(await loadSavedShopEntries(), id, roomId); await saveSavedShopEntries(next); return loadSavedShopIds(roomId); }
export async function restoreSavedShopId(id: string, roomId?: string): Promise<string[]> { const next = moveSavedShopEntry(await loadSavedShopEntries(), id, roomId); await saveSavedShopEntries(next); return loadSavedShopIds(roomId); }
