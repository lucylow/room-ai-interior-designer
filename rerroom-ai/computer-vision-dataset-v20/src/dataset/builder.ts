import { SceneGenerator } from "../generators/sceneGenerator";
import { DatasetRecord, DatasetManifest } from "../core/types";
import { isValidRecord } from "./schema";
import { assignSplit } from "./splitter";
import { validateRecordValidator } from "../validators/recordValidator";

export const MAX_GENERATED_RECORDS = 1200;

export function buildDataset(count = MAX_GENERATED_RECORDS, seed = 20261008) {
  if (!Number.isSafeInteger(count) || count < 0 || count > MAX_GENERATED_RECORDS)
    throw new RangeError(`count must be an integer between 0 and ${MAX_GENERATED_RECORDS}`);
  if (!Number.isSafeInteger(seed)) throw new RangeError("seed must be a safe integer");
  const g = new SceneGenerator(seed);
  const records: DatasetRecord[] = [];
  for (let i = 0; i < count; i++) {
    const record = g.generate(i, "train");
    record.hardCase ? (record.split = "hard_case") : (record.split = assignSplit(i, count, seed));
    if (!isValidRecord(record)) {
      const errors = validateRecordValidator(record).filter((issue) => issue.severity === "error");
      throw new Error(
        `Generated record ${record.id} failed validation: ${errors.map((issue) => issue.code).join(", ")}`,
      );
    }
    records.push(record);
  }
  const splits = Object.fromEntries(
    ["train", "validation", "test", "hard_case"].map((s) => [s, records.filter((r) => r.split === s).length]),
  );
  const manifest: DatasetManifest = {
    version: "20.0.0",
    createdAt: "2026-10-08T00:00:00Z",
    recordCount: records.length,
    splits,
    classes: [...new Set(records.flatMap((r) => r.objects.map((o) => o.className)))],
    modalities: [...new Set(records.flatMap((r) => r.modalities))],
    seed,
  };
  return { records, manifest };
}
