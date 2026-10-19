import type { DatasetRecord } from "../core/types";

export function toJsonl(records: DatasetRecord[]): string {
  return records.map(record => JSON.stringify(record)).join("\n");
}

export function toCompactJson(records: DatasetRecord[]): string {
  return JSON.stringify(records);
}
