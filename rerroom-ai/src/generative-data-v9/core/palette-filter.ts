import type { DatasetRecord } from "./types";

export function filterByPalette(records: DatasetRecord[], paletteId: string): DatasetRecord[] {
  return records.filter(r => r.paletteId === paletteId);
}
