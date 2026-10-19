import { AUGMENTATION_BATCH_01 } from "../augmentation/augmentation-batch-01";
import { AUGMENTATION_BATCH_02 } from "../augmentation/augmentation-batch-02";
import { AUGMENTATION_BATCH_03 } from "../augmentation/augmentation-batch-03";
import { AUGMENTATION_BATCH_04 } from "../augmentation/augmentation-batch-04";
import { AUGMENTATION_BATCH_05 } from "../augmentation/augmentation-batch-05";
import { AUGMENTATION_BATCH_06 } from "../augmentation/augmentation-batch-06";
import { AUGMENTATION_BATCH_07 } from "../augmentation/augmentation-batch-07";
import { AUGMENTATION_BATCH_08 } from "../augmentation/augmentation-batch-08";

import type { CounterfactualExample } from "../core/types";

export const ALL_AUGMENTATION: CounterfactualExample[] = [
  ...AUGMENTATION_BATCH_01,
  ...AUGMENTATION_BATCH_02,
  ...AUGMENTATION_BATCH_03,
  ...AUGMENTATION_BATCH_04,
  ...AUGMENTATION_BATCH_05,
  ...AUGMENTATION_BATCH_06,
  ...AUGMENTATION_BATCH_07,
  ...AUGMENTATION_BATCH_08,
];
