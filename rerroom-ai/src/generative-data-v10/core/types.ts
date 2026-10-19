import type { DesignStyle, RoomType } from "../../generative-data-v9/core/types";

export type DatasetFamily =
  | "multimodal_generation" | "instruction" | "critique" | "preference"
  | "counterfactual" | "spatial_grounding" | "cad_bim_grounding"
  | "tool_trace" | "quality" | "safety" | "dialogue" | "retail_grounding"
  | "evaluation" | "augmentation" | "project_context";

export type Modality = "text" | "image" | "depth" | "mask" | "plan2d" | "scene3d" | "cad" | "bim";
export type ExampleTier = "gold" | "silver" | "bronze" | "review";
export type SplitName = "train" | "validation" | "test" | "challenge" | "demo";
export type PreferenceSignal = "accept" | "reject" | "save" | "refine" | "swap" | "compare" | "ask";

export interface Provenance {
  datasetVersion: string;
  sourceKind: "synthetic" | "template" | "simulation";
  generator: string;
  seed: number;
  generatedAt: string;
  piiFree: boolean;
  licenseSafe: boolean;
}

export interface SpatialTruth {
  sceneId: string;
  dimensionsM: { width: number; depth: number; height: number };
  fixedAnchors: Array<{ id: string; kind: string; x: number; y: number; width: number; depth: number }>;
  immutableFeatures: string[];
  geometryToleranceMm: number;
}

export interface MultimodalAssetRef {
  id: string;
  modality: Modality;
  uri: string;
  width?: number;
  height?: number;
  channels?: number;
  checksum: string;
}

export interface GenerationExample {
  id: string;
  family: "multimodal_generation" | "instruction";
  roomType: RoomType;
  style: DesignStyle;
  paletteId: string;
  userIntent: string;
  prompt: string;
  negativePrompt: string;
  controls: Record<string, number | string | boolean>;
  assets: MultimodalAssetRef[];
  spatialTruth: SpatialTruth;
  expectedAestheticChanges: string[];
  prohibitedChanges: string[];
  assistantResponse: string;
  qualityTargets: { visual: number; spatial: number; instruction: number };
  provenance: Provenance;
  split: SplitName;
  tier: ExampleTier;
}

export interface PreferenceExample {
  id: string;
  roomType: RoomType;
  candidateA: string;
  candidateB: string;
  preferred: "A" | "B" | "tie";
  preferenceDimensions: Record<string, number>;
  explanation: string;
  budgetCad: number;
  context: string[];
  provenance: Provenance;
}

export interface CritiqueExample {
  id: string;
  roomType: RoomType;
  style: DesignStyle;
  conceptDescription: string;
  issue: "style_drift" | "layout_conflict" | "scale_mismatch" | "palette_noise" | "material_clash" | "lighting_error" | "geometry_drift" | "budget_error";
  severity: "low" | "medium" | "high" | "critical";
  evidence: string[];
  repairInstruction: string;
  expectedOutcome: string;
  provenance: Provenance;
}

export interface CounterfactualExample {
  id: string;
  baseline: string;
  intervention: string;
  expectedChange: string[];
  preserved: string[];
  tradeoffs: string[];
  roomType: RoomType;
  style: DesignStyle;
  provenance: Provenance;
}

export interface SpatialExample {
  id: string;
  roomType: RoomType;
  sceneId: string;
  anchorKind: string;
  candidateAction: string;
  relation: "adjacent" | "clear_of" | "centered_on" | "aligned_with" | "within" | "outside";
  metric: number;
  tolerance: number;
  expected: "pass" | "fail" | "adjust";
  explanation: string;
  provenance: Provenance;
}

export interface ToolTraceExample {
  id: string;
  goal: string;
  tools: Array<{ name: string; args: Record<string, unknown>; result: Record<string, unknown>; latencyMs: number }>;
  finalAction: string;
  policyChecks: string[];
  provenance: Provenance;
}

export interface QualityExample {
  id: string;
  task: string;
  predictedLabel: string;
  expectedLabel: string;
  rubric: Record<string, number>;
  evidence: string[];
  humanReviewRequired: boolean;
  provenance: Provenance;
}

export interface SafetyExample {
  id: string;
  input: string;
  riskType: "privacy" | "prompt_injection" | "unsupported_claim" | "unsafe_construction" | "secret_exposure";
  expectedAction: "allow" | "redact" | "refuse" | "escalate";
  safeRewrite?: string;
  rationale: string;
  provenance: Provenance;
}

export interface DialogueExample {
  id: string;
  turns: Array<{ role: "user" | "assistant"; text: string; intent?: string }>;
  finalState: Record<string, unknown>;
  expectedNextAction: string;
  provenance: Provenance;
}

export interface RetailGroundingExample {
  id: string;
  roomType: RoomType;
  productRole: string;
  productId: string;
  dimensionsM: { width: number; depth: number; height: number };
  priceCad: number;
  styleTags: string[];
  placement: { x: number; y: number; rotation: number };
  fitDecision: "fit" | "tight" | "reject";
  explanation: string;
  provenance: Provenance;
}

export interface DatasetSummary {
  version: string;
  counts: Record<DatasetFamily, number>;
  splitCounts: Record<SplitName, number>;
  styleCoverage: Record<string, number>;
  roomCoverage: Record<string, number>;
  quality: { duplicateIds: number; schemaErrors: number; groundingFailures: number; score: number };
}
