import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Style_BlendScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const STYLE_BLEND_SCENARIOS: Style_BlendScenario[] = [
  {
    id: "scenario-style_blend-00",
    title: "organic modern home office — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "style_blend-0-example", family: "multimodal_generation", roomType: "home_office", style: "organic_modern", paletteId: "mist_blue", userIntent: "style blend",
      prompt: "organic modern home office for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94010, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("style_blend-0-image", "image", 94010), asset("style_blend-0-scene", "scene3d", 94011)], spatialTruth: spatialTruth("scene-style_blend-0",10),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94010), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-01",
    title: "naturalist bathroom — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "style_blend-1-example", family: "multimodal_generation", roomType: "bathroom", style: "naturalist", paletteId: "nordic_fog", userIntent: "style blend",
      prompt: "naturalist bathroom for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94011, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("style_blend-1-image", "image", 94011), asset("style_blend-1-scene", "scene3d", 94012)], spatialTruth: spatialTruth("scene-style_blend-1",11),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94011), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-02",
    title: "soft industrial studio — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep navy_linen palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "style_blend-2-example", family: "multimodal_generation", roomType: "studio", style: "soft_industrial", paletteId: "navy_linen", userIntent: "style blend",
      prompt: "soft industrial studio for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94012, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("style_blend-2-image", "image", 94012), asset("style_blend-2-scene", "scene3d", 94013)], spatialTruth: spatialTruth("scene-style_blend-2",12),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94012), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-03",
    title: "warm minimal guest room — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mushroom_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "style_blend-3-example", family: "multimodal_generation", roomType: "guest_room", style: "warm_minimal", paletteId: "mushroom_cream", userIntent: "style blend",
      prompt: "warm minimal guest room for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94013, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("style_blend-3-image", "image", 94013), asset("style_blend-3-scene", "scene3d", 94014)], spatialTruth: spatialTruth("scene-style_blend-3",13),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94013), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-04",
    title: "scandinavian mudroom — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep clay_terracotta palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "style_blend-4-example", family: "multimodal_generation", roomType: "mudroom", style: "scandinavian", paletteId: "clay_terracotta", userIntent: "style blend",
      prompt: "scandinavian mudroom for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94014, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("style_blend-4-image", "image", 94014), asset("style_blend-4-scene", "scene3d", 94015)], spatialTruth: spatialTruth("scene-style_blend-4",14),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94014), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-05",
    title: "eclectic modern open plan — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep soft_taupe palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "style_blend-5-example", family: "multimodal_generation", roomType: "open_plan", style: "eclectic_modern", paletteId: "soft_taupe", userIntent: "style blend",
      prompt: "eclectic modern open plan for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94015, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("style_blend-5-image", "image", 94015), asset("style_blend-5-scene", "scene3d", 94016)], spatialTruth: spatialTruth("scene-style_blend-5",15),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94015), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-06",
    title: "modern farmhouse bedroom — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep sage_olive palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "style_blend-6-example", family: "multimodal_generation", roomType: "bedroom", style: "modern_farmhouse", paletteId: "sage_olive", userIntent: "style blend",
      prompt: "modern farmhouse bedroom for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94016, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("style_blend-6-image", "image", 94016), asset("style_blend-6-scene", "scene3d", 94017)], spatialTruth: spatialTruth("scene-style_blend-6",16),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94016), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-style_blend-07",
    title: "mid century dining room — style blend",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep oatmeal_charcoal palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "style_blend-7-example", family: "multimodal_generation", roomType: "dining_room", style: "mid_century", paletteId: "oatmeal_charcoal", userIntent: "style blend",
      prompt: "mid century dining room for style blend", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94017, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("style_blend-7-image", "image", 94017), asset("style_blend-7-scene", "scene3d", 94018)], spatialTruth: spatialTruth("scene-style_blend-7",17),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94017), split: "demo", tier: "gold"
    }],
  },
];
