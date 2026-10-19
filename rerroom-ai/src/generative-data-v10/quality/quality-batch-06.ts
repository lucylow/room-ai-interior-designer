import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_06: QualityExample[] = [
  {
    id: "v10_quality_06_00", task: "Evaluate scandinavian concept for nursery.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.82, geometry: 0.95, usability: 0.80, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91060),
  },
  {
    id: "v10_quality_06_01", task: "Evaluate eclectic modern concept for media room.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.84, geometry: 0.96, usability: 0.83, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91061),
  },
  {
    id: "v10_quality_06_02", task: "Evaluate modern farmhouse concept for reading nook.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.87, geometry: 0.97, usability: 0.86, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91062),
  },
  {
    id: "v10_quality_06_03", task: "Evaluate mid century concept for basement.", predictedLabel: "block", expectedLabel: "pass",
    rubric: { composition: 0.92, styleConsistency: 0.90, geometry: 0.98, usability: 0.89, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91063),
  },
  {
    id: "v10_quality_06_04", task: "Evaluate urban soft concept for living room.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.92, geometry: 0.95, usability: 0.92, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91064),
  },
  {
    id: "v10_quality_06_05", task: "Evaluate new nordic concept for kitchen.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.94, geometry: 0.96, usability: 0.80, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91065),
  },
  {
    id: "v10_quality_06_06", task: "Evaluate contemporary concept for home office.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.82, geometry: 0.97, usability: 0.83, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91066),
  },
  {
    id: "v10_quality_06_07", task: "Evaluate minimalist concept for bathroom.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.84, geometry: 0.98, usability: 0.86, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91067),
  },
  {
    id: "v10_quality_06_08", task: "Evaluate moody modern concept for studio.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.87, geometry: 0.95, usability: 0.89, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91068),
  },
  {
    id: "v10_quality_06_09", task: "Evaluate coastal modern concept for guest room.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.90, geometry: 0.96, usability: 0.92, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91069),
  },
  {
    id: "v10_quality_06_10", task: "Evaluate japandi concept for mudroom.", predictedLabel: "major_fix", expectedLabel: "block",
    rubric: { composition: 0.90, styleConsistency: 0.92, geometry: 0.97, usability: 0.80, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91070),
  },
  {
    id: "v10_quality_06_11", task: "Evaluate heritage modern concept for open plan.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.94, geometry: 0.98, usability: 0.83, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91071),
  },
];
