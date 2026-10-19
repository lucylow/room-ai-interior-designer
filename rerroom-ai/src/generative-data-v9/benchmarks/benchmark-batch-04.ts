import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_04: BenchmarkCase[] = [
  {
    id: "bench-v9-0031",
    category: "style_filter",
    input: {"roomType": "nursery", "style": "bohemian", "paletteId": "midnight_plum", "request": "soften the contrast"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0032",
    category: "palette_filter",
    input: {"roomType": "studio", "style": "contemporary", "paletteId": "blue_gray", "request": "use lighter wood"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0033",
    category: "layout_advice",
    input: {"roomType": "media_room", "style": "warm_minimal", "paletteId": "olive_cream", "request": "add more texture"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0034",
    category: "budget_guard",
    input: {"roomType": "guest_room", "style": "quiet_luxury", "paletteId": "sunlit_apricot", "request": "make it more family friendly"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0035",
    category: "geometry_preservation",
    input: {"roomType": "reading_nook", "style": "coastal_modern", "paletteId": "cobalt_coral", "request": "make it more budget conscious"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0036",
    category: "refinement_consistency",
    input: {"roomType": "living_room", "style": "modern_farmhouse", "paletteId": "sandstone", "request": "make it warmer"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0037",
    category: "shopping_fit",
    input: {"roomType": "bedroom", "style": "transitional", "paletteId": "nordic_sage", "request": "make it brighter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0038",
    category: "explainability",
    input: {"roomType": "kitchen", "style": "art_deco", "paletteId": "charcoal_clay", "request": "reduce visual clutter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0039",
    category: "diversity",
    input: {"roomType": "dining_room", "style": "new_nordic", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0040",
    category: "prompt_grounding",
    input: {"roomType": "home_office", "style": "soft_industrial", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
