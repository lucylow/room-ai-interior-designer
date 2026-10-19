import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_02: QualityExample[] = [
  {
    id: "v10_quality_02_00", task: "Evaluate scandinavian concept for bedroom.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.82, geometry: 0.95, usability: 0.86, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91012),
  },
  {
    id: "v10_quality_02_01", task: "Evaluate eclectic modern concept for dining room.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.84, geometry: 0.96, usability: 0.89, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91013),
  },
  {
    id: "v10_quality_02_02", task: "Evaluate modern farmhouse concept for entryway.", predictedLabel: "major_fix", expectedLabel: "block",
    rubric: { composition: 0.90, styleConsistency: 0.87, geometry: 0.97, usability: 0.92, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91014),
  },
  {
    id: "v10_quality_02_03", task: "Evaluate mid century concept for nursery.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.90, geometry: 0.98, usability: 0.80, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91015),
  },
  {
    id: "v10_quality_02_04", task: "Evaluate urban soft concept for media room.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.92, geometry: 0.95, usability: 0.83, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91016),
  },
  {
    id: "v10_quality_02_05", task: "Evaluate new nordic concept for reading nook.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.94, geometry: 0.96, usability: 0.86, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91017),
  },
  {
    id: "v10_quality_02_06", task: "Evaluate contemporary concept for basement.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.82, geometry: 0.97, usability: 0.89, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91018),
  },
  {
    id: "v10_quality_02_07", task: "Evaluate minimalist concept for living room.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.84, styleConsistency: 0.84, geometry: 0.98, usability: 0.92, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91019),
  },
  {
    id: "v10_quality_02_08", task: "Evaluate moody modern concept for kitchen.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.87, geometry: 0.95, usability: 0.80, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91020),
  },
  {
    id: "v10_quality_02_09", task: "Evaluate coastal modern concept for home office.", predictedLabel: "minor_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.88, styleConsistency: 0.90, geometry: 0.96, usability: 0.83, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91021),
  },
  {
    id: "v10_quality_02_10", task: "Evaluate japandi concept for bathroom.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.92, geometry: 0.97, usability: 0.86, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91022),
  },
  {
    id: "v10_quality_02_11", task: "Evaluate heritage modern concept for studio.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.94, geometry: 0.98, usability: 0.89, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91023),
  },
];
