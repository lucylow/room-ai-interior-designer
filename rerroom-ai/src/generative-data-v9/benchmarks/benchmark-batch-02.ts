import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_02: BenchmarkCase[] = [
  {
    id: "bench-v9-0011",
    category: "style_filter",
    input: {"roomType": "reading_nook", "style": "coastal_modern", "paletteId": "cobalt_coral", "request": "make it more budget conscious"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0012",
    category: "palette_filter",
    input: {"roomType": "living_room", "style": "modern_farmhouse", "paletteId": "sandstone", "request": "make it warmer"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0013",
    category: "layout_advice",
    input: {"roomType": "bedroom", "style": "transitional", "paletteId": "nordic_sage", "request": "make it brighter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0014",
    category: "budget_guard",
    input: {"roomType": "kitchen", "style": "art_deco", "paletteId": "charcoal_clay", "request": "reduce visual clutter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0015",
    category: "geometry_preservation",
    input: {"roomType": "dining_room", "style": "new_nordic", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0016",
    category: "refinement_consistency",
    input: {"roomType": "home_office", "style": "soft_industrial", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0017",
    category: "shopping_fit",
    input: {"roomType": "entryway", "style": "desert_modern", "paletteId": "ink_brass", "request": "add one stronger focal point"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0018",
    category: "explainability",
    input: {"roomType": "bathroom", "style": "moody_modern", "paletteId": "terracotta_oak", "request": "swap the main chair"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0019",
    category: "diversity",
    input: {"roomType": "nursery", "style": "eclectic_modern", "paletteId": "midnight_plum", "request": "soften the contrast"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0020",
    category: "prompt_grounding",
    input: {"roomType": "studio", "style": "craft_modern", "paletteId": "blue_gray", "request": "use lighter wood"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
