import { TOOLTRACE_BATCH_01 } from "../tooltrace/tooltrace-batch-01";
import { TOOLTRACE_BATCH_02 } from "../tooltrace/tooltrace-batch-02";
import { TOOLTRACE_BATCH_03 } from "../tooltrace/tooltrace-batch-03";
import { TOOLTRACE_BATCH_04 } from "../tooltrace/tooltrace-batch-04";
import { TOOLTRACE_BATCH_05 } from "../tooltrace/tooltrace-batch-05";
import { TOOLTRACE_BATCH_06 } from "../tooltrace/tooltrace-batch-06";
import { TOOLTRACE_BATCH_07 } from "../tooltrace/tooltrace-batch-07";
import { TOOLTRACE_BATCH_08 } from "../tooltrace/tooltrace-batch-08";

import type { ToolTraceExample } from "../core/types";

export const ALL_TOOLTRACE: ToolTraceExample[] = [
  ...TOOLTRACE_BATCH_01,
  ...TOOLTRACE_BATCH_02,
  ...TOOLTRACE_BATCH_03,
  ...TOOLTRACE_BATCH_04,
  ...TOOLTRACE_BATCH_05,
  ...TOOLTRACE_BATCH_06,
  ...TOOLTRACE_BATCH_07,
  ...TOOLTRACE_BATCH_08,
];
