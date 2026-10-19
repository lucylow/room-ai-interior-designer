import type { RankingPair } from "../core/types";

export function consistency(pairs: RankingPair[]): number {
  if (!pairs.length) return 0;
  const valid = pairs.filter(p => p.preferredConceptId !== p.alternateConceptId && p.reasons.length > 0).length;
  return Number((valid / pairs.length).toFixed(3));
}
