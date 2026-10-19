import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_03: QualityExample[] = [
  {
    id: "v10_quality_03_00", task: "Evaluate art deco concept for guest room.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.82, geometry: 0.95, usability: 0.92, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91024),
  },
  {
    id: "v10_quality_03_01", task: "Evaluate bohemian concept for mudroom.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.84, geometry: 0.96, usability: 0.80, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91025),
  },
  {
    id: "v10_quality_03_02", task: "Evaluate modern concept for open plan.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.87, geometry: 0.97, usability: 0.83, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91026),
  },
  {
    id: "v10_quality_03_03", task: "Evaluate desert modern concept for bedroom.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.90, geometry: 0.98, usability: 0.86, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91027),
  },
  {
    id: "v10_quality_03_04", task: "Evaluate quiet luxury concept for dining room.", predictedLabel: "pass", expectedLabel: "minor_fix",
    rubric: { composition: 0.86, styleConsistency: 0.92, geometry: 0.95, usability: 0.89, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91028),
  },
  {
    id: "v10_quality_03_05", task: "Evaluate industrial concept for entryway.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.94, geometry: 0.96, usability: 0.92, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91029),
  },
  {
    id: "v10_quality_03_06", task: "Evaluate craft modern concept for nursery.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.82, geometry: 0.97, usability: 0.80, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91030),
  },
  {
    id: "v10_quality_03_07", task: "Evaluate transitional concept for media room.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.84, geometry: 0.98, usability: 0.83, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91031),
  },
  {
    id: "v10_quality_03_08", task: "Evaluate organic modern concept for reading nook.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.87, geometry: 0.95, usability: 0.86, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91032),
  },
  {
    id: "v10_quality_03_09", task: "Evaluate naturalist concept for basement.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.90, geometry: 0.96, usability: 0.89, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91033),
  },
  {
    id: "v10_quality_03_10", task: "Evaluate soft industrial concept for living room.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.92, geometry: 0.97, usability: 0.92, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91034),
  },
  {
    id: "v10_quality_03_11", task: "Evaluate warm minimal concept for kitchen.", predictedLabel: "block", expectedLabel: "pass",
    rubric: { composition: 0.84, styleConsistency: 0.94, geometry: 0.98, usability: 0.80, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91035),
  },
];
