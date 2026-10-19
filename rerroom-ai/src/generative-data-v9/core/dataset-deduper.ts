import type { DatasetRecord } from "../core/types";

export function dedupeRecords(records: DatasetRecord[]): DatasetRecord[] {
  const seen = new Set<string>();
  return records.filter(record => {
    const key = `${record.roomType}|${record.style}|${record.paletteId}|${record.normalizedPrompt.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
