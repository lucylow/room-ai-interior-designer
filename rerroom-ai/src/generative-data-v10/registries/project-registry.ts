import { PROJECT_BATCH_01 } from "../project/project-batch-01";
import { PROJECT_BATCH_02 } from "../project/project-batch-02";
import { PROJECT_BATCH_03 } from "../project/project-batch-03";
import { PROJECT_BATCH_04 } from "../project/project-batch-04";
import { PROJECT_BATCH_05 } from "../project/project-batch-05";
import { PROJECT_BATCH_06 } from "../project/project-batch-06";

import type { GenerationExample } from "../core/types";

export const ALL_PROJECT: GenerationExample[] = [
  ...PROJECT_BATCH_01,
  ...PROJECT_BATCH_02,
  ...PROJECT_BATCH_03,
  ...PROJECT_BATCH_04,
  ...PROJECT_BATCH_05,
  ...PROJECT_BATCH_06,
];
