import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Seasonal_ModeScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const SEASONAL_MODE_SCENARIOS: Seasonal_ModeScenario[] = [
  {
    id: "scenario-seasonal_mode-00",
    title: "craft modern media room — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "seasonal_mode-0-example", family: "multimodal_generation", roomType: "media_room", style: "craft_modern", paletteId: "cedar_cream", userIntent: "seasonal mode",
      prompt: "craft modern media room for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94080, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("seasonal_mode-0-image", "image", 94080), asset("seasonal_mode-0-scene", "scene3d", 94081)], spatialTruth: spatialTruth("scene-seasonal_mode-0",80),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94080), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-01",
    title: "transitional reading nook — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "seasonal_mode-1-example", family: "multimodal_generation", roomType: "reading_nook", style: "transitional", paletteId: "forest_stone", userIntent: "seasonal mode",
      prompt: "transitional reading nook for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94081, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("seasonal_mode-1-image", "image", 94081), asset("seasonal_mode-1-scene", "scene3d", 94082)], spatialTruth: spatialTruth("scene-seasonal_mode-1",81),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94081), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-02",
    title: "organic modern basement — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "seasonal_mode-2-example", family: "multimodal_generation", roomType: "basement", style: "organic_modern", paletteId: "mist_blue", userIntent: "seasonal mode",
      prompt: "organic modern basement for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94082, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("seasonal_mode-2-image", "image", 94082), asset("seasonal_mode-2-scene", "scene3d", 94083)], spatialTruth: spatialTruth("scene-seasonal_mode-2",82),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94082), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-03",
    title: "naturalist living room — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "seasonal_mode-3-example", family: "multimodal_generation", roomType: "living_room", style: "naturalist", paletteId: "nordic_fog", userIntent: "seasonal mode",
      prompt: "naturalist living room for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94083, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("seasonal_mode-3-image", "image", 94083), asset("seasonal_mode-3-scene", "scene3d", 94084)], spatialTruth: spatialTruth("scene-seasonal_mode-3",83),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94083), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-04",
    title: "soft industrial kitchen — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "seasonal_mode-4-example", family: "multimodal_generation", roomType: "kitchen", style: "soft_industrial", paletteId: "navy_linen", userIntent: "seasonal mode",
      prompt: "soft industrial kitchen for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94084, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("seasonal_mode-4-image", "image", 94084), asset("seasonal_mode-4-scene", "scene3d", 94085)], spatialTruth: spatialTruth("scene-seasonal_mode-4",84),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94084), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-05",
    title: "warm minimal home office — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "seasonal_mode-5-example", family: "multimodal_generation", roomType: "home_office", style: "warm_minimal", paletteId: "mushroom_cream", userIntent: "seasonal mode",
      prompt: "warm minimal home office for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94085, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("seasonal_mode-5-image", "image", 94085), asset("seasonal_mode-5-scene", "scene3d", 94086)], spatialTruth: spatialTruth("scene-seasonal_mode-5",85),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94085), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-06",
    title: "scandinavian bathroom — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep clay_terracotta palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "seasonal_mode-6-example", family: "multimodal_generation", roomType: "bathroom", style: "scandinavian", paletteId: "clay_terracotta", userIntent: "seasonal mode",
      prompt: "scandinavian bathroom for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94086, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("seasonal_mode-6-image", "image", 94086), asset("seasonal_mode-6-scene", "scene3d", 94087)], spatialTruth: spatialTruth("scene-seasonal_mode-6",86),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94086), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-seasonal_mode-07",
    title: "eclectic modern studio — seasonal mode",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep soft_taupe palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "seasonal_mode-7-example", family: "multimodal_generation", roomType: "studio", style: "eclectic_modern", paletteId: "soft_taupe", userIntent: "seasonal mode",
      prompt: "eclectic modern studio for seasonal mode", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94087, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("seasonal_mode-7-image", "image", 94087), asset("seasonal_mode-7-scene", "scene3d", 94088)], spatialTruth: spatialTruth("scene-seasonal_mode-7",87),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94087), split: "demo", tier: "gold"
    }],
  },
];
