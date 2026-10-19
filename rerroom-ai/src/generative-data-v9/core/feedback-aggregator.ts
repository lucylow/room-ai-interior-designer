import type { FeedbackRecord } from "../core/types";

export function feedbackSignal(records: FeedbackRecord[]) {
  const byDimension = new Map<string, number>();
  for (const r of records) byDimension.set(r.dimension, (byDimension.get(r.dimension) ?? 0) + r.delta);
  return [...byDimension.entries()].sort((a,b) => b[1] - a[1]);
}
