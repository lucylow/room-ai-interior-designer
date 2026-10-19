import {
  KeyframeSelector,
  buildOverlapGraph,
  graphStats,
  demoFrames,
  demoCameras,
  demoGaussians,
  detectOutliers,
  global_consistency_score_result,
  gate,
  V12Orchestrator,
  chooseBudget,
  schedule,
  scrub,
  stripSensitiveSemantics,
  defaultPolicy,
  validateFrameUpload,
  temporal_smoothing_rolling,
} from "../src/gaussian-splatting-v12";
import type { RenderRequest, Gaussian } from "../src/gaussian-splatting-v12";

type QualityTier = RenderRequest["quality"];

export interface GaussianSplattingV12Report {
  version: "v12";
  frameCount: number;
  keyframeCount: number;
  overlapEdges: number;
  gaussianCount: number;
  outlierCount: number;
  globalConsistency: number;
  qualityGate: ReturnType<typeof gate>;
  uploadAllowed: boolean;
  privacyScrubbed: boolean;
  readyForDemo: boolean;
}

export function getGaussianSplattingV12Report(): GaussianSplattingV12Report {
  const frames = demoFrames(240);
  const keyframes = new KeyframeSelector(250, 120).select(frames);
  const overlaps = buildOverlapGraph(frames);
  const gaussians = demoGaussians(3200);
  const outliers = detectOutliers(gaussians);
  const consistency = global_consistency_score_result("v12-demo-consistency", [0.94, 0.95, 0.93, 0.96]);
  const quality = gate({
    coverage: 0.94,
    blur: 0.08,
    reprojectionError: 0.72,
    loopClosure: 0.91,
    gaussianCount: gaussians.length,
    temporalStability: 0.9,
  });
  const upload = validateFrameUpload(defaultPolicy(), frames.length, 240 * 640 * 480 * 3);
  return {
    version: "v12",
    frameCount: frames.length,
    keyframeCount: keyframes.length,
    overlapEdges: overlaps.length,
    gaussianCount: gaussians.length,
    outlierCount: outliers.length,
    globalConsistency: Number(consistency.score.toFixed(3)),
    qualityGate: quality,
    uploadAllowed: upload.allowed,
    privacyScrubbed: scrub(gaussians).every((splat) => !splat.sourceFrame),
    readyForDemo:
      keyframes.length > 0 &&
      overlaps.length > 0 &&
      outliers.length === 0 &&
      consistency.score > 0.8 &&
      quality.passed,
  };
}

export function selectGaussianKeyframesV12(count = 40) {
  const safeCount = Number.isFinite(count) ? Math.max(1, Math.min(120, Math.floor(count))) : 40;
  return new KeyframeSelector(250, safeCount).select(demoFrames(240));
}

export function getGaussianOverlapStatsV12() {
  return graphStats(buildOverlapGraph(demoFrames(240)));
}

export function planGaussianBudgetV12(quality: QualityTier = "preview") {
  const safeQuality: RenderRequest["quality"] = ["preview", "balanced", "high", "ultra"].includes(quality)
    ? quality
    : "preview";
  return chooseBudget(
    { camera: demoCameras(12)[0], width: 640, height: 480, quality: safeQuality, maxGaussians: 3200 },
    { gpuMs: 14, memoryMb: 768 },
  );
}

export function scheduleGaussianPagesV12(budgetBytes = 256_000) {
  const tasks = Array.from({ length: 8 }, (_, index) => ({
    id: `v12-page-${index}`,
    bytes: 48_000 + index * 4_000,
    priority: 1 - index * 0.08,
    deadlineMs: index * 120,
    kind: index < 6 ? ("geometry" as const) : ("semantic" as const),
  }));
  return schedule(tasks, Math.max(16_000, Math.min(2_000_000, Math.floor(budgetBytes))));
}

export function scrubGaussianSceneV12(gaussians: Gaussian[] = demoGaussians(3200)) {
  return stripSensitiveSemantics(scrub(Array.isArray(gaussians) ? gaussians : []));
}

export function startGaussianReconstructionV12(jobId = "v12-demo-job") {
  const orchestrator = new V12Orchestrator();
  const started = orchestrator.start(String(jobId).slice(0, 80));
  return { started, nextStage: orchestrator.next(), stages: V12Orchestrator.stages() };
}

export function runGaussianQualityGateV12() {
  return gate({
    coverage: 0.94,
    blur: 0.08,
    reprojectionError: 0.72,
    loopClosure: 0.91,
    gaussianCount: 3200,
    temporalStability: 0.9,
  });
}

export function smoothGaussianConfidenceV12(values: number[]) {
  const safe = Array.isArray(values) ? values.filter((value) => Number.isFinite(value)).slice(0, 120) : [];
  return temporal_smoothing_rolling(safe, 3);
}
