import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_01: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_01_00", goal: "Refine nursery toward art deco using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "art_deco" }, result: { match: 0.89, tokens: 14 }, latencyMs: 40 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 35 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 24 },
      { name: "generate_concept", args: { seed: 91000, style: "art_deco" }, result: { conceptId: "concept-v10_tooltrace_01_00", status: "ok" }, latencyMs: 820 },
    ], finalAction: "Present concept-v10_tooltrace_01_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91000),
  },
  {
    id: "v10_tooltrace_01_01", goal: "Refine media room toward bohemian using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "bohemian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 41 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 36 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 25 },
      { name: "generate_concept", args: { seed: 91001, style: "bohemian" }, result: { conceptId: "concept-v10_tooltrace_01_01", status: "ok" }, latencyMs: 821 },
    ], finalAction: "Present concept-v10_tooltrace_01_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91001),
  },
  {
    id: "v10_tooltrace_01_02", goal: "Refine reading nook toward modern using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 42 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 37 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 26 },
      { name: "generate_concept", args: { seed: 91002, style: "modern" }, result: { conceptId: "concept-v10_tooltrace_01_02", status: "ok" }, latencyMs: 822 },
    ], finalAction: "Present concept-v10_tooltrace_01_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91002),
  },
  {
    id: "v10_tooltrace_01_03", goal: "Refine basement toward desert modern using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "desert_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 43 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 38 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 27 },
      { name: "generate_concept", args: { seed: 91003, style: "desert_modern" }, result: { conceptId: "concept-v10_tooltrace_01_03", status: "ok" }, latencyMs: 823 },
    ], finalAction: "Present concept-v10_tooltrace_01_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91003),
  },
  {
    id: "v10_tooltrace_01_04", goal: "Refine living room toward quiet luxury using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "quiet_luxury" }, result: { match: 0.89, tokens: 14 }, latencyMs: 44 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 39 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 28 },
      { name: "generate_concept", args: { seed: 91004, style: "quiet_luxury" }, result: { conceptId: "concept-v10_tooltrace_01_04", status: "ok" }, latencyMs: 824 },
    ], finalAction: "Present concept-v10_tooltrace_01_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91004),
  },
  {
    id: "v10_tooltrace_01_05", goal: "Refine kitchen toward industrial using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 45 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 40 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 29 },
      { name: "generate_concept", args: { seed: 91005, style: "industrial" }, result: { conceptId: "concept-v10_tooltrace_01_05", status: "ok" }, latencyMs: 825 },
    ], finalAction: "Present concept-v10_tooltrace_01_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91005),
  },
  {
    id: "v10_tooltrace_01_06", goal: "Refine home office toward craft modern using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "craft_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 46 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 41 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-home_office-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 30 },
      { name: "generate_concept", args: { seed: 91006, style: "craft_modern" }, result: { conceptId: "concept-v10_tooltrace_01_06", status: "ok" }, latencyMs: 826 },
    ], finalAction: "Present concept-v10_tooltrace_01_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91006),
  },
  {
    id: "v10_tooltrace_01_07", goal: "Refine bathroom toward transitional using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "transitional" }, result: { match: 0.89, tokens: 14 }, latencyMs: 47 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 42 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bathroom-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 31 },
      { name: "generate_concept", args: { seed: 91007, style: "transitional" }, result: { conceptId: "concept-v10_tooltrace_01_07", status: "ok" }, latencyMs: 827 },
    ], finalAction: "Present concept-v10_tooltrace_01_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91007),
  },
  {
    id: "v10_tooltrace_01_08", goal: "Refine studio toward organic modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "organic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 48 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 43 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-studio-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 32 },
      { name: "generate_concept", args: { seed: 91008, style: "organic_modern" }, result: { conceptId: "concept-v10_tooltrace_01_08", status: "ok" }, latencyMs: 828 },
    ], finalAction: "Present concept-v10_tooltrace_01_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91008),
  },
  {
    id: "v10_tooltrace_01_09", goal: "Refine guest room toward naturalist using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "naturalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 49 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 44 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-guest_room-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 33 },
      { name: "generate_concept", args: { seed: 91009, style: "naturalist" }, result: { conceptId: "concept-v10_tooltrace_01_09", status: "ok" }, latencyMs: 829 },
    ], finalAction: "Present concept-v10_tooltrace_01_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91009),
  },
  {
    id: "v10_tooltrace_01_10", goal: "Refine mudroom toward soft industrial using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "soft_industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 50 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 45 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-mudroom-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 34 },
      { name: "generate_concept", args: { seed: 91010, style: "soft_industrial" }, result: { conceptId: "concept-v10_tooltrace_01_10", status: "ok" }, latencyMs: 830 },
    ], finalAction: "Present concept-v10_tooltrace_01_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91010),
  },
  {
    id: "v10_tooltrace_01_11", goal: "Refine open plan toward warm minimal using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "warm_minimal" }, result: { match: 0.89, tokens: 14 }, latencyMs: 51 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 46 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-open_plan-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 35 },
      { name: "generate_concept", args: { seed: 91011, style: "warm_minimal" }, result: { conceptId: "concept-v10_tooltrace_01_11", status: "ok" }, latencyMs: 831 },
    ], finalAction: "Present concept-v10_tooltrace_01_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91011),
  },
];
