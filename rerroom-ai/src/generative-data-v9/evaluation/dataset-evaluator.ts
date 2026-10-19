import type { DatasetRecord } from "../core/types";

export interface EvaluationReport { coverage: number; specificity: number; constraintRate: number; explanationRate: number; score: number; }

export function evaluateDataset(records: DatasetRecord[]): EvaluationReport {
  if (!records.length) return { coverage:0, specificity:0, constraintRate:0, explanationRate:0, score:0 };
  const coverage = new Set(records.map(r => `${r.roomType}:${r.style}`)).size / (12 * 24);
  const specificity = records.reduce((s,r) => s + Math.min(1, r.expectedSignals.length / 4), 0) / records.length;
  const constraintRate = records.reduce((s,r) => s + (r.hardConstraints.length >= 2 ? 1 : 0), 0) / records.length;
  const explanationRate = records.reduce((s,r) => s + (r.rationale.length >= 45 ? 1 : 0), 0) / records.length;
  return { coverage:Number(coverage.toFixed(3)), specificity:Number(specificity.toFixed(3)), constraintRate:Number(constraintRate.toFixed(3)), explanationRate:Number(explanationRate.toFixed(3)), score:Number((coverage*.2+specificity*.3+constraintRate*.25+explanationRate*.25).toFixed(3)) };
}
