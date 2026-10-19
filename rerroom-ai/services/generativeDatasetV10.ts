import { GENERATIVE_DATA_V10, auditV10 } from "../src/generative-data-v10";
import type { DatasetFamily, SplitName } from "../src/generative-data-v10/core/types";
import { toJsonLines } from "../src/generative-data-v10/export/jsonl-export";
import { compilePrompt } from "../src/generative-data-v10/engines/prompt-compiler";
import { qualityGate } from "../src/generative-data-v10/engines/quality-gate";
import { routeForTask } from "../src/generative-data-v10/engines/dataset-router";
import { stableSplit } from "../src/generative-data-v10/engines/split-manager";
import { nearestStyles } from "../src/generative-data-v10/engines/style-neighbor-graph";
import {
  updatePreference,
  type PreferenceUpdate,
} from "../src/generative-data-v10/engines/preference-learning";
import { searchDataset, type DatasetQuery } from "../src/generative-data-v10/query/dataset-query";

export interface GenerativeDatasetV10Report {
  version: string;
  familyCounts: Record<string, number>;
  splitCounts: Record<string, number>;
  quality: ReturnType<typeof auditV10>["quality"];
  styleCoverage: ReturnType<typeof auditV10>["styleCoverage"];
  roomCoverage: ReturnType<typeof auditV10>["roomCoverage"];
  readyForDemo: boolean;
}

export function getGenerativeDatasetV10Report(): GenerativeDatasetV10Report {
  const summary = auditV10();
  return {
    version: summary.version,
    familyCounts: summary.counts,
    splitCounts: summary.splitCounts,
    quality: summary.quality,
    styleCoverage: summary.styleCoverage,
    roomCoverage: summary.roomCoverage,
    readyForDemo:
      summary.quality.duplicateIds === 0 &&
      summary.quality.schemaErrors === 0 &&
      summary.quality.groundingFailures === 0 &&
      summary.quality.score >= 1,
  };
}

export function searchGenerativeDatasetV10(query: DatasetQuery = {}, limit = 24): unknown[] {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.min(100, Math.floor(limit))) : 24;
  return searchDataset({
    ...query,
    text: typeof query.text === "string" ? query.text.slice(0, 500) : query.text,
  }).slice(0, safeLimit);
}

export function compileGenerativePromptV10(input: {
  style: string;
  palette: string;
  room: string;
  intent: string;
  constraints?: string[];
}) {
  return compilePrompt({
    style: String(input.style || "modern").slice(0, 80),
    palette: String(input.palette || "neutral").slice(0, 80),
    room: String(input.room || "living room").slice(0, 80),
    intent: String(input.intent || "balanced, comfortable interior").slice(0, 240),
    constraints: Array.isArray(input.constraints) ? input.constraints.slice(0, 12).map(String) : [],
  });
}

export function routeGenerativeTaskV10(task: string, hardConstraint = false) {
  return routeForTask(String(task || "generation").slice(0, 300), Boolean(hardConstraint));
}

export function evaluateGenerativeQualityV10(input: {
  visual: number;
  spatial: number;
  groundedness: number;
  maxGeometryDriftMm: number;
}) {
  const finite = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);
  return qualityGate({
    visual: finite(input.visual, 0),
    spatial: finite(input.spatial, 0),
    groundedness: finite(input.groundedness, 0),
    maxGeometryDriftMm: Math.max(0, finite(input.maxGeometryDriftMm, Number.POSITIVE_INFINITY)),
  });
}

export function getStableV10Split(id: string): SplitName {
  return stableSplit(String(id || "unknown"));
}

export function getV10StyleNeighbors(style: string): string[] {
  return nearestStyles(String(style || "modern").slice(0, 80));
}

export function updateGenerativePreferenceV10(
  current: PreferenceUpdate,
  signal: PreferenceUpdate,
): PreferenceUpdate {
  const safe = (value: number) => (Number.isFinite(value) ? value : 0);
  return updatePreference(
    {
      styleDelta: safe(current.styleDelta),
      paletteDelta: safe(current.paletteDelta),
      layoutDelta: safe(current.layoutDelta),
      confidence: Math.max(0, Math.min(0.99, safe(current.confidence))),
    },
    {
      style: safe(signal.styleDelta),
      palette: safe(signal.paletteDelta),
      layout: safe(signal.layoutDelta),
      confidence: safe(signal.confidence),
    },
  );
}

export function exportGenerativeDatasetV10Jsonl(): string {
  return toJsonLines();
}

export type { DatasetFamily };
export { GENERATIVE_DATA_V10 };
