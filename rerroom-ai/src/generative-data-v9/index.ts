import type { DatasetRecord, PreferenceRecord, FeedbackRecord, SpatialGroundingRecord, QualityCase, RankingPair, BenchmarkCase } from "./core/types";
import { TRAINING_BATCH_01 } from "./training/generation-training-01";
import { TRAINING_BATCH_02 } from "./training/generation-training-02";
import { TRAINING_BATCH_03 } from "./training/generation-training-03";
import { TRAINING_BATCH_04 } from "./training/generation-training-04";
import { TRAINING_BATCH_05 } from "./training/generation-training-05";
import { TRAINING_BATCH_06 } from "./training/generation-training-06";
import { TRAINING_BATCH_07 } from "./training/generation-training-07";
import { TRAINING_BATCH_08 } from "./training/generation-training-08";
import { TRAINING_BATCH_09 } from "./training/generation-training-09";
import { TRAINING_BATCH_10 } from "./training/generation-training-10";
import { TRAINING_BATCH_11 } from "./training/generation-training-11";
import { TRAINING_BATCH_12 } from "./training/generation-training-12";
import { TRAINING_BATCH_13 } from "./training/generation-training-13";
import { TRAINING_BATCH_14 } from "./training/generation-training-14";
import { TRAINING_BATCH_15 } from "./training/generation-training-15";
import { TRAINING_BATCH_16 } from "./training/generation-training-16";
import { TRAINING_BATCH_17 } from "./training/generation-training-17";
import { TRAINING_BATCH_18 } from "./training/generation-training-18";
import { TRAINING_BATCH_19 } from "./training/generation-training-19";
import { TRAINING_BATCH_20 } from "./training/generation-training-20";
import { TRAINING_BATCH_21 } from "./training/generation-training-21";
import { TRAINING_BATCH_22 } from "./training/generation-training-22";
import { TRAINING_BATCH_23 } from "./training/generation-training-23";
import { TRAINING_BATCH_24 } from "./training/generation-training-24";
import { PREFERENCE_BATCH_01 } from "./preferences/preference-batch-01";
import { PREFERENCE_BATCH_02 } from "./preferences/preference-batch-02";
import { PREFERENCE_BATCH_03 } from "./preferences/preference-batch-03";
import { PREFERENCE_BATCH_04 } from "./preferences/preference-batch-04";
import { PREFERENCE_BATCH_05 } from "./preferences/preference-batch-05";
import { PREFERENCE_BATCH_06 } from "./preferences/preference-batch-06";
import { PREFERENCE_BATCH_07 } from "./preferences/preference-batch-07";
import { PREFERENCE_BATCH_08 } from "./preferences/preference-batch-08";
import { PREFERENCE_BATCH_09 } from "./preferences/preference-batch-09";
import { PREFERENCE_BATCH_10 } from "./preferences/preference-batch-10";
import { PREFERENCE_BATCH_11 } from "./preferences/preference-batch-11";
import { PREFERENCE_BATCH_12 } from "./preferences/preference-batch-12";
import { FEEDBACK_BATCH_01 } from "./feedback/feedback-batch-01";
import { FEEDBACK_BATCH_02 } from "./feedback/feedback-batch-02";
import { FEEDBACK_BATCH_03 } from "./feedback/feedback-batch-03";
import { FEEDBACK_BATCH_04 } from "./feedback/feedback-batch-04";
import { FEEDBACK_BATCH_05 } from "./feedback/feedback-batch-05";
import { FEEDBACK_BATCH_06 } from "./feedback/feedback-batch-06";
import { FEEDBACK_BATCH_07 } from "./feedback/feedback-batch-07";
import { FEEDBACK_BATCH_08 } from "./feedback/feedback-batch-08";
import { FEEDBACK_BATCH_09 } from "./feedback/feedback-batch-09";
import { FEEDBACK_BATCH_10 } from "./feedback/feedback-batch-10";
import { FEEDBACK_BATCH_11 } from "./feedback/feedback-batch-11";
import { FEEDBACK_BATCH_12 } from "./feedback/feedback-batch-12";
import { SPATIAL_BATCH_01 } from "./spatial/spatial-grounding-01";
import { SPATIAL_BATCH_02 } from "./spatial/spatial-grounding-02";
import { SPATIAL_BATCH_03 } from "./spatial/spatial-grounding-03";
import { SPATIAL_BATCH_04 } from "./spatial/spatial-grounding-04";
import { SPATIAL_BATCH_05 } from "./spatial/spatial-grounding-05";
import { SPATIAL_BATCH_06 } from "./spatial/spatial-grounding-06";
import { SPATIAL_BATCH_07 } from "./spatial/spatial-grounding-07";
import { SPATIAL_BATCH_08 } from "./spatial/spatial-grounding-08";
import { QUALITY_BATCH_01 } from "./quality/quality-cases-01";
import { QUALITY_BATCH_02 } from "./quality/quality-cases-02";
import { QUALITY_BATCH_03 } from "./quality/quality-cases-03";
import { QUALITY_BATCH_04 } from "./quality/quality-cases-04";
import { QUALITY_BATCH_05 } from "./quality/quality-cases-05";
import { QUALITY_BATCH_06 } from "./quality/quality-cases-06";
import { QUALITY_BATCH_07 } from "./quality/quality-cases-07";
import { QUALITY_BATCH_08 } from "./quality/quality-cases-08";
import { QUALITY_BATCH_09 } from "./quality/quality-cases-09";
import { QUALITY_BATCH_10 } from "./quality/quality-cases-10";
import { RANKING_BATCH_01 } from "./ranking/ranking-batch-01";
import { RANKING_BATCH_02 } from "./ranking/ranking-batch-02";
import { RANKING_BATCH_03 } from "./ranking/ranking-batch-03";
import { RANKING_BATCH_04 } from "./ranking/ranking-batch-04";
import { RANKING_BATCH_05 } from "./ranking/ranking-batch-05";
import { RANKING_BATCH_06 } from "./ranking/ranking-batch-06";
import { RANKING_BATCH_07 } from "./ranking/ranking-batch-07";
import { RANKING_BATCH_08 } from "./ranking/ranking-batch-08";
import { RANKING_BATCH_09 } from "./ranking/ranking-batch-09";
import { RANKING_BATCH_10 } from "./ranking/ranking-batch-10";
import { PROMPT_TEMPLATE_BATCH_01 } from "./prompting/prompt-templates-01";
import { PROMPT_TEMPLATE_BATCH_02 } from "./prompting/prompt-templates-02";
import { PROMPT_TEMPLATE_BATCH_03 } from "./prompting/prompt-templates-03";
import { PROMPT_TEMPLATE_BATCH_04 } from "./prompting/prompt-templates-04";
import { PROMPT_TEMPLATE_BATCH_05 } from "./prompting/prompt-templates-05";
import { PROMPT_TEMPLATE_BATCH_06 } from "./prompting/prompt-templates-06";
import { PROMPT_TEMPLATE_BATCH_07 } from "./prompting/prompt-templates-07";
import { PROMPT_TEMPLATE_BATCH_08 } from "./prompting/prompt-templates-08";
import { PROMPT_TEMPLATE_BATCH_09 } from "./prompting/prompt-templates-09";
import { PROMPT_TEMPLATE_BATCH_10 } from "./prompting/prompt-templates-10";
import { BENCHMARK_BATCH_01 } from "./benchmarks/benchmark-batch-01";
import { BENCHMARK_BATCH_02 } from "./benchmarks/benchmark-batch-02";
import { BENCHMARK_BATCH_03 } from "./benchmarks/benchmark-batch-03";
import { BENCHMARK_BATCH_04 } from "./benchmarks/benchmark-batch-04";
import { BENCHMARK_BATCH_05 } from "./benchmarks/benchmark-batch-05";
import { BENCHMARK_BATCH_06 } from "./benchmarks/benchmark-batch-06";
import { BENCHMARK_BATCH_07 } from "./benchmarks/benchmark-batch-07";
import { BENCHMARK_BATCH_08 } from "./benchmarks/benchmark-batch-08";
import { BENCHMARK_BATCH_09 } from "./benchmarks/benchmark-batch-09";
import { BENCHMARK_BATCH_10 } from "./benchmarks/benchmark-batch-10";
import { DEMO_CASES_01 } from "./demo/demo-cases-01";
import { DEMO_CASES_02 } from "./demo/demo-cases-02";
import { DEMO_CASES_03 } from "./demo/demo-cases-03";
import { DEMO_CASES_04 } from "./demo/demo-cases-04";
import { DEMO_CASES_05 } from "./demo/demo-cases-05";
import { DEMO_CASES_06 } from "./demo/demo-cases-06";
import { DEMO_CASES_07 } from "./demo/demo-cases-07";
import { DEMO_CASES_08 } from "./demo/demo-cases-08";
import { DEMO_CASES_09 } from "./demo/demo-cases-09";
import { DEMO_CASES_10 } from "./demo/demo-cases-10";
import { DEMO_CASES_11 } from "./demo/demo-cases-11";
import { DEMO_CASES_12 } from "./demo/demo-cases-12";
import { DEMO_CASES_13 } from "./demo/demo-cases-13";
import { DEMO_CASES_14 } from "./demo/demo-cases-14";
import { DEMO_CASES_15 } from "./demo/demo-cases-15";
import { DEMO_CASES_16 } from "./demo/demo-cases-16";
import { DEMO_CASES_17 } from "./demo/demo-cases-17";
import { DEMO_CASES_18 } from "./demo/demo-cases-18";
import { DEMO_CASES_19 } from "./demo/demo-cases-19";
import { DEMO_CASES_20 } from "./demo/demo-cases-20";

export const GENERATIVE_DATA_V9 = {
  training: [
    ...TRAINING_BATCH_01,
    ...TRAINING_BATCH_02,
    ...TRAINING_BATCH_03,
    ...TRAINING_BATCH_04,
    ...TRAINING_BATCH_05,
    ...TRAINING_BATCH_06,
    ...TRAINING_BATCH_07,
    ...TRAINING_BATCH_08,
    ...TRAINING_BATCH_09,
    ...TRAINING_BATCH_10,
    ...TRAINING_BATCH_11,
    ...TRAINING_BATCH_12,
    ...TRAINING_BATCH_13,
    ...TRAINING_BATCH_14,
    ...TRAINING_BATCH_15,
    ...TRAINING_BATCH_16,
    ...TRAINING_BATCH_17,
    ...TRAINING_BATCH_18,
    ...TRAINING_BATCH_19,
    ...TRAINING_BATCH_20,
    ...TRAINING_BATCH_21,
    ...TRAINING_BATCH_22,
    ...TRAINING_BATCH_23,
    ...TRAINING_BATCH_24,
  ] as DatasetRecord[],
  preferences: [
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
    ...PREFERENCE_BATCH_11,
    ...PREFERENCE_BATCH_12,
  ] as PreferenceRecord[],
  feedback: [
    ...FEEDBACK_BATCH_01,
    ...FEEDBACK_BATCH_02,
    ...FEEDBACK_BATCH_03,
    ...FEEDBACK_BATCH_04,
    ...FEEDBACK_BATCH_05,
    ...FEEDBACK_BATCH_06,
    ...FEEDBACK_BATCH_07,
    ...FEEDBACK_BATCH_08,
    ...FEEDBACK_BATCH_09,
    ...FEEDBACK_BATCH_10,
    ...FEEDBACK_BATCH_11,
    ...FEEDBACK_BATCH_12,
  ] as FeedbackRecord[],
  spatial: [
    ...SPATIAL_BATCH_01,
    ...SPATIAL_BATCH_02,
    ...SPATIAL_BATCH_03,
    ...SPATIAL_BATCH_04,
    ...SPATIAL_BATCH_05,
    ...SPATIAL_BATCH_06,
    ...SPATIAL_BATCH_07,
    ...SPATIAL_BATCH_08,
  ] as SpatialGroundingRecord[],
  quality: [
    ...QUALITY_BATCH_01,
    ...QUALITY_BATCH_02,
    ...QUALITY_BATCH_03,
    ...QUALITY_BATCH_04,
    ...QUALITY_BATCH_05,
    ...QUALITY_BATCH_06,
    ...QUALITY_BATCH_07,
    ...QUALITY_BATCH_08,
    ...QUALITY_BATCH_09,
    ...QUALITY_BATCH_10,
  ] as QualityCase[],
  ranking: [
    ...RANKING_BATCH_01,
    ...RANKING_BATCH_02,
    ...RANKING_BATCH_03,
    ...RANKING_BATCH_04,
    ...RANKING_BATCH_05,
    ...RANKING_BATCH_06,
    ...RANKING_BATCH_07,
    ...RANKING_BATCH_08,
    ...RANKING_BATCH_09,
    ...RANKING_BATCH_10,
  ] as RankingPair[],
  benchmarks: [
    ...BENCHMARK_BATCH_01,
    ...BENCHMARK_BATCH_02,
    ...BENCHMARK_BATCH_03,
    ...BENCHMARK_BATCH_04,
    ...BENCHMARK_BATCH_05,
    ...BENCHMARK_BATCH_06,
    ...BENCHMARK_BATCH_07,
    ...BENCHMARK_BATCH_08,
    ...BENCHMARK_BATCH_09,
    ...BENCHMARK_BATCH_10,
  ] as BenchmarkCase[],
};
