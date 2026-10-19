import { describe, expect, it } from "vitest";
import {
  applyMetadataHardCase,
  auditPrivacy,
  evaluateScene,
  fromJsonl,
  generateBatch,
  generateDataset,
  generateScene,
  toCocoLike,
  toJsonl,
  toPrivacyAuditedJsonl,
  validateScene,
} from "../../computer-vision-v22";
import type { SceneAnnotation } from "../../computer-vision-v22";

describe("Computer Vision Dataset V22", () => {
  it("generates deterministic multimodal annotations with valid geometry", () => {
    const first = generateScene(42, "scene-42", "train", ["mirror_reflection"]);
    expect(generateScene(42, "scene-42", "train", ["mirror_reflection"])).toEqual(first);
    expect(validateScene(first)).toMatchObject({ valid: true });
    expect(first.instances[0].box2D.width).toBeGreaterThan(0);
    expect(first.structuralPlanes).toHaveLength(2);
    expect(first.room.areaM2).toBeCloseTo(first.room.widthM * first.room.lengthM, 1);
  });

  it("generates a deterministic 1,000-record dataset with disjoint splits", () => {
    const dataset = generateDataset(2026);
    expect(dataset.records).toHaveLength(1000);
    expect(dataset.splits).toEqual({ train: 700, validation: 150, test: 150, challenge: 0 });
    expect(dataset.records.filter((record) => record.split === "train")).toHaveLength(700);
    expect(dataset.records.filter((record) => record.split === "validation")).toHaveLength(150);
    expect(dataset.records.filter((record) => record.split === "test")).toHaveLength(150);
    expect(new Set(dataset.records.map((record) => record.id)).size).toBe(1000);
    expect(generateDataset(2026).records).toEqual(dataset.records);
  });

  it("reports broken geometry, missing relation targets, and inadequate clearance", () => {
    const scene = generateScene(17, "invalid");
    scene.instances[0].box2D.x = 0.9;
    scene.relations[0].objectId = "missing-object";
    scene.topology.walkways[0].clearanceM = 0.3;
    const report = validateScene(scene);
    expect(report.valid).toBe(false);
    expect(report.issues.map(({ code }) => code)).toEqual(
      expect.arrayContaining(["2d_box_out_of_bounds", "dangling_relation", "insufficient_walkway_clearance"]),
    );
  });

  it("only adds deterministic metadata for hard-case augmentation", () => {
    const scene = generateScene(9, "augment-me");
    const augmented = applyMetadataHardCase(scene, "depth_dropout", 123);
    expect(augmented.hardCases).toContain("depth_dropout");
    expect(augmented.augmentations).toEqual([{ kind: "depth_dropout", seed: 123, appliedAt: "metadata" }]);
    expect(augmented.depth).toEqual(scene.depth);
    expect(augmented.instances).toEqual(scene.instances);
    expect(scene.hardCases).not.toContain("depth_dropout");
  });

  it("exports and imports JSONL with schema validation", () => {
    const scenes = generateBatch(100, 3, "validation");
    const encoded = toJsonl(scenes);
    expect(encoded.trim().split(/\r?\n/)).toHaveLength(3);
    expect(fromJsonl(encoded)).toEqual(scenes);
    expect(() => fromJsonl('{"schemaVersion":"wrong"}')).toThrow("invalid_scene_row:1");
    expect(() => fromJsonl("{")).toThrow("invalid_jsonl_row:1");
  });

  it("adapts normalized boxes to pixel-space COCO-like annotations", () => {
    const scene = generateScene(42, "coco-scene");
    scene.privacy.classification = "exportable";
    const coco = toCocoLike([scene]);
    expect(coco.images[0].metadata.synthetic_metadata_only).toBe(true);
    expect(coco.annotations).toHaveLength(scene.instances.length);
    expect(coco.annotations[0].bbox[0]).toBeCloseTo(scene.instances[0].box2D.x * scene.camera.widthPx);
    expect(coco.annotations[0].attributes.cuboid3d_m.size).toEqual(scene.instances[0].cuboid3D.size);
  });

  it("blocks privacy-unsafe exports while allowing approved consented captures", () => {
    const scene = generateScene(7, "private-scene");
    expect(auditPrivacy([scene]).allowed).toBe(false);
    expect(() => toPrivacyAuditedJsonl([scene])).toThrow("privacy_audit_blocked");
    scene.source = "captured";
    scene.privacy = {
      classification: "exportable",
      captureConsent: true,
      containsPersonalData: false,
      preciseLocationPresent: false,
    };
    expect(auditPrivacy([scene])).toEqual({ allowed: true, checked: 1, errors: [] });
    expect(fromJsonl(toPrivacyAuditedJsonl([scene]))).toEqual([scene]);
  });

  it("reports malformed records and rejects invalid evaluation or export inputs", () => {
    const invalid = generateScene(18, "invalid-boundary");
    invalid.instances[0].box2D.x = 1;
    const valid = generateScene(19, "valid-boundary");

    expect(auditPrivacy([null as unknown as SceneAnnotation, invalid])).toMatchObject({
      allowed: false,
      checked: 2,
    });
    expect(auditPrivacy([null as unknown as SceneAnnotation]).errors[0]).toContain("invalid_scene_schema");
    expect(() => toJsonl([null as unknown as SceneAnnotation])).toThrow(
      "invalid_scene_export:row_1:unknown:invalid_scene_shape",
    );
    expect(() => evaluateScene(invalid, valid)).toThrow("invalid_prediction_scene:");
    expect(() => evaluateScene(valid, invalid)).toThrow("invalid_ground_truth_scene:");
  });

  it("measures detection, spatial, reconstruction, hard-case, and tour quality", () => {
    const truth = generateScene(12, "shared", "test", ["low_light", "clutter"]);
    const evaluation = evaluateScene(truth, structuredClone(truth));
    expect(evaluation.detectionPrecision).toBe(1);
    expect(evaluation.detectionRecall).toBe(1);
    expect(evaluation.cuboidCenterErrorM).toBe(0);
    expect(evaluation.roomAreaErrorM2).toBe(0);
    expect(evaluation.furnitureOrientationErrorRadians).toBe(0);
    expect(evaluation.floorplanAreaErrorM2).toBe(0);
    expect(evaluation.roomDimensionErrorM).toBe(0);
    expect(evaluation.walkwayClearancePassRate).toBe(1);
    expect(evaluation.panoramaCoverage).toBe(1);
    expect(evaluation.hardCaseRecall).toBe(1);
  });
});
