import type { DatasetRecord } from "./types";

export function sampleRefinements(records: DatasetRecord[], limit = 12): DatasetRecord[] {
  const wants = ["warmer","brighter","less clutter","more open","more Scandinavian","more Industrial"];
  const picked = records.filter(r => wants.some(w => `${r.prompt} ${r.softPreferences.join(" ")}`.toLowerCase().includes(w.toLowerCase())));
  return picked.slice(0, limit);
}
