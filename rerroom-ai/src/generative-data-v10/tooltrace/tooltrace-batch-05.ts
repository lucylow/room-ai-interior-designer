import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_05: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_05_00", goal: "Refine basement toward art deco using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "art_deco" }, result: { match: 0.89, tokens: 14 }, latencyMs: 57 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 35 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 36 },
      { name: "generate_concept", args: { seed: 91048, style: "art_deco" }, result: { conceptId: "concept-v10_tooltrace_05_00", status: "ok" }, latencyMs: 868 },
    ], finalAction: "Present concept-v10_tooltrace_05_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91048),
  },
  {
    id: "v10_tooltrace_05_01", goal: "Refine living room toward bohemian using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "bohemian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 58 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 36 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 37 },
      { name: "generate_concept", args: { seed: 91049, style: "bohemian" }, result: { conceptId: "concept-v10_tooltrace_05_01", status: "ok" }, latencyMs: 869 },
    ], finalAction: "Present concept-v10_tooltrace_05_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91049),
  },
  {
    id: "v10_tooltrace_05_02", goal: "Refine kitchen toward modern using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 59 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 37 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 38 },
      { name: "generate_concept", args: { seed: 91050, style: "modern" }, result: { conceptId: "concept-v10_tooltrace_05_02", status: "ok" }, latencyMs: 870 },
    ], finalAction: "Present concept-v10_tooltrace_05_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91050),
  },
  {
    id: "v10_tooltrace_05_03", goal: "Refine home office toward desert modern using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "desert_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 60 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 38 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-home_office-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 39 },
      { name: "generate_concept", args: { seed: 91051, style: "desert_modern" }, result: { conceptId: "concept-v10_tooltrace_05_03", status: "ok" }, latencyMs: 871 },
    ], finalAction: "Present concept-v10_tooltrace_05_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91051),
  },
  {
    id: "v10_tooltrace_05_04", goal: "Refine bathroom toward quiet luxury using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "quiet_luxury" }, result: { match: 0.89, tokens: 14 }, latencyMs: 61 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 39 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bathroom-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 40 },
      { name: "generate_concept", args: { seed: 91052, style: "quiet_luxury" }, result: { conceptId: "concept-v10_tooltrace_05_04", status: "ok" }, latencyMs: 872 },
    ], finalAction: "Present concept-v10_tooltrace_05_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91052),
  },
  {
    id: "v10_tooltrace_05_05", goal: "Refine studio toward industrial using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 62 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 40 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-studio-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 41 },
      { name: "generate_concept", args: { seed: 91053, style: "industrial" }, result: { conceptId: "concept-v10_tooltrace_05_05", status: "ok" }, latencyMs: 873 },
    ], finalAction: "Present concept-v10_tooltrace_05_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91053),
  },
  {
    id: "v10_tooltrace_05_06", goal: "Refine guest room toward craft modern using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "craft_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 63 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 41 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-guest_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 24 },
      { name: "generate_concept", args: { seed: 91054, style: "craft_modern" }, result: { conceptId: "concept-v10_tooltrace_05_06", status: "ok" }, latencyMs: 874 },
    ], finalAction: "Present concept-v10_tooltrace_05_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91054),
  },
  {
    id: "v10_tooltrace_05_07", goal: "Refine mudroom toward transitional using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "transitional" }, result: { match: 0.89, tokens: 14 }, latencyMs: 64 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 42 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-mudroom-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 25 },
      { name: "generate_concept", args: { seed: 91055, style: "transitional" }, result: { conceptId: "concept-v10_tooltrace_05_07", status: "ok" }, latencyMs: 875 },
    ], finalAction: "Present concept-v10_tooltrace_05_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91055),
  },
  {
    id: "v10_tooltrace_05_08", goal: "Refine open plan toward organic modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "organic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 65 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 43 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-open_plan-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 26 },
      { name: "generate_concept", args: { seed: 91056, style: "organic_modern" }, result: { conceptId: "concept-v10_tooltrace_05_08", status: "ok" }, latencyMs: 876 },
    ], finalAction: "Present concept-v10_tooltrace_05_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91056),
  },
  {
    id: "v10_tooltrace_05_09", goal: "Refine bedroom toward naturalist using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "naturalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 66 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 44 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bedroom-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 27 },
      { name: "generate_concept", args: { seed: 91057, style: "naturalist" }, result: { conceptId: "concept-v10_tooltrace_05_09", status: "ok" }, latencyMs: 877 },
    ], finalAction: "Present concept-v10_tooltrace_05_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91057),
  },
  {
    id: "v10_tooltrace_05_10", goal: "Refine dining room toward soft industrial using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "soft_industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 67 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 45 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-dining_room-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 28 },
      { name: "generate_concept", args: { seed: 91058, style: "soft_industrial" }, result: { conceptId: "concept-v10_tooltrace_05_10", status: "ok" }, latencyMs: 878 },
    ], finalAction: "Present concept-v10_tooltrace_05_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91058),
  },
  {
    id: "v10_tooltrace_05_11", goal: "Refine entryway toward warm minimal using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "warm_minimal" }, result: { match: 0.89, tokens: 14 }, latencyMs: 68 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 46 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-entryway-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 29 },
      { name: "generate_concept", args: { seed: 91059, style: "warm_minimal" }, result: { conceptId: "concept-v10_tooltrace_05_11", status: "ok" }, latencyMs: 879 },
    ], finalAction: "Present concept-v10_tooltrace_05_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91059),
  },
];
