import { RETAIL_BATCH_01 } from "../retail/retail-batch-01";
import { RETAIL_BATCH_02 } from "../retail/retail-batch-02";
import { RETAIL_BATCH_03 } from "../retail/retail-batch-03";
import { RETAIL_BATCH_04 } from "../retail/retail-batch-04";
import { RETAIL_BATCH_05 } from "../retail/retail-batch-05";
import { RETAIL_BATCH_06 } from "../retail/retail-batch-06";

import type { RetailGroundingExample } from "../core/types";

export const ALL_RETAIL: RetailGroundingExample[] = [
  ...RETAIL_BATCH_01,
  ...RETAIL_BATCH_02,
  ...RETAIL_BATCH_03,
  ...RETAIL_BATCH_04,
  ...RETAIL_BATCH_05,
  ...RETAIL_BATCH_06,
];
