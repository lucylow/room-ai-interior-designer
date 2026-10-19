import type { DatasetRecord } from "../core/types";

export function search(records: DatasetRecord[], query: string): DatasetRecord[] {
  const q = query.toLowerCase();
  return records.filter(r => [r.prompt,r.normalizedPrompt,r.response,r.rationale,...r.softPreferences,...r.expectedSignals].join(" ").toLowerCase().includes(q));
}
