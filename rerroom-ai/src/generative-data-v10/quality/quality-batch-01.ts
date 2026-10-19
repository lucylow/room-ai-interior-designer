import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_01: QualityExample[] = [
  {
    id: "v10_quality_01_00", task: "Evaluate art deco concept for nursery.", predictedLabel: "pass", expectedLabel: "minor_fix",
    rubric: { composition: 0.78, styleConsistency: 0.82, geometry: 0.95, usability: 0.80, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91000),
  },
  {
    id: "v10_quality_01_01", task: "Evaluate bohemian concept for media room.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.84, geometry: 0.96, usability: 0.83, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91001),
  },
  {
    id: "v10_quality_01_02", task: "Evaluate modern concept for reading nook.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.87, geometry: 0.97, usability: 0.86, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91002),
  },
  {
    id: "v10_quality_01_03", task: "Evaluate desert modern concept for basement.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.90, geometry: 0.98, usability: 0.89, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91003),
  },
  {
    id: "v10_quality_01_04", task: "Evaluate quiet luxury concept for living room.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.92, geometry: 0.95, usability: 0.92, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91004),
  },
  {
    id: "v10_quality_01_05", task: "Evaluate industrial concept for kitchen.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.94, geometry: 0.96, usability: 0.80, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91005),
  },
  {
    id: "v10_quality_01_06", task: "Evaluate craft modern concept for home office.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.82, geometry: 0.97, usability: 0.83, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91006),
  },
  {
    id: "v10_quality_01_07", task: "Evaluate transitional concept for bathroom.", predictedLabel: "block", expectedLabel: "pass",
    rubric: { composition: 0.92, styleConsistency: 0.84, geometry: 0.98, usability: 0.86, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91007),
  },
  {
    id: "v10_quality_01_08", task: "Evaluate organic modern concept for studio.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.87, geometry: 0.95, usability: 0.89, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91008),
  },
  {
    id: "v10_quality_01_09", task: "Evaluate naturalist concept for guest room.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.90, geometry: 0.96, usability: 0.92, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91009),
  },
  {
    id: "v10_quality_01_10", task: "Evaluate soft industrial concept for mudroom.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.92, geometry: 0.97, usability: 0.80, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91010),
  },
  {
    id: "v10_quality_01_11", task: "Evaluate warm minimal concept for open plan.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.94, geometry: 0.98, usability: 0.83, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91011),
  },
];
