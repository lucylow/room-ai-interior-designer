import { DIALOGUE_BATCH_01 } from "../dialogue/dialogue-batch-01";
import { DIALOGUE_BATCH_02 } from "../dialogue/dialogue-batch-02";
import { DIALOGUE_BATCH_03 } from "../dialogue/dialogue-batch-03";
import { DIALOGUE_BATCH_04 } from "../dialogue/dialogue-batch-04";
import { DIALOGUE_BATCH_05 } from "../dialogue/dialogue-batch-05";
import { DIALOGUE_BATCH_06 } from "../dialogue/dialogue-batch-06";
import { DIALOGUE_BATCH_07 } from "../dialogue/dialogue-batch-07";
import { DIALOGUE_BATCH_08 } from "../dialogue/dialogue-batch-08";

import type { DialogueExample } from "../core/types";

export const ALL_DIALOGUE: DialogueExample[] = [
  ...DIALOGUE_BATCH_01,
  ...DIALOGUE_BATCH_02,
  ...DIALOGUE_BATCH_03,
  ...DIALOGUE_BATCH_04,
  ...DIALOGUE_BATCH_05,
  ...DIALOGUE_BATCH_06,
  ...DIALOGUE_BATCH_07,
  ...DIALOGUE_BATCH_08,
];
