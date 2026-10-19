import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Budget_TierScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const BUDGET_TIER_SCENARIOS: Budget_TierScenario[] = [
  {
    id: "scenario-budget_tier-00",
    title: "soft industrial open plan — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "budget_tier-0-example", family: "multimodal_generation", roomType: "open_plan", style: "soft_industrial", paletteId: "navy_linen", userIntent: "budget tier",
      prompt: "soft industrial open plan for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94060, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("budget_tier-0-image", "image", 94060), asset("budget_tier-0-scene", "scene3d", 94061)], spatialTruth: spatialTruth("scene-budget_tier-0",60),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94060), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-01",
    title: "warm minimal bedroom — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "budget_tier-1-example", family: "multimodal_generation", roomType: "bedroom", style: "warm_minimal", paletteId: "mushroom_cream", userIntent: "budget tier",
      prompt: "warm minimal bedroom for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94061, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("budget_tier-1-image", "image", 94061), asset("budget_tier-1-scene", "scene3d", 94062)], spatialTruth: spatialTruth("scene-budget_tier-1",61),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94061), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-02",
    title: "scandinavian dining room — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep clay_terracotta palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "budget_tier-2-example", family: "multimodal_generation", roomType: "dining_room", style: "scandinavian", paletteId: "clay_terracotta", userIntent: "budget tier",
      prompt: "scandinavian dining room for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94062, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("budget_tier-2-image", "image", 94062), asset("budget_tier-2-scene", "scene3d", 94063)], spatialTruth: spatialTruth("scene-budget_tier-2",62),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94062), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-03",
    title: "eclectic modern entryway — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep soft_taupe palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "budget_tier-3-example", family: "multimodal_generation", roomType: "entryway", style: "eclectic_modern", paletteId: "soft_taupe", userIntent: "budget tier",
      prompt: "eclectic modern entryway for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94063, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("budget_tier-3-image", "image", 94063), asset("budget_tier-3-scene", "scene3d", 94064)], spatialTruth: spatialTruth("scene-budget_tier-3",63),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94063), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-04",
    title: "modern farmhouse nursery — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep sage_olive palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "budget_tier-4-example", family: "multimodal_generation", roomType: "nursery", style: "modern_farmhouse", paletteId: "sage_olive", userIntent: "budget tier",
      prompt: "modern farmhouse nursery for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94064, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("budget_tier-4-image", "image", 94064), asset("budget_tier-4-scene", "scene3d", 94065)], spatialTruth: spatialTruth("scene-budget_tier-4",64),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94064), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-05",
    title: "mid century media room — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep oatmeal_charcoal palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "budget_tier-5-example", family: "multimodal_generation", roomType: "media_room", style: "mid_century", paletteId: "oatmeal_charcoal", userIntent: "budget tier",
      prompt: "mid century media room for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94065, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("budget_tier-5-image", "image", 94065), asset("budget_tier-5-scene", "scene3d", 94066)], spatialTruth: spatialTruth("scene-budget_tier-5",65),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94065), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-06",
    title: "urban soft reading nook — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep warm_white_sand palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "budget_tier-6-example", family: "multimodal_generation", roomType: "reading_nook", style: "urban_soft", paletteId: "warm_white_sand", userIntent: "budget tier",
      prompt: "urban soft reading nook for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94066, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("budget_tier-6-image", "image", 94066), asset("budget_tier-6-scene", "scene3d", 94067)], spatialTruth: spatialTruth("scene-budget_tier-6",66),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94066), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-budget_tier-07",
    title: "new nordic basement — budget tier",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep ink_brass palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "budget_tier-7-example", family: "multimodal_generation", roomType: "basement", style: "new_nordic", paletteId: "ink_brass", userIntent: "budget tier",
      prompt: "new nordic basement for budget tier", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94067, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("budget_tier-7-image", "image", 94067), asset("budget_tier-7-scene", "scene3d", 94068)], spatialTruth: spatialTruth("scene-budget_tier-7",67),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94067), split: "demo", tier: "gold"
    }],
  },
];
