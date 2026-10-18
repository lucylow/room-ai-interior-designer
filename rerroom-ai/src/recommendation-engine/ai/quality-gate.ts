import type { Recommendation, Policy } from "../core/types";
export interface GateResult {
  accepted: Recommendation[];
  rejected: Recommendation[];
  reasons: Record<string, string[]>;
}
export const applyQualityGate = (rows: Recommendation[], policy: Policy): GateResult => {
  const accepted: Recommendation[] = [];
  const rejected: Recommendation[] = [];
  const reasons: Record<string, string[]> = {};
  for (const row of rows) {
    const why: string[] = [];
    if (row.score < policy.minScore) why.push("score below policy");
    if (row.confidence < policy.minConfidence) why.push("confidence below policy");
    if (row.actions.length > policy.maxActions) why.push("too many actions");
    if (policy.requireEvidence && !row.evidence.length) why.push("missing evidence");
    if ((row.estimatedCost ?? 0) > policy.maxCostRatio * 100000) why.push("cost exceeds ratio bound");
    if (row.category === "shopping" && !policy.allowShopping) why.push("shopping disabled");
    if (row.category === "construction" && !policy.allowConstruction) why.push("construction disabled");
    if (
      !policy.allowConstruction &&
      row.actions.some((action) => action.type === "create-task" || action.payload.construction === true)
    )
      why.push("construction task disabled");
    if (why.length) {
      rejected.push(row);
      reasons[row.id] = why;
    } else accepted.push(row);
  }
  return { accepted, rejected, reasons };
};
