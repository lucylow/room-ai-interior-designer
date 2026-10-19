import type { GenerationExample } from "../core/types";
import { asset, provenance, spatialTruth } from "../core/factories";

export interface Camera_SequenceScenario {
  id: string;
  title: string;
  sequence: string[];
  constraints: string[];
  expectedMetrics: Record<string, number>;
  examples: GenerationExample[];
}

export const CAMERA_SEQUENCE_SCENARIOS: Camera_SequenceScenario[] = [
  {
    id: "scenario-camera_sequence-00",
    title: "art deco media room — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep clay_terracotta palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.840, spatial: 0.920, refinement: 0.800 },
    examples: [{
      id: "camera_sequence-0-example", family: "multimodal_generation", roomType: "media_room", style: "art_deco", paletteId: "clay_terracotta", userIntent: "camera sequence",
      prompt: "art deco media room for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94050, steps: 22, guidance: 6.4, preserveGeometry: true },
      assets: [asset("camera_sequence-0-image", "image", 94050), asset("camera_sequence-0-scene", "scene3d", 94051)], spatialTruth: spatialTruth("scene-camera_sequence-0",50),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94050), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-01",
    title: "bohemian reading nook — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep soft_taupe palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.852, spatial: 0.929, refinement: 0.815 },
    examples: [{
      id: "camera_sequence-1-example", family: "multimodal_generation", roomType: "reading_nook", style: "bohemian", paletteId: "soft_taupe", userIntent: "camera sequence",
      prompt: "bohemian reading nook for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94051, steps: 23, guidance: 6.5, preserveGeometry: true },
      assets: [asset("camera_sequence-1-image", "image", 94051), asset("camera_sequence-1-scene", "scene3d", 94052)], spatialTruth: spatialTruth("scene-camera_sequence-1",51),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94051), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-02",
    title: "modern basement — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep sage_olive palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.864, spatial: 0.938, refinement: 0.830 },
    examples: [{
      id: "camera_sequence-2-example", family: "multimodal_generation", roomType: "basement", style: "modern", paletteId: "sage_olive", userIntent: "camera sequence",
      prompt: "modern basement for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94052, steps: 24, guidance: 6.6, preserveGeometry: true },
      assets: [asset("camera_sequence-2-image", "image", 94052), asset("camera_sequence-2-scene", "scene3d", 94053)], spatialTruth: spatialTruth("scene-camera_sequence-2",52),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94052), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-03",
    title: "desert modern living room — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep oatmeal_charcoal palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.876, spatial: 0.947, refinement: 0.845 },
    examples: [{
      id: "camera_sequence-3-example", family: "multimodal_generation", roomType: "living_room", style: "desert_modern", paletteId: "oatmeal_charcoal", userIntent: "camera sequence",
      prompt: "desert modern living room for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94053, steps: 25, guidance: 6.7, preserveGeometry: true },
      assets: [asset("camera_sequence-3-image", "image", 94053), asset("camera_sequence-3-scene", "scene3d", 94054)], spatialTruth: spatialTruth("scene-camera_sequence-3",53),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94053), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-04",
    title: "quiet luxury kitchen — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep warm_white_sand palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.888, spatial: 0.956, refinement: 0.860 },
    examples: [{
      id: "camera_sequence-4-example", family: "multimodal_generation", roomType: "kitchen", style: "quiet_luxury", paletteId: "warm_white_sand", userIntent: "camera sequence",
      prompt: "quiet luxury kitchen for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94054, steps: 26, guidance: 6.8, preserveGeometry: true },
      assets: [asset("camera_sequence-4-image", "image", 94054), asset("camera_sequence-4-scene", "scene3d", 94055)], spatialTruth: spatialTruth("scene-camera_sequence-4",54),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94054), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-05",
    title: "industrial home office — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep ink_brass palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.900, spatial: 0.965, refinement: 0.875 },
    examples: [{
      id: "camera_sequence-5-example", family: "multimodal_generation", roomType: "home_office", style: "industrial", paletteId: "ink_brass", userIntent: "camera sequence",
      prompt: "industrial home office for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94055, steps: 27, guidance: 6.9, preserveGeometry: true },
      assets: [asset("camera_sequence-5-image", "image", 94055), asset("camera_sequence-5-scene", "scene3d", 94056)], spatialTruth: spatialTruth("scene-camera_sequence-5",55),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94055), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-06",
    title: "craft modern bathroom — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep cedar_cream palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.912, spatial: 0.974, refinement: 0.890 },
    examples: [{
      id: "camera_sequence-6-example", family: "multimodal_generation", roomType: "bathroom", style: "craft_modern", paletteId: "cedar_cream", userIntent: "camera sequence",
      prompt: "craft modern bathroom for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94056, steps: 28, guidance: 7.0, preserveGeometry: true },
      assets: [asset("camera_sequence-6-image", "image", 94056), asset("camera_sequence-6-scene", "scene3d", 94057)], spatialTruth: spatialTruth("scene-camera_sequence-6",56),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94056), split: "demo", tier: "gold"
    }],
  },
  {
    id: "scenario-camera_sequence-07",
    title: "transitional studio — camera sequence",
    sequence: ["analyze", "generate", "compare", "refine", "validate"],
    constraints: ["preserve architectural shell", "keep forest_stone palette family", "retain user-defined room goal"],
    expectedMetrics: { visual: 0.924, spatial: 0.983, refinement: 0.905 },
    examples: [{
      id: "camera_sequence-7-example", family: "multimodal_generation", roomType: "studio", style: "transitional", paletteId: "forest_stone", userIntent: "camera sequence",
      prompt: "transitional studio for camera sequence", negativePrompt: "geometry drift, blocked circulation",
      controls: { seed: 94057, steps: 29, guidance: 7.1, preserveGeometry: true },
      assets: [asset("camera_sequence-7-image", "image", 94057), asset("camera_sequence-7-scene", "scene3d", 94058)], spatialTruth: spatialTruth("scene-camera_sequence-7",57),
      expectedAestheticChanges: ["style coherence", "palette control", "task-specific layout"], prohibitedChanges: ["walls", "doors", "windows"],
      assistantResponse: "Generate a reversible concept for the existing source scene.", qualityTargets: { visual: 0.89, spatial: 0.96, instruction: 0.93 },
      provenance: provenance(94057), split: "demo", tier: "gold"
    }],
  },
];
