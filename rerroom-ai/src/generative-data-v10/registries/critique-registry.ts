import { CRITIQUE_BATCH_01 } from "../critique/critique-batch-01";
import { CRITIQUE_BATCH_02 } from "../critique/critique-batch-02";
import { CRITIQUE_BATCH_03 } from "../critique/critique-batch-03";
import { CRITIQUE_BATCH_04 } from "../critique/critique-batch-04";
import { CRITIQUE_BATCH_05 } from "../critique/critique-batch-05";
import { CRITIQUE_BATCH_06 } from "../critique/critique-batch-06";
import { CRITIQUE_BATCH_07 } from "../critique/critique-batch-07";
import { CRITIQUE_BATCH_08 } from "../critique/critique-batch-08";
import { CRITIQUE_BATCH_09 } from "../critique/critique-batch-09";
import { CRITIQUE_BATCH_10 } from "../critique/critique-batch-10";

import type { CritiqueExample } from "../core/types";

export const ALL_CRITIQUE: CritiqueExample[] = [
  ...CRITIQUE_BATCH_01,
  ...CRITIQUE_BATCH_02,
  ...CRITIQUE_BATCH_03,
  ...CRITIQUE_BATCH_04,
  ...CRITIQUE_BATCH_05,
  ...CRITIQUE_BATCH_06,
  ...CRITIQUE_BATCH_07,
  ...CRITIQUE_BATCH_08,
  ...CRITIQUE_BATCH_09,
  ...CRITIQUE_BATCH_10,
];
