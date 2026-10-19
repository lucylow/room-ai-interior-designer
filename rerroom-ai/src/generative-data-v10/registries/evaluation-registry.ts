import { EVALUATION_BATCH_01 } from "../evaluation/evaluation-batch-01";
import { EVALUATION_BATCH_02 } from "../evaluation/evaluation-batch-02";
import { EVALUATION_BATCH_03 } from "../evaluation/evaluation-batch-03";
import { EVALUATION_BATCH_04 } from "../evaluation/evaluation-batch-04";
import { EVALUATION_BATCH_05 } from "../evaluation/evaluation-batch-05";
import { EVALUATION_BATCH_06 } from "../evaluation/evaluation-batch-06";

import type { QualityExample } from "../core/types";

export const ALL_EVALUATION: QualityExample[] = [
  ...EVALUATION_BATCH_01,
  ...EVALUATION_BATCH_02,
  ...EVALUATION_BATCH_03,
  ...EVALUATION_BATCH_04,
  ...EVALUATION_BATCH_05,
  ...EVALUATION_BATCH_06,
];
