import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Whole_HomeScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const WHOLE_HOME_SCENARIOS: Whole_HomeScenario[] = [
  {
    id: "scenario-whole_home-00",
    title: "modern home office — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep sage_olive palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "whole_home-0-example", family: "multimodal_generation", roomType: "home_office", style: "modern", paletteId: "sage_olive", userIntent: "whole home",
      prompt: "modern home office for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94100, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("whole_home-0-image", "image", 94100), asset("whole_home-0-scene", "scene3d", 94101)], spatialTruth: spatialTruth("scene-whole_home-0",100),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94100), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-01",
    title: "desert modern bathroom — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep oatmeal_charcoal palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "whole_home-1-example", family: "multimodal_generation", roomType: "bathroom", style: "desert_modern", paletteId: "oatmeal_charcoal", userIntent: "whole home",
      prompt: "desert modern bathroom for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94101, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("whole_home-1-image", "image", 94101), asset("whole_home-1-scene", "scene3d", 94102)], spatialTruth: spatialTruth("scene-whole_home-1",101),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94101), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-02",
    title: "quiet luxury studio — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep warm_white_sand palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "whole_home-2-example", family: "multimodal_generation", roomType: "studio", style: "quiet_luxury", paletteId: "warm_white_sand", userIntent: "whole home",
      prompt: "quiet luxury studio for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94102, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("whole_home-2-image", "image", 94102), asset("whole_home-2-scene", "scene3d", 94103)], spatialTruth: spatialTruth("scene-whole_home-2",102),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94102), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-03",
    title: "industrial guest room — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep ink_brass palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "whole_home-3-example", family: "multimodal_generation", roomType: "guest_room", style: "industrial", paletteId: "ink_brass", userIntent: "whole home",
      prompt: "industrial guest room for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94103, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("whole_home-3-image", "image", 94103), asset("whole_home-3-scene", "scene3d", 94104)], spatialTruth: spatialTruth("scene-whole_home-3",103),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94103), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-04",
    title: "craft modern mudroom — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "whole_home-4-example", family: "multimodal_generation", roomType: "mudroom", style: "craft_modern", paletteId: "cedar_cream", userIntent: "whole home",
      prompt: "craft modern mudroom for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94104, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("whole_home-4-image", "image", 94104), asset("whole_home-4-scene", "scene3d", 94105)], spatialTruth: spatialTruth("scene-whole_home-4",104),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94104), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-05",
    title: "transitional open plan — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "whole_home-5-example", family: "multimodal_generation", roomType: "open_plan", style: "transitional", paletteId: "forest_stone", userIntent: "whole home",
      prompt: "transitional open plan for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94105, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("whole_home-5-image", "image", 94105), asset("whole_home-5-scene", "scene3d", 94106)], spatialTruth: spatialTruth("scene-whole_home-5",105),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94105), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-06",
    title: "organic modern bedroom — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep mist_blue palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "whole_home-6-example", family: "multimodal_generation", roomType: "bedroom", style: "organic_modern", paletteId: "mist_blue", userIntent: "whole home",
      prompt: "organic modern bedroom for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94106, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("whole_home-6-image", "image", 94106), asset("whole_home-6-scene", "scene3d", 94107)], spatialTruth: spatialTruth("scene-whole_home-6",106),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94106), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-whole_home-07",
    title: "naturalist dining room — whole home",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep nordic_fog palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "whole_home-7-example", family: "multimodal_generation", roomType: "dining_room", style: "naturalist", paletteId: "nordic_fog", userIntent: "whole home",
      prompt: "naturalist dining room for whole home", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94107, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("whole_home-7-image", "image", 94107), asset("whole_home-7-scene", "scene3d", 94108)], spatialTruth: spatialTruth("scene-whole_home-7",107),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94107), split: "demo", tier: "gold"
    }],
  },
];
