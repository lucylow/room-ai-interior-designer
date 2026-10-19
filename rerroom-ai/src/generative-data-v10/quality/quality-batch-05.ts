import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_05: QualityExample[] = [
  {
    id: "v10_quality_05_00", task: "Evaluate art deco concept for basement.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.82, geometry: 0.95, usability: 0.89, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91048),
  },
  {
    id: "v10_quality_05_01", task: "Evaluate bohemian concept for living room.", predictedLabel: "minor_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.80, styleConsistency: 0.84, geometry: 0.96, usability: 0.92, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91049),
  },
  {
    id: "v10_quality_05_02", task: "Evaluate modern concept for kitchen.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.87, geometry: 0.97, usability: 0.80, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91050),
  },
  {
    id: "v10_quality_05_03", task: "Evaluate desert modern concept for home office.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.90, geometry: 0.98, usability: 0.83, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91051),
  },
  {
    id: "v10_quality_05_04", task: "Evaluate quiet luxury concept for bathroom.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.92, geometry: 0.95, usability: 0.86, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91052),
  },
  {
    id: "v10_quality_05_05", task: "Evaluate industrial concept for studio.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.94, geometry: 0.96, usability: 0.89, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91053),
  },
  {
    id: "v10_quality_05_06", task: "Evaluate craft modern concept for guest room.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.82, geometry: 0.97, usability: 0.92, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91054),
  },
  {
    id: "v10_quality_05_07", task: "Evaluate transitional concept for mudroom.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.84, geometry: 0.98, usability: 0.80, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91055),
  },
  {
    id: "v10_quality_05_08", task: "Evaluate organic modern concept for open plan.", predictedLabel: "pass", expectedLabel: "minor_fix",
    rubric: { composition: 0.78, styleConsistency: 0.87, geometry: 0.95, usability: 0.83, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91056),
  },
  {
    id: "v10_quality_05_09", task: "Evaluate naturalist concept for bedroom.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.90, geometry: 0.96, usability: 0.86, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91057),
  },
  {
    id: "v10_quality_05_10", task: "Evaluate soft industrial concept for dining room.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.92, geometry: 0.97, usability: 0.89, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91058),
  },
  {
    id: "v10_quality_05_11", task: "Evaluate warm minimal concept for entryway.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.94, geometry: 0.98, usability: 0.92, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91059),
  },
];
