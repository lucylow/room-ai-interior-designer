import { SAFETY_BATCH_01 } from "../safety/safety-batch-01";
import { SAFETY_BATCH_02 } from "../safety/safety-batch-02";
import { SAFETY_BATCH_03 } from "../safety/safety-batch-03";
import { SAFETY_BATCH_04 } from "../safety/safety-batch-04";
import { SAFETY_BATCH_05 } from "../safety/safety-batch-05";
import { SAFETY_BATCH_06 } from "../safety/safety-batch-06";

import type { SafetyExample } from "../core/types";

export const ALL_SAFETY: SafetyExample[] = [
  ...SAFETY_BATCH_01,
  ...SAFETY_BATCH_02,
  ...SAFETY_BATCH_03,
  ...SAFETY_BATCH_04,
  ...SAFETY_BATCH_05,
  ...SAFETY_BATCH_06,
];
