import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Refinement_ChainScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const REFINEMENT_CHAIN_SCENARIOS: Refinement_ChainScenario[] = [
  {
    id: "scenario-refinement_chain-00",
    title: "modern farmhouse home office — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep sage_olive palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "refinement_chain-0-example", family: "multimodal_generation", roomType: "home_office", style: "modern_farmhouse", paletteId: "sage_olive", userIntent: "refinement chain",
      prompt: "modern farmhouse home office for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94040, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("refinement_chain-0-image", "image", 94040), asset("refinement_chain-0-scene", "scene3d", 94041)], spatialTruth: spatialTruth("scene-refinement_chain-0",40),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94040), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-01",
    title: "mid century bathroom — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep oatmeal_charcoal palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "refinement_chain-1-example", family: "multimodal_generation", roomType: "bathroom", style: "mid_century", paletteId: "oatmeal_charcoal", userIntent: "refinement chain",
      prompt: "mid century bathroom for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94041, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("refinement_chain-1-image", "image", 94041), asset("refinement_chain-1-scene", "scene3d", 94042)], spatialTruth: spatialTruth("scene-refinement_chain-1",41),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94041), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-02",
    title: "urban soft studio — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep warm_white_sand palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "refinement_chain-2-example", family: "multimodal_generation", roomType: "studio", style: "urban_soft", paletteId: "warm_white_sand", userIntent: "refinement chain",
      prompt: "urban soft studio for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94042, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("refinement_chain-2-image", "image", 94042), asset("refinement_chain-2-scene", "scene3d", 94043)], spatialTruth: spatialTruth("scene-refinement_chain-2",42),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94042), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-03",
    title: "new nordic guest room — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep ink_brass palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "refinement_chain-3-example", family: "multimodal_generation", roomType: "guest_room", style: "new_nordic", paletteId: "ink_brass", userIntent: "refinement chain",
      prompt: "new nordic guest room for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94043, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("refinement_chain-3-image", "image", 94043), asset("refinement_chain-3-scene", "scene3d", 94044)], spatialTruth: spatialTruth("scene-refinement_chain-3",43),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94043), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-04",
    title: "contemporary mudroom — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "refinement_chain-4-example", family: "multimodal_generation", roomType: "mudroom", style: "contemporary", paletteId: "cedar_cream", userIntent: "refinement chain",
      prompt: "contemporary mudroom for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94044, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("refinement_chain-4-image", "image", 94044), asset("refinement_chain-4-scene", "scene3d", 94045)], spatialTruth: spatialTruth("scene-refinement_chain-4",44),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94044), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-05",
    title: "minimalist open plan — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "refinement_chain-5-example", family: "multimodal_generation", roomType: "open_plan", style: "minimalist", paletteId: "forest_stone", userIntent: "refinement chain",
      prompt: "minimalist open plan for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94045, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("refinement_chain-5-image", "image", 94045), asset("refinement_chain-5-scene", "scene3d", 94046)], spatialTruth: spatialTruth("scene-refinement_chain-5",45),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94045), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-06",
    title: "moody modern bedroom — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "refinement_chain-6-example", family: "multimodal_generation", roomType: "bedroom", style: "moody_modern", paletteId: "mist_blue", userIntent: "refinement chain",
      prompt: "moody modern bedroom for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94046, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("refinement_chain-6-image", "image", 94046), asset("refinement_chain-6-scene", "scene3d", 94047)], spatialTruth: spatialTruth("scene-refinement_chain-6",46),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94046), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-refinement_chain-07",
    title: "coastal modern dining room — refinement chain",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "refinement_chain-7-example", family: "multimodal_generation", roomType: "dining_room", style: "coastal_modern", paletteId: "nordic_fog", userIntent: "refinement chain",
      prompt: "coastal modern dining room for refinement chain", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94047, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("refinement_chain-7-image", "image", 94047), asset("refinement_chain-7-scene", "scene3d", 94048)], spatialTruth: spatialTruth("scene-refinement_chain-7",47),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94047), split: "demo", tier: "gold"
    }],
  },
];
