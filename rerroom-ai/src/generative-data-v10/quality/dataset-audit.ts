import type { GenerationExample, DatasetFamily } from "../core/types";

function familyCount(dataset: Record<string, unknown>, key: string): number {
  const value = dataset[key];
  return Array.isArray(value) ? value.length : 0;
}

export function dedupeById(ids: string[]): string[] {
  return [...new Set(ids)];
}

export function splitBy(splits: string[]): Record<string, number> {
  return splits.reduce<Record<string, number>>((acc, split) => {
    acc[split] = (acc[split] ?? 0) + 1;
    return acc;
  }, {});
}

export function summarizeCoverage<T>(records: T[], field: keyof T): Record<string, number> {
  return records.reduce<Record<string, number>>((acc, record) => {
    const value = String(record[field]);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

export function validateGeneration(records: GenerationExample[]): { schemaErrors: number; groundingFailures: number } {
  let schemaErrors = 0;
  let groundingFailures = 0;
  for (const record of records) {
    if (!record.id || !record.prompt || record.provenance.piiFree !== true) schemaErrors += 1;
    const truth = record.spatialTruth;
    if (truth.geometryToleranceMm > 25 || truth.immutableFeatures.length < 3) groundingFailures += 1;
  }
  return { schemaErrors, groundingFailures };
}

export function validateAll(dataset: Record<string, unknown>): {
  counts: Record<DatasetFamily, number>;
  quality: { schemaErrors: number; groundingFailures: number; score: number };
} {
  const counts = {
    multimodal_generation: familyCount(dataset, "generation"),
    instruction: 0,
    critique: familyCount(dataset, "critique"),
    preference: familyCount(dataset, "preference"),
    counterfactual: familyCount(dataset, "counterfactual"),
    spatial_grounding: familyCount(dataset, "spatial"),
    cad_bim_grounding: familyCount(dataset, "project"),
    tool_trace: familyCount(dataset, "tooltrace"),
    quality: familyCount(dataset, "quality"),
    safety: familyCount(dataset, "safety"),
    dialogue: familyCount(dataset, "dialogue"),
    retail_grounding: familyCount(dataset, "retail"),
    evaluation: familyCount(dataset, "evaluation"),
    augmentation: familyCount(dataset, "augmentation"),
    project_context: familyCount(dataset, "project"),
  } as Record<DatasetFamily, number>;
  const generation = Array.isArray(dataset.generation) ? dataset.generation as GenerationExample[] : [];
  const genAudit = validateGeneration(generation);
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const errorRate = total === 0 ? 1 : (genAudit.schemaErrors + genAudit.groundingFailures) / total;
  return { counts, quality: { ...genAudit, score: Number(Math.max(0, 1 - errorRate).toFixed(4)) } };
}
