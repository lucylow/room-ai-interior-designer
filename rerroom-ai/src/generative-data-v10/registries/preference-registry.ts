import { PREFERENCE_BATCH_01 } from "../preference/preference-batch-01";
import { PREFERENCE_BATCH_02 } from "../preference/preference-batch-02";
import { PREFERENCE_BATCH_03 } from "../preference/preference-batch-03";
import { PREFERENCE_BATCH_04 } from "../preference/preference-batch-04";
import { PREFERENCE_BATCH_05 } from "../preference/preference-batch-05";
import { PREFERENCE_BATCH_06 } from "../preference/preference-batch-06";
import { PREFERENCE_BATCH_07 } from "../preference/preference-batch-07";
import { PREFERENCE_BATCH_08 } from "../preference/preference-batch-08";
import { PREFERENCE_BATCH_09 } from "../preference/preference-batch-09";
import { PREFERENCE_BATCH_10 } from "../preference/preference-batch-10";

import type { PreferenceExample } from "../core/types";

export const ALL_PREFERENCE: PreferenceExample[] = [
  ...PREFERENCE_BATCH_01,
  ...PREFERENCE_BATCH_02,
  ...PREFERENCE_BATCH_03,
  ...PREFERENCE_BATCH_04,
  ...PREFERENCE_BATCH_05,
  ...PREFERENCE_BATCH_06,
  ...PREFERENCE_BATCH_07,
  ...PREFERENCE_BATCH_08,
  ...PREFERENCE_BATCH_09,
  ...PREFERENCE_BATCH_10,
];
