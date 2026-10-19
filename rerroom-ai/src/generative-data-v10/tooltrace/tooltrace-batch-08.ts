import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_08: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_08_00", goal: "Refine guest room toward scandinavian using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "scandinavian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 62 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 47 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-guest_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 36 },
      { name: "generate_concept", args: { seed: 91084, style: "scandinavian" }, result: { conceptId: "concept-v10_tooltrace_08_00", status: "ok" }, latencyMs: 904 },
    ], finalAction: "Present concept-v10_tooltrace_08_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91084),
  },
  {
    id: "v10_tooltrace_08_01", goal: "Refine mudroom toward eclectic modern using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "eclectic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 63 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 48 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-mudroom-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 37 },
      { name: "generate_concept", args: { seed: 91085, style: "eclectic_modern" }, result: { conceptId: "concept-v10_tooltrace_08_01", status: "ok" }, latencyMs: 905 },
    ], finalAction: "Present concept-v10_tooltrace_08_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91085),
  },
  {
    id: "v10_tooltrace_08_02", goal: "Refine open plan toward modern farmhouse using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern_farmhouse" }, result: { match: 0.89, tokens: 14 }, latencyMs: 64 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 49 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-open_plan-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 38 },
      { name: "generate_concept", args: { seed: 91086, style: "modern_farmhouse" }, result: { conceptId: "concept-v10_tooltrace_08_02", status: "ok" }, latencyMs: 906 },
    ], finalAction: "Present concept-v10_tooltrace_08_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91086),
  },
  {
    id: "v10_tooltrace_08_03", goal: "Refine bedroom toward mid century using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "mid_century" }, result: { match: 0.89, tokens: 14 }, latencyMs: 65 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 50 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bedroom-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 39 },
      { name: "generate_concept", args: { seed: 91087, style: "mid_century" }, result: { conceptId: "concept-v10_tooltrace_08_03", status: "ok" }, latencyMs: 907 },
    ], finalAction: "Present concept-v10_tooltrace_08_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91087),
  },
  {
    id: "v10_tooltrace_08_04", goal: "Refine dining room toward urban soft using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "urban_soft" }, result: { match: 0.89, tokens: 14 }, latencyMs: 66 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 51 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-dining_room-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 40 },
      { name: "generate_concept", args: { seed: 91088, style: "urban_soft" }, result: { conceptId: "concept-v10_tooltrace_08_04", status: "ok" }, latencyMs: 908 },
    ], finalAction: "Present concept-v10_tooltrace_08_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91088),
  },
  {
    id: "v10_tooltrace_08_05", goal: "Refine entryway toward new nordic using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "new_nordic" }, result: { match: 0.89, tokens: 14 }, latencyMs: 67 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 52 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-entryway-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 41 },
      { name: "generate_concept", args: { seed: 91089, style: "new_nordic" }, result: { conceptId: "concept-v10_tooltrace_08_05", status: "ok" }, latencyMs: 909 },
    ], finalAction: "Present concept-v10_tooltrace_08_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91089),
  },
  {
    id: "v10_tooltrace_08_06", goal: "Refine nursery toward contemporary using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "contemporary" }, result: { match: 0.89, tokens: 14 }, latencyMs: 68 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 53 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 24 },
      { name: "generate_concept", args: { seed: 91090, style: "contemporary" }, result: { conceptId: "concept-v10_tooltrace_08_06", status: "ok" }, latencyMs: 910 },
    ], finalAction: "Present concept-v10_tooltrace_08_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91090),
  },
  {
    id: "v10_tooltrace_08_07", goal: "Refine media room toward minimalist using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "minimalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 69 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 54 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 25 },
      { name: "generate_concept", args: { seed: 91091, style: "minimalist" }, result: { conceptId: "concept-v10_tooltrace_08_07", status: "ok" }, latencyMs: 911 },
    ], finalAction: "Present concept-v10_tooltrace_08_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91091),
  },
  {
    id: "v10_tooltrace_08_08", goal: "Refine reading nook toward moody modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "moody_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 70 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 55 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 26 },
      { name: "generate_concept", args: { seed: 91092, style: "moody_modern" }, result: { conceptId: "concept-v10_tooltrace_08_08", status: "ok" }, latencyMs: 912 },
    ], finalAction: "Present concept-v10_tooltrace_08_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91092),
  },
  {
    id: "v10_tooltrace_08_09", goal: "Refine basement toward coastal modern using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "coastal_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 40 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 56 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 27 },
      { name: "generate_concept", args: { seed: 91093, style: "coastal_modern" }, result: { conceptId: "concept-v10_tooltrace_08_09", status: "ok" }, latencyMs: 913 },
    ], finalAction: "Present concept-v10_tooltrace_08_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91093),
  },
  {
    id: "v10_tooltrace_08_10", goal: "Refine living room toward japandi using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "japandi" }, result: { match: 0.89, tokens: 14 }, latencyMs: 41 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 57 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 28 },
      { name: "generate_concept", args: { seed: 91094, style: "japandi" }, result: { conceptId: "concept-v10_tooltrace_08_10", status: "ok" }, latencyMs: 914 },
    ], finalAction: "Present concept-v10_tooltrace_08_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91094),
  },
  {
    id: "v10_tooltrace_08_11", goal: "Refine kitchen toward heritage modern using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "heritage_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 42 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 58 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 29 },
      { name: "generate_concept", args: { seed: 91095, style: "heritage_modern" }, result: { conceptId: "concept-v10_tooltrace_08_11", status: "ok" }, latencyMs: 915 },
    ], finalAction: "Present concept-v10_tooltrace_08_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91095),
  },
];
