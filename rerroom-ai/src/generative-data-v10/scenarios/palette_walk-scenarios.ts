import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Palette_WalkScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const PALETTE_WALK_SCENARIOS: Palette_WalkScenario[] = [
  {
    id: "scenario-palette_walk-00",
    title: "contemporary media room — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "palette_walk-0-example", family: "multimodal_generation", roomType: "media_room", style: "contemporary", paletteId: "cedar_cream", userIntent: "palette walk",
      prompt: "contemporary media room for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94020, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("palette_walk-0-image", "image", 94020), asset("palette_walk-0-scene", "scene3d", 94021)], spatialTruth: spatialTruth("scene-palette_walk-0",20),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94020), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-01",
    title: "minimalist reading nook — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "palette_walk-1-example", family: "multimodal_generation", roomType: "reading_nook", style: "minimalist", paletteId: "forest_stone", userIntent: "palette walk",
      prompt: "minimalist reading nook for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94021, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("palette_walk-1-image", "image", 94021), asset("palette_walk-1-scene", "scene3d", 94022)], spatialTruth: spatialTruth("scene-palette_walk-1",21),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94021), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-02",
    title: "moody modern basement — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "palette_walk-2-example", family: "multimodal_generation", roomType: "basement", style: "moody_modern", paletteId: "mist_blue", userIntent: "palette walk",
      prompt: "moody modern basement for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94022, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("palette_walk-2-image", "image", 94022), asset("palette_walk-2-scene", "scene3d", 94023)], spatialTruth: spatialTruth("scene-palette_walk-2",22),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94022), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-03",
    title: "coastal modern living room — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "palette_walk-3-example", family: "multimodal_generation", roomType: "living_room", style: "coastal_modern", paletteId: "nordic_fog", userIntent: "palette walk",
      prompt: "coastal modern living room for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94023, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("palette_walk-3-image", "image", 94023), asset("palette_walk-3-scene", "scene3d", 94024)], spatialTruth: spatialTruth("scene-palette_walk-3",23),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94023), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-04",
    title: "japandi kitchen — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "palette_walk-4-example", family: "multimodal_generation", roomType: "kitchen", style: "japandi", paletteId: "navy_linen", userIntent: "palette walk",
      prompt: "japandi kitchen for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94024, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("palette_walk-4-image", "image", 94024), asset("palette_walk-4-scene", "scene3d", 94025)], spatialTruth: spatialTruth("scene-palette_walk-4",24),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94024), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-05",
    title: "heritage modern home office — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "palette_walk-5-example", family: "multimodal_generation", roomType: "home_office", style: "heritage_modern", paletteId: "mushroom_cream", userIntent: "palette walk",
      prompt: "heritage modern home office for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94025, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("palette_walk-5-image", "image", 94025), asset("palette_walk-5-scene", "scene3d", 94026)], spatialTruth: spatialTruth("scene-palette_walk-5",25),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94025), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-06",
    title: "art deco bathroom — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep clay_terracotta palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "palette_walk-6-example", family: "multimodal_generation", roomType: "bathroom", style: "art_deco", paletteId: "clay_terracotta", userIntent: "palette walk",
      prompt: "art deco bathroom for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94026, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("palette_walk-6-image", "image", 94026), asset("palette_walk-6-scene", "scene3d", 94027)], spatialTruth: spatialTruth("scene-palette_walk-6",26),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94026), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-palette_walk-07",
    title: "bohemian studio — palette walk",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep soft_taupe palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "palette_walk-7-example", family: "multimodal_generation", roomType: "studio", style: "bohemian", paletteId: "soft_taupe", userIntent: "palette walk",
      prompt: "bohemian studio for palette walk", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94027, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("palette_walk-7-image", "image", 94027), asset("palette_walk-7-scene", "scene3d", 94028)], spatialTruth: spatialTruth("scene-palette_walk-7",27),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94027), split: "demo", tier: "gold"
    }],
  },
];
