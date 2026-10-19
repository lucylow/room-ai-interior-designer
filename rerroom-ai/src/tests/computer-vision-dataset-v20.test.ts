import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  buildDataset,
  isValidRecord,
  MAX_GENERATED_RECORDS,
  toJsonl,
  validateRecordValidator,
} from "../../computer-vision-dataset-v20/src";
import type { DatasetRecord } from "../../computer-vision-dataset-v20/src";

const dataDirectory = fileURLToPath(new URL("../../computer-vision-dataset-v20/data/", import.meta.url));

describe("computer vision dataset v20", () => {
  it("builds deterministic datasets with complete split accounting", () => {
    const first = buildDataset(120, 20261008);
    const second = buildDataset(120, 20261008);

    expect(first.records).toHaveLength(120);
    expect(first.manifest.recordCount).toBe(120);
    expect(first.manifest.classes.length).toBeGreaterThanOrEqual(20);
    expect(first.manifest.modalities).toEqual(
      expect.arrayContaining([
        "rgb",
        "depth",
        "segmentation",
        "instance",
        "pointcloud",
        "mesh",
        "floorplan",
        "panorama",
      ]),
    );
    expect(Object.values(first.manifest.splits).reduce((sum, count) => sum + count, 0)).toBe(120);
    expect(toJsonl(first.records)).toBe(toJsonl(second.records));
  });

  it("supports the documented capacity and rejects invalid sizes", () => {
    const fullDataset = buildDataset(MAX_GENERATED_RECORDS);
    expect(fullDataset.records).toHaveLength(MAX_GENERATED_RECORDS);
    const hardCaseTags = new Set(fullDataset.records.flatMap((record) => record.hardCase?.tags ?? []));
    expect(hardCaseTags.has("mirror_reflection")).toBe(true);
    expect(hardCaseTags.has("glass")).toBe(true);
    expect(hardCaseTags.has("low_light")).toBe(true);
    expect(hardCaseTags.has("repetitive_furniture")).toBe(true);
    expect(hardCaseTags.has("crowded_room")).toBe(true);
    expect(hardCaseTags.has("backlighting")).toBe(true);
    expect(hardCaseTags.has("motion_blur")).toBe(true);
    expect(() => buildDataset(-1)).toThrow(RangeError);
    expect(() => buildDataset(1.5)).toThrow(RangeError);
    expect(() => buildDataset(MAX_GENERATED_RECORDS + 1)).toThrow(RangeError);
    expect(() => buildDataset(1, Number.NaN)).toThrow(RangeError);
  });

  it("validates normalized boxes and returns records with in-frame boxes", () => {
    const { records } = buildDataset(40);
    for (const record of records) {
      for (const object of record.objects) {
        expect(object.box2D.x).toBeGreaterThanOrEqual(0);
        expect(object.box2D.y).toBeGreaterThanOrEqual(0);
        expect(object.box2D.x + object.box2D.width).toBeLessThanOrEqual(1);
        expect(object.box2D.y + object.box2D.height).toBeLessThanOrEqual(1);
      }
    }

    records[0].objects[0].box2D.x = -0.1;
    expect(isValidRecord(records[0])).toBe(false);
  });

  it("ships valid JSONL records with normalized image boxes", () => {
    const shards = readdirSync(dataDirectory).filter((file) => file.endsWith(".jsonl"));
    let recordCount = 0;

    for (const shard of shards) {
      const content = readFileSync(join(dataDirectory, shard), "utf8").trim();
      for (const line of content.split(/\r?\n/)) {
        const record = JSON.parse(line) as DatasetRecord;
        const errors = validateRecordValidator(record).filter((issue) => issue.severity === "error");
        expect(
          errors.map((issue) => issue.code),
          `${shard}: ${record.id}`,
        ).toEqual([]);
        expect(isValidRecord(record), `${shard}: ${record.id}`).toBe(true);
        recordCount++;
      }
    }

    expect(recordCount).toBe(160);
  });
});
