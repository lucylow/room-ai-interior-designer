import { GENERATIVE_DATA_V10 } from "../index";

export interface DatasetQuery {
  roomType?: string;
  style?: string;
  paletteId?: string;
  split?: string;
  family?: keyof typeof GENERATIVE_DATA_V10;
  text?: string;
}

export function searchDataset(query: DatasetQuery): unknown[] {
  const source: unknown[] = query.family
    ? (GENERATIVE_DATA_V10[query.family] as unknown[] ?? [])
    : [
        ...GENERATIVE_DATA_V10.generation,
        ...GENERATIVE_DATA_V10.project,
        ...GENERATIVE_DATA_V10.preference,
        ...GENERATIVE_DATA_V10.critique,
      ];
  const q = query.text?.toLowerCase();
  return source.filter((item) => {
    const value = item as Record<string, unknown>;
    if (query.roomType && value.roomType !== query.roomType) return false;
    if (query.style && value.style !== query.style) return false;
    if (query.paletteId && value.paletteId !== query.paletteId) return false;
    if (query.split && value.split !== query.split) return false;
    if (!q) return true;
    return JSON.stringify(value).toLowerCase().includes(q);
  });
}

export function topStyles(limit = 10): Array<{ style: string; count: number }> {
  const counts = new Map<string, number>();
  for (const record of GENERATIVE_DATA_V10.generation) {
    counts.set(record.style, (counts.get(record.style) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0, limit).map(([style,count])=>({style,count}));
}

export function roomStyleMatrix(): Record<string, Record<string, number>> {
  const matrix: Record<string, Record<string, number>> = {};
  for (const record of GENERATIVE_DATA_V10.generation) {
    matrix[record.roomType] ??= {};
    matrix[record.roomType][record.style] = (matrix[record.roomType][record.style] ?? 0) + 1;
  }
  return matrix;
}
