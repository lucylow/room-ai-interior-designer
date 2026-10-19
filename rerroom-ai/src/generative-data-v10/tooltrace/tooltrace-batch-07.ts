import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_07: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_07_00", goal: "Refine bedroom toward art deco using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "art_deco" }, result: { match: 0.89, tokens: 14 }, latencyMs: 50 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 35 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bedroom-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 24 },
      { name: "generate_concept", args: { seed: 91072, style: "art_deco" }, result: { conceptId: "concept-v10_tooltrace_07_00", status: "ok" }, latencyMs: 892 },
    ], finalAction: "Present concept-v10_tooltrace_07_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91072),
  },
  {
    id: "v10_tooltrace_07_01", goal: "Refine dining room toward bohemian using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "bohemian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 51 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 36 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-dining_room-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 25 },
      { name: "generate_concept", args: { seed: 91073, style: "bohemian" }, result: { conceptId: "concept-v10_tooltrace_07_01", status: "ok" }, latencyMs: 893 },
    ], finalAction: "Present concept-v10_tooltrace_07_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91073),
  },
  {
    id: "v10_tooltrace_07_02", goal: "Refine entryway toward modern using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 52 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 37 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-entryway-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 26 },
      { name: "generate_concept", args: { seed: 91074, style: "modern" }, result: { conceptId: "concept-v10_tooltrace_07_02", status: "ok" }, latencyMs: 894 },
    ], finalAction: "Present concept-v10_tooltrace_07_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91074),
  },
  {
    id: "v10_tooltrace_07_03", goal: "Refine nursery toward desert modern using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "desert_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 53 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 38 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 27 },
      { name: "generate_concept", args: { seed: 91075, style: "desert_modern" }, result: { conceptId: "concept-v10_tooltrace_07_03", status: "ok" }, latencyMs: 895 },
    ], finalAction: "Present concept-v10_tooltrace_07_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91075),
  },
  {
    id: "v10_tooltrace_07_04", goal: "Refine media room toward quiet luxury using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "quiet_luxury" }, result: { match: 0.89, tokens: 14 }, latencyMs: 54 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 39 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 28 },
      { name: "generate_concept", args: { seed: 91076, style: "quiet_luxury" }, result: { conceptId: "concept-v10_tooltrace_07_04", status: "ok" }, latencyMs: 896 },
    ], finalAction: "Present concept-v10_tooltrace_07_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91076),
  },
  {
    id: "v10_tooltrace_07_05", goal: "Refine reading nook toward industrial using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 55 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 40 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 29 },
      { name: "generate_concept", args: { seed: 91077, style: "industrial" }, result: { conceptId: "concept-v10_tooltrace_07_05", status: "ok" }, latencyMs: 897 },
    ], finalAction: "Present concept-v10_tooltrace_07_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91077),
  },
  {
    id: "v10_tooltrace_07_06", goal: "Refine basement toward craft modern using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "craft_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 56 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 41 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 30 },
      { name: "generate_concept", args: { seed: 91078, style: "craft_modern" }, result: { conceptId: "concept-v10_tooltrace_07_06", status: "ok" }, latencyMs: 898 },
    ], finalAction: "Present concept-v10_tooltrace_07_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91078),
  },
  {
    id: "v10_tooltrace_07_07", goal: "Refine living room toward transitional using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "transitional" }, result: { match: 0.89, tokens: 14 }, latencyMs: 57 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 42 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 31 },
      { name: "generate_concept", args: { seed: 91079, style: "transitional" }, result: { conceptId: "concept-v10_tooltrace_07_07", status: "ok" }, latencyMs: 899 },
    ], finalAction: "Present concept-v10_tooltrace_07_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91079),
  },
  {
    id: "v10_tooltrace_07_08", goal: "Refine kitchen toward organic modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "organic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 58 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 43 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 32 },
      { name: "generate_concept", args: { seed: 91080, style: "organic_modern" }, result: { conceptId: "concept-v10_tooltrace_07_08", status: "ok" }, latencyMs: 900 },
    ], finalAction: "Present concept-v10_tooltrace_07_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91080),
  },
  {
    id: "v10_tooltrace_07_09", goal: "Refine home office toward naturalist using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "naturalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 59 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 44 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-home_office-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 33 },
      { name: "generate_concept", args: { seed: 91081, style: "naturalist" }, result: { conceptId: "concept-v10_tooltrace_07_09", status: "ok" }, latencyMs: 901 },
    ], finalAction: "Present concept-v10_tooltrace_07_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91081),
  },
  {
    id: "v10_tooltrace_07_10", goal: "Refine bathroom toward soft industrial using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "soft_industrial" }, result: { match: 0.89, tokens: 14 }, latencyMs: 60 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 45 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bathroom-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 34 },
      { name: "generate_concept", args: { seed: 91082, style: "soft_industrial" }, result: { conceptId: "concept-v10_tooltrace_07_10", status: "ok" }, latencyMs: 902 },
    ], finalAction: "Present concept-v10_tooltrace_07_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91082),
  },
  {
    id: "v10_tooltrace_07_11", goal: "Refine studio toward warm minimal using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "warm_minimal" }, result: { match: 0.89, tokens: 14 }, latencyMs: 61 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 46 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-studio-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 35 },
      { name: "generate_concept", args: { seed: 91083, style: "warm_minimal" }, result: { conceptId: "concept-v10_tooltrace_07_11", status: "ok" }, latencyMs: 903 },
    ], finalAction: "Present concept-v10_tooltrace_07_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91083),
  },
];
