import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_09: BenchmarkCase[] = [
  {
    id: "bench-v9-0081",
    category: "style_filter",
    input: {"roomType": "media_room", "style": "warm_minimal", "paletteId": "olive_cream", "request": "add more texture"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0082",
    category: "palette_filter",
    input: {"roomType": "guest_room", "style": "quiet_luxury", "paletteId": "sunlit_apricot", "request": "make it more family friendly"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0083",
    category: "layout_advice",
    input: {"roomType": "reading_nook", "style": "coastal_modern", "paletteId": "cobalt_coral", "request": "make it more budget conscious"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0084",
    category: "budget_guard",
    input: {"roomType": "living_room", "style": "modern_farmhouse", "paletteId": "sandstone", "request": "make it warmer"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0085",
    category: "geometry_preservation",
    input: {"roomType": "bedroom", "style": "transitional", "paletteId": "nordic_sage", "request": "make it brighter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0086",
    category: "refinement_consistency",
    input: {"roomType": "kitchen", "style": "art_deco", "paletteId": "charcoal_clay", "request": "reduce visual clutter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0087",
    category: "shopping_fit",
    input: {"roomType": "dining_room", "style": "new_nordic", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0088",
    category: "explainability",
    input: {"roomType": "home_office", "style": "soft_industrial", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0089",
    category: "diversity",
    input: {"roomType": "entryway", "style": "desert_modern", "paletteId": "ink_brass", "request": "add one stronger focal point"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0090",
    category: "prompt_grounding",
    input: {"roomType": "bathroom", "style": "moody_modern", "paletteId": "terracotta_oak", "request": "swap the main chair"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
