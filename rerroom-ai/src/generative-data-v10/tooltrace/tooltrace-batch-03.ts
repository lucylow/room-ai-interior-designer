import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_03: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_03_00", goal: "Refine guest room toward art deco using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "art_deco" }, result: { match: 0.89, tokens: 14 }, latencyMs: 64 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 35 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-guest_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 30 },
      { name: "generate_concept", args: { seed: 91024, style: "art_deco" }, result: { conceptId: "concept-v10_tooltrace_03_00", status: "ok" }, latencyMs: 844 },
    ], finalAction: "Present concept-v10_tooltrace_03_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91024),
  },
  {
    id: "v10_tooltrace_03_01", goal: "Refine mudroom toward bohemian using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "bohemian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 65 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 36 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-mudroom-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 31 },
      { name: "generate_concept", args: { seed: 91025, style: "bohemian" }, result: { conceptId: "concept-v10_tooltrace_03_01", status: "ok" }, latencyMs: 845 },
    ], finalAction: "Present concept-v10_tooltrace_03_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91025),
  },
  {
    id: "v10_tooltrace_03_02", goal: "Refine open plan toward modern using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 66 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 37 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-open_plan-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 32 },
      { name: "generate_concept", args: { seed: 91026, style: "modern" }, result: { conceptId: "concept-v10_tooltrace_03_02", status: "ok" }, latencyMs: 846 },
    ], finalAction: "Present concept-v10_tooltrace_03_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91026),
  },
  {
    id: "v10_tooltrace_03_03", goal: "Refine bedroom toward desert modern using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "desert_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 67 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 38 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bedroom-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 33 },
      { name: "generate_concept", args: { seed: 91027, style: "desert_modern" }, result: { conceptId: "concept-v10_tooltrace_03_03", status: "ok" }, latencyMs: 847 },
    ], finalAction: "Present concept-v10_tooltrace_03_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91027),
  },
  {
    id: "v10_tooltrace_03_04", goal: "Refine dining room toward quiet luxury using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "quiet_luxury" }, result: { match: 0.89, tokens: 14 }, latencyMs: 68 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 39 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-dining_room-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 34 },
      { name: "generate_concept", args: { seed: 91028, style: "quiet_luxury" }, result: { conceptId: "concept-v10_tooltrace_03_04", status: "ok" }, latencyMs: 848 },
    ], finalAction: "Present concept-v10_tooltrace_03_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91028),
  },
  {
    id: "v10_tooltrace_03_05", goal: "Refine entryway toward industrial using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 69 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 40 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-entryway-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 35 },
      { name: "generate_concept", args: { seed: 91029, style: "industrial" }, result: { conceptId: "concept-v10_tooltrace_03_05", status: "ok" }, latencyMs: 849 },
    ], finalAction: "Present concept-v10_tooltrace_03_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91029),
  },
  {
    id: "v10_tooltrace_03_06", goal: "Refine nursery toward craft modern using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "craft_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 70 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 41 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 36 },
      { name: "generate_concept", args: { seed: 91030, style: "craft_modern" }, result: { conceptId: "concept-v10_tooltrace_03_06", status: "ok" }, latencyMs: 850 },
    ], finalAction: "Present concept-v10_tooltrace_03_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91030),
  },
  {
    id: "v10_tooltrace_03_07", goal: "Refine media room toward transitional using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "transitional" }, result: { match: 0.89, tokens: 14 }, latencyMs: 40 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 42 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 37 },
      { name: "generate_concept", args: { seed: 91031, style: "transitional" }, result: { conceptId: "concept-v10_tooltrace_03_07", status: "ok" }, latencyMs: 851 },
    ], finalAction: "Present concept-v10_tooltrace_03_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91031),
  },
  {
    id: "v10_tooltrace_03_08", goal: "Refine reading nook toward organic modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "organic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 41 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 43 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 38 },
      { name: "generate_concept", args: { seed: 91032, style: "organic_modern" }, result: { conceptId: "concept-v10_tooltrace_03_08", status: "ok" }, latencyMs: 852 },
    ], finalAction: "Present concept-v10_tooltrace_03_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91032),
  },
  {
    id: "v10_tooltrace_03_09", goal: "Refine basement toward naturalist using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "naturalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 42 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 44 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 39 },
      { name: "generate_concept", args: { seed: 91033, style: "naturalist" }, result: { conceptId: "concept-v10_tooltrace_03_09", status: "ok" }, latencyMs: 853 },
    ], finalAction: "Present concept-v10_tooltrace_03_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91033),
  },
  {
    id: "v10_tooltrace_03_10", goal: "Refine living room toward soft industrial using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "soft_industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 43 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 45 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 40 },
      { name: "generate_concept", args: { seed: 91034, style: "soft_industrial" }, result: { conceptId: "concept-v10_tooltrace_03_10", status: "ok" }, latencyMs: 854 },
    ], finalAction: "Present concept-v10_tooltrace_03_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91034),
  },
  {
    id: "v10_tooltrace_03_11", goal: "Refine kitchen toward warm minimal using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "warm_minimal" }, result: { match: 0.89, tokens: 14 }, latencyMs: 44 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 46 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 41 },
      { name: "generate_concept", args: { seed: 91035, style: "warm_minimal" }, result: { conceptId: "concept-v10_tooltrace_03_11", status: "ok" }, latencyMs: 855 },
    ], finalAction: "Present concept-v10_tooltrace_03_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91035),
  },
];
