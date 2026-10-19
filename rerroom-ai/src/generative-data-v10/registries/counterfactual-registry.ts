import { COUNTERFACTUAL_BATCH_01 } from "../counterfactual/counterfactual-batch-01";
import { COUNTERFACTUAL_BATCH_02 } from "../counterfactual/counterfactual-batch-02";
import { COUNTERFACTUAL_BATCH_03 } from "../counterfactual/counterfactual-batch-03";
import { COUNTERFACTUAL_BATCH_04 } from "../counterfactual/counterfactual-batch-04";
import { COUNTERFACTUAL_BATCH_05 } from "../counterfactual/counterfactual-batch-05";
import { COUNTERFACTUAL_BATCH_06 } from "../counterfactual/counterfactual-batch-06";
import { COUNTERFACTUAL_BATCH_07 } from "../counterfactual/counterfactual-batch-07";
import { COUNTERFACTUAL_BATCH_08 } from "../counterfactual/counterfactual-batch-08";

import type { CounterfactualExample } from "../core/types";

export const ALL_COUNTERFACTUAL: CounterfactualExample[] = [
  ...COUNTERFACTUAL_BATCH_01,
  ...COUNTERFACTUAL_BATCH_02,
  ...COUNTERFACTUAL_BATCH_03,
  ...COUNTERFACTUAL_BATCH_04,
  ...COUNTERFACTUAL_BATCH_05,
  ...COUNTERFACTUAL_BATCH_06,
  ...COUNTERFACTUAL_BATCH_07,
  ...COUNTERFACTUAL_BATCH_08,
];
