import type { PreferenceRecord } from "../core/types";

export function aggregatePreferences(records: PreferenceRecord[]) {
  const styleCounts = new Map<string, number>();
  const paletteCounts = new Map<string, number>();
  for (const r of records) { for (const s of r.favoriteStyles) styleCounts.set(s, (styleCounts.get(s) ?? 0) + 1); for (const p of r.favoritePalettes) paletteCounts.set(p, (paletteCounts.get(p) ?? 0) + 1); }
  return { styleCounts, paletteCounts };
}
