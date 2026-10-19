import type { DatasetRecord } from "./types";
import { metrics } from "./dataset-metrics";
import { findPotentialLeakage } from "./dataset-leakage";

export function health(train: DatasetRecord[], test: DatasetRecord[]) {
  const m = metrics(train);
  const leakage = findPotentialLeakage(train, test);
  return { ...m, leakageCount: leakage.length, healthy: m.total > 100 && m.rooms >= 8 && m.styles >= 10 && leakage.length === 0 };
}
