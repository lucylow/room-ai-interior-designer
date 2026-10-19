import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Layout_SearchScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const LAYOUT_SEARCH_SCENARIOS: Layout_SearchScenario[] = [
  {
    id: "scenario-layout_search-00",
    title: "quiet luxury open plan — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep warm_white_sand palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "layout_search-0-example", family: "multimodal_generation", roomType: "open_plan", style: "quiet_luxury", paletteId: "warm_white_sand", userIntent: "layout search",
      prompt: "quiet luxury open plan for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94030, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("layout_search-0-image", "image", 94030), asset("layout_search-0-scene", "scene3d", 94031)], spatialTruth: spatialTruth("scene-layout_search-0",30),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94030), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-01",
    title: "industrial bedroom — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep ink_brass palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "layout_search-1-example", family: "multimodal_generation", roomType: "bedroom", style: "industrial", paletteId: "ink_brass", userIntent: "layout search",
      prompt: "industrial bedroom for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94031, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("layout_search-1-image", "image", 94031), asset("layout_search-1-scene", "scene3d", 94032)], spatialTruth: spatialTruth("scene-layout_search-1",31),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94031), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-02",
    title: "craft modern dining room — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "layout_search-2-example", family: "multimodal_generation", roomType: "dining_room", style: "craft_modern", paletteId: "cedar_cream", userIntent: "layout search",
      prompt: "craft modern dining room for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94032, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("layout_search-2-image", "image", 94032), asset("layout_search-2-scene", "scene3d", 94033)], spatialTruth: spatialTruth("scene-layout_search-2",32),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94032), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-03",
    title: "transitional entryway — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "layout_search-3-example", family: "multimodal_generation", roomType: "entryway", style: "transitional", paletteId: "forest_stone", userIntent: "layout search",
      prompt: "transitional entryway for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94033, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("layout_search-3-image", "image", 94033), asset("layout_search-3-scene", "scene3d", 94034)], spatialTruth: spatialTruth("scene-layout_search-3",33),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94033), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-04",
    title: "organic modern nursery — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "layout_search-4-example", family: "multimodal_generation", roomType: "nursery", style: "organic_modern", paletteId: "mist_blue", userIntent: "layout search",
      prompt: "organic modern nursery for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94034, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("layout_search-4-image", "image", 94034), asset("layout_search-4-scene", "scene3d", 94035)], spatialTruth: spatialTruth("scene-layout_search-4",34),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94034), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-05",
    title: "naturalist media room — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "layout_search-5-example", family: "multimodal_generation", roomType: "media_room", style: "naturalist", paletteId: "nordic_fog", userIntent: "layout search",
      prompt: "naturalist media room for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94035, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("layout_search-5-image", "image", 94035), asset("layout_search-5-scene", "scene3d", 94036)], spatialTruth: spatialTruth("scene-layout_search-5",35),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94035), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-06",
    title: "soft industrial reading nook — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "layout_search-6-example", family: "multimodal_generation", roomType: "reading_nook", style: "soft_industrial", paletteId: "navy_linen", userIntent: "layout search",
      prompt: "soft industrial reading nook for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94036, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("layout_search-6-image", "image", 94036), asset("layout_search-6-scene", "scene3d", 94037)], spatialTruth: spatialTruth("scene-layout_search-6",36),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94036), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-layout_search-07",
    title: "warm minimal basement — layout search",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "layout_search-7-example", family: "multimodal_generation", roomType: "basement", style: "warm_minimal", paletteId: "mushroom_cream", userIntent: "layout search",
      prompt: "warm minimal basement for layout search", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94037, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("layout_search-7-image", "image", 94037), asset("layout_search-7-scene", "scene3d", 94038)], spatialTruth: spatialTruth("scene-layout_search-7",37),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94037), split: "demo", tier: "gold"
    }],
  },
];
