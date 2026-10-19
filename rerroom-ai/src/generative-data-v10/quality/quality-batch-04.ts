import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_04: QualityExample[] = [
  {
    id: "v10_quality_04_00", task: "Evaluate scandinavian concept for home office.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.82, geometry: 0.95, usability: 0.83, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91036),
  },
  {
    id: "v10_quality_04_01", task: "Evaluate eclectic modern concept for bathroom.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.84, geometry: 0.96, usability: 0.86, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91037),
  },
  {
    id: "v10_quality_04_02", task: "Evaluate modern farmhouse concept for studio.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.87, geometry: 0.97, usability: 0.89, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91038),
  },
  {
    id: "v10_quality_04_03", task: "Evaluate mid century concept for guest room.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.90, geometry: 0.98, usability: 0.92, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91039),
  },
  {
    id: "v10_quality_04_04", task: "Evaluate urban soft concept for mudroom.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.92, geometry: 0.95, usability: 0.80, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91040),
  },
  {
    id: "v10_quality_04_05", task: "Evaluate new nordic concept for open plan.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.94, geometry: 0.96, usability: 0.83, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91041),
  },
  {
    id: "v10_quality_04_06", task: "Evaluate contemporary concept for bedroom.", predictedLabel: "major_fix", expectedLabel: "block",
    rubric: { composition: 0.82, styleConsistency: 0.82, geometry: 0.97, usability: 0.86, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91042),
  },
  {
    id: "v10_quality_04_07", task: "Evaluate minimalist concept for dining room.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.84, geometry: 0.98, usability: 0.89, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91043),
  },
  {
    id: "v10_quality_04_08", task: "Evaluate moody modern concept for entryway.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.87, geometry: 0.95, usability: 0.92, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91044),
  },
  {
    id: "v10_quality_04_09", task: "Evaluate coastal modern concept for nursery.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.90, geometry: 0.96, usability: 0.80, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91045),
  },
  {
    id: "v10_quality_04_10", task: "Evaluate japandi concept for media room.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.92, geometry: 0.97, usability: 0.83, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91046),
  },
  {
    id: "v10_quality_04_11", task: "Evaluate heritage modern concept for reading nook.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.94, geometry: 0.98, usability: 0.86, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91047),
  },
];
