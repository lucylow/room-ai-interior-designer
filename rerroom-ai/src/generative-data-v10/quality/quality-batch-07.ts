import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_07: QualityExample[] = [
  {
    id: "v10_quality_07_00", task: "Evaluate art deco concept for bedroom.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.82, geometry: 0.95, usability: 0.86, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91072),
  },
  {
    id: "v10_quality_07_01", task: "Evaluate bohemian concept for dining room.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.84, geometry: 0.96, usability: 0.89, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91073),
  },
  {
    id: "v10_quality_07_02", task: "Evaluate modern concept for entryway.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.87, geometry: 0.97, usability: 0.92, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91074),
  },
  {
    id: "v10_quality_07_03", task: "Evaluate desert modern concept for nursery.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.90, geometry: 0.98, usability: 0.80, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91075),
  },
  {
    id: "v10_quality_07_04", task: "Evaluate quiet luxury concept for media room.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.92, geometry: 0.95, usability: 0.83, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91076),
  },
  {
    id: "v10_quality_07_05", task: "Evaluate industrial concept for reading nook.", predictedLabel: "minor_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.88, styleConsistency: 0.94, geometry: 0.96, usability: 0.86, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91077),
  },
  {
    id: "v10_quality_07_06", task: "Evaluate craft modern concept for basement.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.82, geometry: 0.97, usability: 0.89, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91078),
  },
  {
    id: "v10_quality_07_07", task: "Evaluate transitional concept for living room.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.84, geometry: 0.98, usability: 0.92, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91079),
  },
  {
    id: "v10_quality_07_08", task: "Evaluate organic modern concept for kitchen.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.87, geometry: 0.95, usability: 0.80, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91080),
  },
  {
    id: "v10_quality_07_09", task: "Evaluate naturalist concept for home office.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.90, geometry: 0.96, usability: 0.83, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91081),
  },
  {
    id: "v10_quality_07_10", task: "Evaluate soft industrial concept for bathroom.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.92, geometry: 0.97, usability: 0.86, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91082),
  },
  {
    id: "v10_quality_07_11", task: "Evaluate warm minimal concept for studio.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.94, geometry: 0.98, usability: 0.89, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91083),
  },
];
