import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_06: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_06_00", goal: "Refine nursery toward scandinavian using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "scandinavian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 69 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 47 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 30 },
      { name: "generate_concept", args: { seed: 91060, style: "scandinavian" }, result: { conceptId: "concept-v10_tooltrace_06_00", status: "ok" }, latencyMs: 880 },
    ], finalAction: "Present concept-v10_tooltrace_06_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91060),
  },
  {
    id: "v10_tooltrace_06_01", goal: "Refine media room toward eclectic modern using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "eclectic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 70 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 48 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 31 },
      { name: "generate_concept", args: { seed: 91061, style: "eclectic_modern" }, result: { conceptId: "concept-v10_tooltrace_06_01", status: "ok" }, latencyMs: 881 },
    ], finalAction: "Present concept-v10_tooltrace_06_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91061),
  },
  {
    id: "v10_tooltrace_06_02", goal: "Refine reading nook toward modern farmhouse using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern_farmhouse" }, result: { match: 0.89, tokens: 14 }, latencyMs: 40 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 49 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 32 },
      { name: "generate_concept", args: { seed: 91062, style: "modern_farmhouse" }, result: { conceptId: "concept-v10_tooltrace_06_02", status: "ok" }, latencyMs: 882 },
    ], finalAction: "Present concept-v10_tooltrace_06_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91062),
  },
  {
    id: "v10_tooltrace_06_03", goal: "Refine basement toward mid century using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "mid_century" }, result: { match: 0.89, tokens: 14 }, latencyMs: 41 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 50 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 33 },
      { name: "generate_concept", args: { seed: 91063, style: "mid_century" }, result: { conceptId: "concept-v10_tooltrace_06_03", status: "ok" }, latencyMs: 883 },
    ], finalAction: "Present concept-v10_tooltrace_06_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91063),
  },
  {
    id: "v10_tooltrace_06_04", goal: "Refine living room toward urban soft using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "urban_soft" }, result: { match: 0.89, tokens: 14 }, latencyMs: 42 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 51 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 34 },
      { name: "generate_concept", args: { seed: 91064, style: "urban_soft" }, result: { conceptId: "concept-v10_tooltrace_06_04", status: "ok" }, latencyMs: 884 },
    ], finalAction: "Present concept-v10_tooltrace_06_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91064),
  },
  {
    id: "v10_tooltrace_06_05", goal: "Refine kitchen toward new nordic using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "new_nordic" }, result: { match: 0.89, tokens: 14 }, latencyMs: 43 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 52 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 35 },
      { name: "generate_concept", args: { seed: 91065, style: "new_nordic" }, result: { conceptId: "concept-v10_tooltrace_06_05", status: "ok" }, latencyMs: 885 },
    ], finalAction: "Present concept-v10_tooltrace_06_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91065),
  },
  {
    id: "v10_tooltrace_06_06", goal: "Refine home office toward contemporary using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "contemporary" }, result: { match: 0.89, tokens: 14 }, latencyMs: 44 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 53 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-home_office-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 36 },
      { name: "generate_concept", args: { seed: 91066, style: "contemporary" }, result: { conceptId: "concept-v10_tooltrace_06_06", status: "ok" }, latencyMs: 886 },
    ], finalAction: "Present concept-v10_tooltrace_06_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91066),
  },
  {
    id: "v10_tooltrace_06_07", goal: "Refine bathroom toward minimalist using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "minimalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 45 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 54 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bathroom-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 37 },
      { name: "generate_concept", args: { seed: 91067, style: "minimalist" }, result: { conceptId: "concept-v10_tooltrace_06_07", status: "ok" }, latencyMs: 887 },
    ], finalAction: "Present concept-v10_tooltrace_06_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91067),
  },
  {
    id: "v10_tooltrace_06_08", goal: "Refine studio toward moody modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "moody_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 46 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 55 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-studio-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 38 },
      { name: "generate_concept", args: { seed: 91068, style: "moody_modern" }, result: { conceptId: "concept-v10_tooltrace_06_08", status: "ok" }, latencyMs: 888 },
    ], finalAction: "Present concept-v10_tooltrace_06_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91068),
  },
  {
    id: "v10_tooltrace_06_09", goal: "Refine guest room toward coastal modern using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "coastal_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 47 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 56 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-guest_room-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 39 },
      { name: "generate_concept", args: { seed: 91069, style: "coastal_modern" }, result: { conceptId: "concept-v10_tooltrace_06_09", status: "ok" }, latencyMs: 889 },
    ], finalAction: "Present concept-v10_tooltrace_06_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91069),
  },
  {
    id: "v10_tooltrace_06_10", goal: "Refine mudroom toward japandi using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "japandi" }, result: { match: 0.89, tokens: 14 }, latencyMs: 48 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 57 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-mudroom-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 40 },
      { name: "generate_concept", args: { seed: 91070, style: "japandi" }, result: { conceptId: "concept-v10_tooltrace_06_10", status: "ok" }, latencyMs: 890 },
    ], finalAction: "Present concept-v10_tooltrace_06_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91070),
  },
  {
    id: "v10_tooltrace_06_11", goal: "Refine open plan toward heritage modern using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "heritage_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 49 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 58 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-open_plan-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 41 },
      { name: "generate_concept", args: { seed: 91071, style: "heritage_modern" }, result: { conceptId: "concept-v10_tooltrace_06_11", status: "ok" }, latencyMs: 891 },
    ], finalAction: "Present concept-v10_tooltrace_06_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91071),
  },
];
