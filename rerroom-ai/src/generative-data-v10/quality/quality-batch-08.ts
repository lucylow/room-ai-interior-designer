import type { QualityExample } from "../core/types";
import {  provenance } from "../core/factories";

export const QUALITY_BATCH_08: QualityExample[] = [
  {
    id: "v10_quality_08_00", task: "Evaluate scandinavian concept for guest room.", predictedLabel: "pass", expectedLabel: "minor_fix",
    rubric: { composition: 0.86, styleConsistency: 0.82, geometry: 0.95, usability: 0.92, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91084),
  },
  {
    id: "v10_quality_08_01", task: "Evaluate eclectic modern concept for mudroom.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.84, geometry: 0.96, usability: 0.80, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91085),
  },
  {
    id: "v10_quality_08_02", task: "Evaluate modern farmhouse concept for open plan.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.87, geometry: 0.97, usability: 0.83, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91086),
  },
  {
    id: "v10_quality_08_03", task: "Evaluate mid century concept for bedroom.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.90, geometry: 0.98, usability: 0.86, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91087),
  },
  {
    id: "v10_quality_08_04", task: "Evaluate urban soft concept for dining room.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.78, styleConsistency: 0.92, geometry: 0.95, usability: 0.89, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91088),
  },
  {
    id: "v10_quality_08_05", task: "Evaluate new nordic concept for entryway.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.80, styleConsistency: 0.94, geometry: 0.96, usability: 0.92, budget: 0.89 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91089),
  },
  {
    id: "v10_quality_08_06", task: "Evaluate contemporary concept for nursery.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.82, styleConsistency: 0.82, geometry: 0.97, usability: 0.80, budget: 0.91 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: true, provenance: provenance(91090),
  },
  {
    id: "v10_quality_08_07", task: "Evaluate minimalist concept for media room.", predictedLabel: "block", expectedLabel: "pass",
    rubric: { composition: 0.84, styleConsistency: 0.84, geometry: 0.98, usability: 0.83, budget: 0.76 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91091),
  },
  {
    id: "v10_quality_08_08", task: "Evaluate moody modern concept for reading nook.", predictedLabel: "pass", expectedLabel: "pass",
    rubric: { composition: 0.86, styleConsistency: 0.87, geometry: 0.95, usability: 0.86, budget: 0.79 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91092),
  },
  {
    id: "v10_quality_08_09", task: "Evaluate coastal modern concept for basement.", predictedLabel: "minor_fix", expectedLabel: "minor_fix",
    rubric: { composition: 0.88, styleConsistency: 0.90, geometry: 0.96, usability: 0.89, budget: 0.81 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91093),
  },
  {
    id: "v10_quality_08_10", task: "Evaluate japandi concept for living room.", predictedLabel: "major_fix", expectedLabel: "major_fix",
    rubric: { composition: 0.90, styleConsistency: 0.92, geometry: 0.97, usability: 0.92, budget: 0.83 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91094),
  },
  {
    id: "v10_quality_08_11", task: "Evaluate heritage modern concept for kitchen.", predictedLabel: "block", expectedLabel: "block",
    rubric: { composition: 0.92, styleConsistency: 0.94, geometry: 0.98, usability: 0.80, budget: 0.86 },
    evidence: ["style tokens aligned", "spatial constraints evaluated", "palette contrast measured", "render metadata present"], humanReviewRequired: false, provenance: provenance(91095),
  },
];
