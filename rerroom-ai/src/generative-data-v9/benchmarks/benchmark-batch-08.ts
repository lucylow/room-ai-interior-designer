import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_08: BenchmarkCase[] = [
  {
    id: "bench-v9-0071",
    category: "style_filter",
    input: {"roomType": "reading_nook", "style": "naturalist", "paletteId": "cobalt_coral", "request": "make it more budget conscious"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0072",
    category: "palette_filter",
    input: {"roomType": "living_room", "style": "modern", "paletteId": "sandstone", "request": "make it warmer"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0073",
    category: "layout_advice",
    input: {"roomType": "bedroom", "style": "minimalist", "paletteId": "nordic_sage", "request": "make it brighter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0074",
    category: "budget_guard",
    input: {"roomType": "kitchen", "style": "scandinavian", "paletteId": "charcoal_clay", "request": "reduce visual clutter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0075",
    category: "geometry_preservation",
    input: {"roomType": "dining_room", "style": "industrial", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0076",
    category: "refinement_consistency",
    input: {"roomType": "home_office", "style": "japandi", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0077",
    category: "shopping_fit",
    input: {"roomType": "entryway", "style": "mid_century", "paletteId": "ink_brass", "request": "add one stronger focal point"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0078",
    category: "explainability",
    input: {"roomType": "bathroom", "style": "organic_modern", "paletteId": "terracotta_oak", "request": "swap the main chair"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0079",
    category: "diversity",
    input: {"roomType": "nursery", "style": "bohemian", "paletteId": "midnight_plum", "request": "soften the contrast"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0080",
    category: "prompt_grounding",
    input: {"roomType": "studio", "style": "contemporary", "paletteId": "blue_gray", "request": "use lighter wood"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
