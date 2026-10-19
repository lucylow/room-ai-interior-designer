import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_02: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_02_00", goal: "Refine bedroom toward scandinavian using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "scandinavian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 52 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 47 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bedroom-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 36 },
      { name: "generate_concept", args: { seed: 91012, style: "scandinavian" }, result: { conceptId: "concept-v10_tooltrace_02_00", status: "ok" }, latencyMs: 832 },
    ], finalAction: "Present concept-v10_tooltrace_02_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91012),
  },
  {
    id: "v10_tooltrace_02_01", goal: "Refine dining room toward eclectic modern using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "eclectic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 53 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 48 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-dining_room-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 37 },
      { name: "generate_concept", args: { seed: 91013, style: "eclectic_modern" }, result: { conceptId: "concept-v10_tooltrace_02_01", status: "ok" }, latencyMs: 833 },
    ], finalAction: "Present concept-v10_tooltrace_02_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91013),
  },
  {
    id: "v10_tooltrace_02_02", goal: "Refine entryway toward modern farmhouse using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern_farmhouse" }, result: { match: 0.89, tokens: 14 }, latencyMs: 54 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 49 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-entryway-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 38 },
      { name: "generate_concept", args: { seed: 91014, style: "modern_farmhouse" }, result: { conceptId: "concept-v10_tooltrace_02_02", status: "ok" }, latencyMs: 834 },
    ], finalAction: "Present concept-v10_tooltrace_02_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91014),
  },
  {
    id: "v10_tooltrace_02_03", goal: "Refine nursery toward mid century using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "mid_century" }, result: { match: 0.89, tokens: 14 }, latencyMs: 55 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 50 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 39 },
      { name: "generate_concept", args: { seed: 91015, style: "mid_century" }, result: { conceptId: "concept-v10_tooltrace_02_03", status: "ok" }, latencyMs: 835 },
    ], finalAction: "Present concept-v10_tooltrace_02_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91015),
  },
  {
    id: "v10_tooltrace_02_04", goal: "Refine media room toward urban soft using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "urban_soft" }, result: { match: 0.89, tokens: 14 }, latencyMs: 56 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 51 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 40 },
      { name: "generate_concept", args: { seed: 91016, style: "urban_soft" }, result: { conceptId: "concept-v10_tooltrace_02_04", status: "ok" }, latencyMs: 836 },
    ], finalAction: "Present concept-v10_tooltrace_02_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91016),
  },
  {
    id: "v10_tooltrace_02_05", goal: "Refine reading nook toward new nordic using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "new_nordic" }, result: { match: 0.89, tokens: 14 }, latencyMs: 57 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 52 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 41 },
      { name: "generate_concept", args: { seed: 91017, style: "new_nordic" }, result: { conceptId: "concept-v10_tooltrace_02_05", status: "ok" }, latencyMs: 837 },
    ], finalAction: "Present concept-v10_tooltrace_02_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91017),
  },
  {
    id: "v10_tooltrace_02_06", goal: "Refine basement toward contemporary using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "contemporary" }, result: { match: 0.89, tokens: 14 }, latencyMs: 58 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 53 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-basement-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 24 },
      { name: "generate_concept", args: { seed: 91018, style: "contemporary" }, result: { conceptId: "concept-v10_tooltrace_02_06", status: "ok" }, latencyMs: 838 },
    ], finalAction: "Present concept-v10_tooltrace_02_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91018),
  },
  {
    id: "v10_tooltrace_02_07", goal: "Refine living room toward minimalist using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "minimalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 59 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 54 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-living_room-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 25 },
      { name: "generate_concept", args: { seed: 91019, style: "minimalist" }, result: { conceptId: "concept-v10_tooltrace_02_07", status: "ok" }, latencyMs: 839 },
    ], finalAction: "Present concept-v10_tooltrace_02_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91019),
  },
  {
    id: "v10_tooltrace_02_08", goal: "Refine kitchen toward moody modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "moody_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 60 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 55 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-kitchen-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 26 },
      { name: "generate_concept", args: { seed: 91020, style: "moody_modern" }, result: { conceptId: "concept-v10_tooltrace_02_08", status: "ok" }, latencyMs: 840 },
    ], finalAction: "Present concept-v10_tooltrace_02_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91020),
  },
  {
    id: "v10_tooltrace_02_09", goal: "Refine home office toward coastal modern using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "coastal_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 61 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 56 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-home_office-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 27 },
      { name: "generate_concept", args: { seed: 91021, style: "coastal_modern" }, result: { conceptId: "concept-v10_tooltrace_02_09", status: "ok" }, latencyMs: 841 },
    ], finalAction: "Present concept-v10_tooltrace_02_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91021),
  },
  {
    id: "v10_tooltrace_02_10", goal: "Refine bathroom toward japandi using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "japandi" }, result: { match: 0.89, tokens: 14 }, latencyMs: 62 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 57 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bathroom-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 28 },
      { name: "generate_concept", args: { seed: 91022, style: "japandi" }, result: { conceptId: "concept-v10_tooltrace_02_10", status: "ok" }, latencyMs: 842 },
    ], finalAction: "Present concept-v10_tooltrace_02_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91022),
  },
  {
    id: "v10_tooltrace_02_11", goal: "Refine studio toward heritage modern using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "heritage_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 63 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 58 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-studio-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 29 },
      { name: "generate_concept", args: { seed: 91023, style: "heritage_modern" }, result: { conceptId: "concept-v10_tooltrace_02_11", status: "ok" }, latencyMs: 843 },
    ], finalAction: "Present concept-v10_tooltrace_02_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91023),
  },
];
