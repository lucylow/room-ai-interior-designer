import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Material_SwapScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const MATERIAL_SWAP_SCENARIOS: Material_SwapScenario[] = [
  {
    id: "scenario-material_swap-00",
    title: "moody modern home office — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "material_swap-0-example", family: "multimodal_generation", roomType: "home_office", style: "moody_modern", paletteId: "mist_blue", userIntent: "material swap",
      prompt: "moody modern home office for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94070, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("material_swap-0-image", "image", 94070), asset("material_swap-0-scene", "scene3d", 94071)], spatialTruth: spatialTruth("scene-material_swap-0",70),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94070), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-01",
    title: "coastal modern bathroom — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "material_swap-1-example", family: "multimodal_generation", roomType: "bathroom", style: "coastal_modern", paletteId: "nordic_fog", userIntent: "material swap",
      prompt: "coastal modern bathroom for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94071, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("material_swap-1-image", "image", 94071), asset("material_swap-1-scene", "scene3d", 94072)], spatialTruth: spatialTruth("scene-material_swap-1",71),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94071), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-02",
    title: "japandi studio — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "material_swap-2-example", family: "multimodal_generation", roomType: "studio", style: "japandi", paletteId: "navy_linen", userIntent: "material swap",
      prompt: "japandi studio for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94072, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("material_swap-2-image", "image", 94072), asset("material_swap-2-scene", "scene3d", 94073)], spatialTruth: spatialTruth("scene-material_swap-2",72),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94072), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-03",
    title: "heritage modern guest room — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "material_swap-3-example", family: "multimodal_generation", roomType: "guest_room", style: "heritage_modern", paletteId: "mushroom_cream", userIntent: "material swap",
      prompt: "heritage modern guest room for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94073, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("material_swap-3-image", "image", 94073), asset("material_swap-3-scene", "scene3d", 94074)], spatialTruth: spatialTruth("scene-material_swap-3",73),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94073), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-04",
    title: "art deco mudroom — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep clay_terracotta palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "material_swap-4-example", family: "multimodal_generation", roomType: "mudroom", style: "art_deco", paletteId: "clay_terracotta", userIntent: "material swap",
      prompt: "art deco mudroom for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94074, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("material_swap-4-image", "image", 94074), asset("material_swap-4-scene", "scene3d", 94075)], spatialTruth: spatialTruth("scene-material_swap-4",74),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94074), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-05",
    title: "bohemian open plan — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep soft_taupe palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "material_swap-5-example", family: "multimodal_generation", roomType: "open_plan", style: "bohemian", paletteId: "soft_taupe", userIntent: "material swap",
      prompt: "bohemian open plan for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94075, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("material_swap-5-image", "image", 94075), asset("material_swap-5-scene", "scene3d", 94076)], spatialTruth: spatialTruth("scene-material_swap-5",75),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94075), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-06",
    title: "modern bedroom — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep sage_olive palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "material_swap-6-example", family: "multimodal_generation", roomType: "bedroom", style: "modern", paletteId: "sage_olive", userIntent: "material swap",
      prompt: "modern bedroom for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94076, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("material_swap-6-image", "image", 94076), asset("material_swap-6-scene", "scene3d", 94077)], spatialTruth: spatialTruth("scene-material_swap-6",76),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94076), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-material_swap-07",
    title: "desert modern dining room — material swap",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep oatmeal_charcoal palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "material_swap-7-example", family: "multimodal_generation", roomType: "dining_room", style: "desert_modern", paletteId: "oatmeal_charcoal", userIntent: "material swap",
      prompt: "desert modern dining room for material swap", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94077, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("material_swap-7-image", "image", 94077), asset("material_swap-7-scene", "scene3d", 94078)], spatialTruth: spatialTruth("scene-material_swap-7",77),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94077), split: "demo", tier: "gold"
    }],
  },
];
