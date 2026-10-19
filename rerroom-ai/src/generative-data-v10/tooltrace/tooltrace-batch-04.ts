import type { ToolTraceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const TOOLTRACE_BATCH_04: ToolTraceExample[] = [
  {
    id: "v10_tooltrace_04_00", goal: "Refine home office toward scandinavian using Soft Taupe.",
    tools: [
      { name: "retrieve_style", args: { style: "scandinavian" }, result: { match: 0.89, tokens: 14 }, latencyMs: 45 },
      { name: "retrieve_palette", args: { paletteId: "soft_taupe" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 47 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-home_office-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 24 },
      { name: "generate_concept", args: { seed: 91036, style: "scandinavian" }, result: { conceptId: "concept-v10_tooltrace_04_00", status: "ok" }, latencyMs: 856 },
    ], finalAction: "Present concept-v10_tooltrace_04_00 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91036),
  },
  {
    id: "v10_tooltrace_04_01", goal: "Refine bathroom toward eclectic modern using Sage Olive.",
    tools: [
      { name: "retrieve_style", args: { style: "eclectic_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 46 },
      { name: "retrieve_palette", args: { paletteId: "sage_olive" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 48 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bathroom-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 25 },
      { name: "generate_concept", args: { seed: 91037, style: "eclectic_modern" }, result: { conceptId: "concept-v10_tooltrace_04_01", status: "ok" }, latencyMs: 857 },
    ], finalAction: "Present concept-v10_tooltrace_04_01 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91037),
  },
  {
    id: "v10_tooltrace_04_02", goal: "Refine studio toward modern farmhouse using Oatmeal Charcoal.",
    tools: [
      { name: "retrieve_style", args: { style: "modern_farmhouse" }, result: { match: 0.89, tokens: 14 }, latencyMs: 47 },
      { name: "retrieve_palette", args: { paletteId: "oatmeal_charcoal" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 49 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-studio-8" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 26 },
      { name: "generate_concept", args: { seed: 91038, style: "modern_farmhouse" }, result: { conceptId: "concept-v10_tooltrace_04_02", status: "ok" }, latencyMs: 858 },
    ], finalAction: "Present concept-v10_tooltrace_04_02 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91038),
  },
  {
    id: "v10_tooltrace_04_03", goal: "Refine guest room toward mid century using Warm White Sand.",
    tools: [
      { name: "retrieve_style", args: { style: "mid_century" }, result: { match: 0.89, tokens: 14 }, latencyMs: 48 },
      { name: "retrieve_palette", args: { paletteId: "warm_white_sand" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 50 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-guest_room-9" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 27 },
      { name: "generate_concept", args: { seed: 91039, style: "mid_century" }, result: { conceptId: "concept-v10_tooltrace_04_03", status: "ok" }, latencyMs: 859 },
    ], finalAction: "Present concept-v10_tooltrace_04_03 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91039),
  },
  {
    id: "v10_tooltrace_04_04", goal: "Refine mudroom toward urban soft using Ink + Brass.",
    tools: [
      { name: "retrieve_style", args: { style: "urban_soft" }, result: { match: 0.89, tokens: 14 }, latencyMs: 49 },
      { name: "retrieve_palette", args: { paletteId: "ink_brass" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 51 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-mudroom-0" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 28 },
      { name: "generate_concept", args: { seed: 91040, style: "urban_soft" }, result: { conceptId: "concept-v10_tooltrace_04_04", status: "ok" }, latencyMs: 860 },
    ], finalAction: "Present concept-v10_tooltrace_04_04 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91040),
  },
  {
    id: "v10_tooltrace_04_05", goal: "Refine open plan toward new nordic using Cedar Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "new_nordic" }, result: { match: 0.89, tokens: 14 }, latencyMs: 50 },
      { name: "retrieve_palette", args: { paletteId: "cedar_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 52 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-open_plan-1" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 29 },
      { name: "generate_concept", args: { seed: 91041, style: "new_nordic" }, result: { conceptId: "concept-v10_tooltrace_04_05", status: "ok" }, latencyMs: 861 },
    ], finalAction: "Present concept-v10_tooltrace_04_05 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91041),
  },
  {
    id: "v10_tooltrace_04_06", goal: "Refine bedroom toward contemporary using Forest Stone.",
    tools: [
      { name: "retrieve_style", args: { style: "contemporary" }, result: { match: 0.89, tokens: 14 }, latencyMs: 51 },
      { name: "retrieve_palette", args: { paletteId: "forest_stone" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 53 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-bedroom-2" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 30 },
      { name: "generate_concept", args: { seed: 91042, style: "contemporary" }, result: { conceptId: "concept-v10_tooltrace_04_06", status: "ok" }, latencyMs: 862 },
    ], finalAction: "Present concept-v10_tooltrace_04_06 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91042),
  },
  {
    id: "v10_tooltrace_04_07", goal: "Refine dining room toward minimalist using Mist Blue.",
    tools: [
      { name: "retrieve_style", args: { style: "minimalist" }, result: { match: 0.89, tokens: 14 }, latencyMs: 52 },
      { name: "retrieve_palette", args: { paletteId: "mist_blue" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 54 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-dining_room-3" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 3 }, latencyMs: 31 },
      { name: "generate_concept", args: { seed: 91043, style: "minimalist" }, result: { conceptId: "concept-v10_tooltrace_04_07", status: "ok" }, latencyMs: 863 },
    ], finalAction: "Present concept-v10_tooltrace_04_07 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91043),
  },
  {
    id: "v10_tooltrace_04_08", goal: "Refine entryway toward moody modern using Nordic Fog.",
    tools: [
      { name: "retrieve_style", args: { style: "moody_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 53 },
      { name: "retrieve_palette", args: { paletteId: "nordic_fog" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 55 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-entryway-4" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 4 }, latencyMs: 32 },
      { name: "generate_concept", args: { seed: 91044, style: "moody_modern" }, result: { conceptId: "concept-v10_tooltrace_04_08", status: "ok" }, latencyMs: 864 },
    ], finalAction: "Present concept-v10_tooltrace_04_08 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91044),
  },
  {
    id: "v10_tooltrace_04_09", goal: "Refine nursery toward coastal modern using Navy Linen.",
    tools: [
      { name: "retrieve_style", args: { style: "coastal_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 54 },
      { name: "retrieve_palette", args: { paletteId: "navy_linen" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 56 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-nursery-5" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 0 }, latencyMs: 33 },
      { name: "generate_concept", args: { seed: 91045, style: "coastal_modern" }, result: { conceptId: "concept-v10_tooltrace_04_09", status: "ok" }, latencyMs: 865 },
    ], finalAction: "Present concept-v10_tooltrace_04_09 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91045),
  },
  {
    id: "v10_tooltrace_04_10", goal: "Refine media room toward japandi using Mushroom Cream.",
    tools: [
      { name: "retrieve_style", args: { style: "japandi" }, result: { match: 0.89, tokens: 14 }, latencyMs: 55 },
      { name: "retrieve_palette", args: { paletteId: "mushroom_cream" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 57 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-media_room-6" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 1 }, latencyMs: 34 },
      { name: "generate_concept", args: { seed: 91046, style: "japandi" }, result: { conceptId: "concept-v10_tooltrace_04_10", status: "ok" }, latencyMs: 866 },
    ], finalAction: "Present concept-v10_tooltrace_04_10 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91046),
  },
  {
    id: "v10_tooltrace_04_11", goal: "Refine reading nook toward heritage modern using Clay Terracotta.",
    tools: [
      { name: "retrieve_style", args: { style: "heritage_modern" }, result: { match: 0.89, tokens: 14 }, latencyMs: 56 },
      { name: "retrieve_palette", args: { paletteId: "clay_terracotta" }, result: { harmony: 0.92, accents: 2 }, latencyMs: 58 },
      { name: "check_spatial_constraints", args: { sceneId: "scene-reading_nook-7" }, result: { doorsClear: true, windowsClear: true, geometryDriftMm: 2 }, latencyMs: 35 },
      { name: "generate_concept", args: { seed: 91047, style: "heritage_modern" }, result: { conceptId: "concept-v10_tooltrace_04_11", status: "ok" }, latencyMs: 867 },
    ], finalAction: "Present concept-v10_tooltrace_04_11 with reversible refinement controls.",
    policyChecks: ["provider-secret-not-client-visible", "source-geometry-preserved", "sensitive-fields-redacted"], provenance: provenance(91047),
  },
];
