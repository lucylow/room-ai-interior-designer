import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_06: BenchmarkCase[] = [
  {
    id: "bench-v9-0051",
    category: "style_filter",
    input: {"roomType": "dining_room", "style": "industrial", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0052",
    category: "palette_filter",
    input: {"roomType": "home_office", "style": "japandi", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0053",
    category: "layout_advice",
    input: {"roomType": "entryway", "style": "mid_century", "paletteId": "ink_brass", "request": "add one stronger focal point"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0054",
    category: "budget_guard",
    input: {"roomType": "bathroom", "style": "organic_modern", "paletteId": "terracotta_oak", "request": "swap the main chair"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0055",
    category: "geometry_preservation",
    input: {"roomType": "nursery", "style": "bohemian", "paletteId": "midnight_plum", "request": "soften the contrast"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0056",
    category: "refinement_consistency",
    input: {"roomType": "studio", "style": "contemporary", "paletteId": "blue_gray", "request": "use lighter wood"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0057",
    category: "shopping_fit",
    input: {"roomType": "media_room", "style": "warm_minimal", "paletteId": "olive_cream", "request": "add more texture"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0058",
    category: "explainability",
    input: {"roomType": "guest_room", "style": "quiet_luxury", "paletteId": "sunlit_apricot", "request": "make it more family friendly"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0059",
    category: "diversity",
    input: {"roomType": "reading_nook", "style": "coastal_modern", "paletteId": "cobalt_coral", "request": "make it more budget conscious"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0060",
    category: "prompt_grounding",
    input: {"roomType": "living_room", "style": "modern_farmhouse", "paletteId": "sandstone", "request": "make it warmer"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
