import type { DatasetRecord } from "../core/types";

export function balanceByRoomAndStyle(records: DatasetRecord[], maxPerBucket: number): DatasetRecord[] {
  const counts = new Map<string, number>();
  const output: DatasetRecord[] = [];
  for (const record of records) {
    const key = `${record.roomType}:${record.style}`;
    const count = counts.get(key) ?? 0;
    if (count >= maxPerBucket) continue;
    counts.set(key, count + 1);
    output.push(record);
  }
  return output;
}
