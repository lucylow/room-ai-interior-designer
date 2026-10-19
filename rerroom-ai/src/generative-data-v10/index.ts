import type { DatasetSummary, DatasetFamily } from "./core/types";
import { VERSION } from "./core/factories";
import { ALL_GENERATION } from "./registries/generation-registry";
import { ALL_PREFERENCE } from "./registries/preference-registry";
import { ALL_CRITIQUE } from "./registries/critique-registry";
import { ALL_COUNTERFACTUAL } from "./registries/counterfactual-registry";
import { ALL_SPATIAL } from "./registries/spatial-registry";
import { ALL_TOOLTRACE } from "./registries/tooltrace-registry";
import { ALL_QUALITY } from "./registries/quality-registry";
import { ALL_SAFETY } from "./registries/safety-registry";
import { ALL_DIALOGUE } from "./registries/dialogue-registry";
import { ALL_RETAIL } from "./registries/retail-registry";
import { ALL_EVALUATION } from "./registries/evaluation-registry";
import { ALL_AUGMENTATION } from "./registries/augmentation-registry";
import { ALL_PROJECT } from "./registries/project-registry";
import { dedupeById, splitBy, summarizeCoverage, validateAll } from "./quality/dataset-audit";

export const GENERATIVE_DATA_V10 = {
  version: VERSION,
  generation: ALL_GENERATION,
  preference: ALL_PREFERENCE,
  critique: ALL_CRITIQUE,
  counterfactual: ALL_COUNTERFACTUAL,
  spatial: ALL_SPATIAL,
  tooltrace: ALL_TOOLTRACE,
  quality: ALL_QUALITY,
  safety: ALL_SAFETY,
  dialogue: ALL_DIALOGUE,
  retail: ALL_RETAIL,
  evaluation: ALL_EVALUATION,
  augmentation: ALL_AUGMENTATION,
  project: ALL_PROJECT,
};

export function auditV10(): DatasetSummary {
  const flatIds = [
    ...ALL_GENERATION, ...ALL_PREFERENCE, ...ALL_CRITIQUE, ...ALL_COUNTERFACTUAL,
    ...ALL_SPATIAL, ...ALL_TOOLTRACE, ...ALL_QUALITY, ...ALL_SAFETY, ...ALL_DIALOGUE,
    ...ALL_RETAIL, ...ALL_EVALUATION, ...ALL_AUGMENTATION, ...ALL_PROJECT,
  ].map((item) => item.id);
  const splitSources = ALL_GENERATION.concat(ALL_PROJECT).map((item) => item.split);
  const splitCounts = splitBy(splitSources);
  const validation = validateAll(GENERATIVE_DATA_V10);
  return {
    version: VERSION,
    counts: validation.counts as Record<DatasetFamily, number>,
    splitCounts,
    styleCoverage: summarizeCoverage([...ALL_GENERATION, ...ALL_PROJECT], "style"),
    roomCoverage: summarizeCoverage([...ALL_GENERATION, ...ALL_PROJECT], "roomType"),
    quality: { ...validation.quality, duplicateIds: flatIds.length - dedupeById(flatIds).length },
  };
}
