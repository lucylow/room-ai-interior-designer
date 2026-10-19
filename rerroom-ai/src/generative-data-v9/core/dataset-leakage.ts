import type { DatasetRecord } from "../core/types";

export function findPotentialLeakage(train: DatasetRecord[], test: DatasetRecord[]): string[] {
  const testKeys = new Set(test.map(item => item.normalizedPrompt.toLowerCase()));
  return train.filter(item => testKeys.has(item.normalizedPrompt.toLowerCase())).map(item => item.id);
}
