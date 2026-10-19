import { QUALITY_BATCH_01 } from "../quality/quality-batch-01";
import { QUALITY_BATCH_02 } from "../quality/quality-batch-02";
import { QUALITY_BATCH_03 } from "../quality/quality-batch-03";
import { QUALITY_BATCH_04 } from "../quality/quality-batch-04";
import { QUALITY_BATCH_05 } from "../quality/quality-batch-05";
import { QUALITY_BATCH_06 } from "../quality/quality-batch-06";
import { QUALITY_BATCH_07 } from "../quality/quality-batch-07";
import { QUALITY_BATCH_08 } from "../quality/quality-batch-08";

import type { QualityExample } from "../core/types";

export const ALL_QUALITY: QualityExample[] = [
  ...QUALITY_BATCH_01,
  ...QUALITY_BATCH_02,
  ...QUALITY_BATCH_03,
  ...QUALITY_BATCH_04,
  ...QUALITY_BATCH_05,
  ...QUALITY_BATCH_06,
  ...QUALITY_BATCH_07,
  ...QUALITY_BATCH_08,
];
