import { GENERATIVE_DATA_V9 } from "../index";
import { dedupeRecords } from "../core/dataset-deduper";
import { balanceByRoomAndStyle } from "../core/dataset-balance";
import { metrics } from "../core/dataset-metrics";
import { evaluateDataset } from "../evaluation/dataset-evaluator";
import { consistency } from "../evaluation/pairwise-consistency";
import { groundingScore } from "../evaluation/grounding-evaluator";

export function buildV9DatasetDemo() {
  const deduped = dedupeRecords(GENERATIVE_DATA_V9.training);
  const balanced = balanceByRoomAndStyle(deduped, 8);
  return {
    sourceRecords: GENERATIVE_DATA_V9.training.length,
    dedupedRecords: deduped.length,
    balancedRecords: balanced.length,
    metrics: metrics(balanced),
    evaluation: evaluateDataset(balanced),
    rankingConsistency: consistency(GENERATIVE_DATA_V9.ranking),
    spatialGrounding: groundingScore(GENERATIVE_DATA_V9.spatial),
    readyForDemo: balanced.length > 0,
  };
}
