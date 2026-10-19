import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Day_NightScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const DAY_NIGHT_SCENARIOS: Day_NightScenario[] = [
  {
    id: "scenario-day_night-00",
    title: "urban soft open plan — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep warm_white_sand palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "day_night-0-example", family: "multimodal_generation", roomType: "open_plan", style: "urban_soft", paletteId: "warm_white_sand", userIntent: "day night",
      prompt: "urban soft open plan for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94090, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("day_night-0-image", "image", 94090), asset("day_night-0-scene", "scene3d", 94091)], spatialTruth: spatialTruth("scene-day_night-0",90),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94090), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-01",
    title: "new nordic bedroom — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep ink_brass palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "day_night-1-example", family: "multimodal_generation", roomType: "bedroom", style: "new_nordic", paletteId: "ink_brass", userIntent: "day night",
      prompt: "new nordic bedroom for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94091, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("day_night-1-image", "image", 94091), asset("day_night-1-scene", "scene3d", 94092)], spatialTruth: spatialTruth("scene-day_night-1",91),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94091), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-02",
    title: "contemporary dining room — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "day_night-2-example", family: "multimodal_generation", roomType: "dining_room", style: "contemporary", paletteId: "cedar_cream", userIntent: "day night",
      prompt: "contemporary dining room for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94092, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("day_night-2-image", "image", 94092), asset("day_night-2-scene", "scene3d", 94093)], spatialTruth: spatialTruth("scene-day_night-2",92),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94092), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-03",
    title: "minimalist entryway — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "day_night-3-example", family: "multimodal_generation", roomType: "entryway", style: "minimalist", paletteId: "forest_stone", userIntent: "day night",
      prompt: "minimalist entryway for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94093, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("day_night-3-image", "image", 94093), asset("day_night-3-scene", "scene3d", 94094)], spatialTruth: spatialTruth("scene-day_night-3",93),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94093), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-04",
    title: "moody modern nursery — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "day_night-4-example", family: "multimodal_generation", roomType: "nursery", style: "moody_modern", paletteId: "mist_blue", userIntent: "day night",
      prompt: "moody modern nursery for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94094, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("day_night-4-image", "image", 94094), asset("day_night-4-scene", "scene3d", 94095)], spatialTruth: spatialTruth("scene-day_night-4",94),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94094), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-05",
    title: "coastal modern media room — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "day_night-5-example", family: "multimodal_generation", roomType: "media_room", style: "coastal_modern", paletteId: "nordic_fog", userIntent: "day night",
      prompt: "coastal modern media room for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94095, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("day_night-5-image", "image", 94095), asset("day_night-5-scene", "scene3d", 94096)], spatialTruth: spatialTruth("scene-day_night-5",95),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94095), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-06",
    title: "japandi reading nook — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "day_night-6-example", family: "multimodal_generation", roomType: "reading_nook", style: "japandi", paletteId: "navy_linen", userIntent: "day night",
      prompt: "japandi reading nook for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94096, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("day_night-6-image", "image", 94096), asset("day_night-6-scene", "scene3d", 94097)], spatialTruth: spatialTruth("scene-day_night-6",96),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94096), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-day_night-07",
    title: "heritage modern basement — day night",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "day_night-7-example", family: "multimodal_generation", roomType: "basement", style: "heritage_modern", paletteId: "mushroom_cream", userIntent: "day night",
      prompt: "heritage modern basement for day night", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94097, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("day_night-7-image", "image", 94097), asset("day_night-7-scene", "scene3d", 94098)], spatialTruth: spatialTruth("scene-day_night-7",97),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94097), split: "demo", tier: "gold"
    }],
  },
];
