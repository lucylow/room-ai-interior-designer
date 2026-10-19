import type { SpatialGroundingRecord } from "../core/types";

export function groundingScore(rows: SpatialGroundingRecord[]): number {
  if (!rows.length) return 0;
  let score = 0;
  for (const row of rows) { const immutable = row.anchors.filter(a => a.immutable).length; const inside = row.candidatePlacement.x >= 0 && row.candidatePlacement.y >= 0; score += immutable >= 2 && inside ? 1 : 0.5; }
  return Number((score / rows.length).toFixed(3));
}
