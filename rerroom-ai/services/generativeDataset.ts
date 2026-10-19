import { GENERATIVE_DATA_V9 } from "../src/generative-data-v9";
import { buildV9DatasetDemo } from "../src/generative-data-v9/demo/v9-dataset-studio";
import { balanceByRoomAndStyle } from "../src/generative-data-v9/core/dataset-balance";
import { deterministicSplit } from "../src/generative-data-v9/core/dataset-split";
import { health } from "../src/generative-data-v9/core/dataset-health";
import { lintPrompt } from "../src/generative-data-v9/core/prompt-linter";
import { toJsonl } from "../src/generative-data-v9/core/dataset-exporter";
import { filterByRoom } from "../src/generative-data-v9/core/room-filter";
import { filterByStyle } from "../src/generative-data-v9/core/style-filter";
import type { DatasetRecord, DesignStyle, RoomType } from "../src/generative-data-v9/core/types";

export interface GenerativeDatasetReport {
  version: "v9";
  sourceRecords: number;
  dedupedRecords: number;
  balancedRecords: number;
  metrics: ReturnType<typeof buildV9DatasetDemo>["metrics"];
  health: ReturnType<typeof health>;
  spatialGrounding: number;
  rankingConsistency: number;
  readyForDemo: boolean;
}

export function getGenerativeDatasetReport(): GenerativeDatasetReport {
  const demo = buildV9DatasetDemo();
  const train: DatasetRecord[] = [];
  const test: DatasetRecord[] = [];
  GENERATIVE_DATA_V9.training.forEach((record, index) =>
    (deterministicSplit(record.id, index) === "test" ? test : train).push(record),
  );
  const datasetHealth = health(train, test);
  return {
    version: "v9",
    sourceRecords: demo.sourceRecords,
    dedupedRecords: demo.dedupedRecords,
    balancedRecords: demo.balancedRecords,
    metrics: demo.metrics,
    health: datasetHealth,
    spatialGrounding: demo.spatialGrounding,
    rankingConsistency: demo.rankingConsistency,
    // Split health keeps its strict coverage diagnostics; demo readiness is based on
    // the complete balanced corpus so a small deterministic test split cannot block UI demos.
    readyForDemo:
      demo.readyForDemo &&
      demo.dedupedRecords === demo.sourceRecords &&
      demo.balancedRecords > 0 &&
      demo.spatialGrounding >= 1 &&
      demo.rankingConsistency >= 1 &&
      datasetHealth.leakageCount === 0,
  };
}

export function searchGenerativeExamples(
  input: { room?: RoomType; style?: DesignStyle; query?: string; limit?: number } = {},
): DatasetRecord[] {
  let records = GENERATIVE_DATA_V9.training;
  if (input.room) records = filterByRoom(records, input.room);
  if (input.style) records = filterByStyle(records, input.style, input.room);
  if (input.query?.trim()) {
    const query = input.query.trim().toLowerCase();
    records = records.filter((record) =>
      `${record.prompt} ${record.response} ${record.rationale}`.toLowerCase().includes(query),
    );
  }
  return records.slice(0, Math.max(0, Math.min(input.limit ?? 24, 100)));
}

export function balanceGenerativeExamples(
  records: DatasetRecord[] = GENERATIVE_DATA_V9.training,
  maxPerBucket = 8,
): DatasetRecord[] {
  if (!Array.isArray(records) || !Number.isFinite(maxPerBucket) || maxPerBucket < 1) return [];
  return balanceByRoomAndStyle(records, Math.floor(maxPerBucket));
}

export function lintGenerativePrompt(prompt: string) {
  return lintPrompt(typeof prompt === "string" ? prompt.slice(0, 2_000) : "");
}

export function exportGenerativeExamplesJsonl(
  records: DatasetRecord[] = GENERATIVE_DATA_V9.training,
): string {
  return toJsonl(Array.isArray(records) ? records : []);
}
