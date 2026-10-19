import {
  CpuGaussianRenderer,
  GaussianQueryEngine,
  assessCapture,
  assessSceneHealth,
  canExternalize,
  createReconstructionJob,
  demoCameraPath,
  demoManifest,
  demoScene,
  planEdit,
  scrubCapture,
  sceneManifest,
  selectLod,
  buildGsplatTrainCommand,
  buildColmapCommand,
  compileEditPrompt,
} from "../src/gaussian-splatting-v11";
import type {
  EditInstruction,
  QualityTier,
  RenderMode,
  RenderTarget,
  RenderCamera,
} from "../src/gaussian-splatting-v11";
import { DEFAULT_SCENE_PRIVACY } from "../src/gaussian-splatting-v11";

const DEFAULT_TARGET: RenderTarget = {
  width: 160,
  height: 120,
  tileSize: 16,
  background: [0.06, 0.07, 0.09],
};

function demoCamera(): RenderCamera {
  const manifest = demoManifest();
  const frame = manifest.frames[0];
  if (!frame?.pose || !frame.intrinsics) throw new Error("V11 demo manifest has no camera calibration");
  return { id: frame.id, pose: frame.pose, intrinsics: frame.intrinsics };
}

export interface GaussianSplattingV11Report {
  version: "v11";
  sceneId: string;
  splatCount: number;
  captureScore: number;
  captureUsable: boolean;
  sceneHealth: ReturnType<typeof assessSceneHealth>;
  previewVisibleSplats: number;
  previewCulledSplats: number;
  semanticLabels: string[];
  cameraPathFrames: number;
  privacyExternalizationBlocked: boolean;
  readyForDemo: boolean;
}

export function getGaussianSplattingV11Report(): GaussianSplattingV11Report {
  const scene = demoScene(600);
  const manifest = scrubCapture(demoManifest());
  const capture = assessCapture(manifest.frames);
  const health = assessSceneHealth(scene);
  const renderer = new CpuGaussianRenderer();
  const preview = renderer.render(scene, demoCamera(), DEFAULT_TARGET, "rgb");
  const labels = [
    ...new Set(scene.splats.map((splat) => splat.semanticLabel).filter(Boolean) as string[]),
  ].sort();
  return {
    version: "v11",
    sceneId: scene.id,
    splatCount: scene.splats.length,
    captureScore: Number(capture.score.toFixed(3)),
    captureUsable: capture.usable,
    sceneHealth: health,
    previewVisibleSplats: preview.visibleSplats,
    previewCulledSplats: preview.culledSplats,
    semanticLabels: labels,
    cameraPathFrames: demoCameraPath().length,
    privacyExternalizationBlocked: !canExternalize(DEFAULT_SCENE_PRIVACY, "render"),
    readyForDemo:
      capture.usable &&
      health.healthy &&
      preview.visibleSplats > 0 &&
      !canExternalize(DEFAULT_SCENE_PRIVACY, "render"),
  };
}

export function renderGaussianSplattingV11Demo(mode: RenderMode = "rgb", target: Partial<RenderTarget> = {}) {
  const safeMode: RenderMode = ["rgb", "depth", "normal", "semantic", "confidence"].includes(mode)
    ? mode
    : "rgb";
  const safeTarget: RenderTarget = {
    ...DEFAULT_TARGET,
    ...target,
    width: Number.isFinite(target.width)
      ? Math.max(1, Math.min(640, Math.floor(target.width!)))
      : DEFAULT_TARGET.width,
    height: Number.isFinite(target.height)
      ? Math.max(1, Math.min(480, Math.floor(target.height!)))
      : DEFAULT_TARGET.height,
    tileSize: Number.isFinite(target.tileSize)
      ? Math.max(4, Math.min(64, Math.floor(target.tileSize!)))
      : DEFAULT_TARGET.tileSize,
  };
  return new CpuGaussianRenderer().render(demoScene(600), demoCamera(), safeTarget, safeMode);
}

export function queryGaussianSceneV11(text: string, maxResults = 8) {
  const safeText = typeof text === "string" ? text.slice(0, 240) : "";
  return new GaussianQueryEngine(demoScene(600).splats).query({
    text: safeText,
    roomId: "room-demo-01",
    maxResults: Math.max(0, Math.min(24, Math.floor(maxResults))),
    minConfidence: 0.4,
  });
}

export function planGaussianEditV11(input: Partial<EditInstruction>) {
  const instruction: EditInstruction = {
    id: String(input.id || "v11-demo-edit").slice(0, 80),
    prompt: String(input.prompt || "Adjust the room appearance").slice(0, 500),
    targetLabels: Array.isArray(input.targetLabels) ? input.targetLabels.slice(0, 8).map(String) : ["sofa"],
    operation: input.operation ?? "relight",
    preserveAnchors: input.preserveAnchors !== false,
    preserveGeometry: input.preserveGeometry !== false,
    createdAt: new Date(0).toISOString(),
  };
  return planEdit(demoScene(600), instruction);
}

export function compileGaussianEditPromptV11(
  input: Partial<EditInstruction>,
  style = "modern",
  palette = "neutral",
) {
  const instruction = {
    id: String(input.id || "v11-demo-edit"),
    prompt: String(input.prompt || "Adjust the room appearance"),
    targetLabels: Array.isArray(input.targetLabels) ? input.targetLabels.slice(0, 8).map(String) : ["sofa"],
    operation: input.operation ?? "relight",
    preserveAnchors: input.preserveAnchors !== false,
    preserveGeometry: input.preserveGeometry !== false,
    createdAt: new Date(0).toISOString(),
  } as EditInstruction;
  return compileEditPrompt(instruction, String(style).slice(0, 80), String(palette).slice(0, 80));
}

export function getGaussianPreviewLod(tier: QualityTier = "preview") {
  const safeTier: QualityTier = ["preview", "balanced", "high", "ultra"].includes(tier) ? tier : "preview";
  return selectLod(demoScene(600).splats, demoCamera(), safeTier).length;
}

export function createGaussianReconstructionJobV11(tier: QualityTier = "balanced") {
  const safeTier: QualityTier = ["preview", "balanced", "high", "ultra"].includes(tier) ? tier : "balanced";
  return createReconstructionJob("v11-demo-job", "demo-3dgs-living-room", "manifest-demo-01", safeTier, 1101);
}

export function getGaussianWorkerCommandsV11(tier: QualityTier = "preview") {
  const safeTier: QualityTier = ["preview", "balanced", "high", "ultra"].includes(tier) ? tier : "preview";
  return {
    colmap: buildColmapCommand("/input/frames", "/work/colmap"),
    train: buildGsplatTrainCommand({
      dataset: "/work/colmap",
      output: "/work/output",
      tier: safeTier,
      iterations: safeTier === "preview" ? 4_500 : 13_500,
    }),
  };
}

export function scrubGaussianCaptureV11() {
  return scrubCapture(demoManifest());
}

export function getGaussianSceneManifestV11() {
  return sceneManifest(demoScene(600));
}
