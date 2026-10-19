import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_03: BenchmarkCase[] = [
  {
    id: "bench-v9-0021",
    category: "style_filter",
    input: {"roomType": "media_room", "style": "heritage_modern", "paletteId": "olive_cream", "request": "add more texture"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0022",
    category: "palette_filter",
    input: {"roomType": "guest_room", "style": "urban_soft", "paletteId": "sunlit_apricot", "request": "make it more family friendly"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0023",
    category: "layout_advice",
    input: {"roomType": "reading_nook", "style": "naturalist", "paletteId": "cobalt_coral", "request": "make it more budget conscious"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0024",
    category: "budget_guard",
    input: {"roomType": "living_room", "style": "modern", "paletteId": "sandstone", "request": "make it warmer"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0025",
    category: "geometry_preservation",
    input: {"roomType": "bedroom", "style": "minimalist", "paletteId": "nordic_sage", "request": "make it brighter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0026",
    category: "refinement_consistency",
    input: {"roomType": "kitchen", "style": "scandinavian", "paletteId": "charcoal_clay", "request": "reduce visual clutter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0027",
    category: "shopping_fit",
    input: {"roomType": "dining_room", "style": "industrial", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0028",
    category: "explainability",
    input: {"roomType": "home_office", "style": "japandi", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0029",
    category: "diversity",
    input: {"roomType": "entryway", "style": "mid_century", "paletteId": "ink_brass", "request": "add one stronger focal point"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0030",
    category: "prompt_grounding",
    input: {"roomType": "bathroom", "style": "organic_modern", "paletteId": "terracotta_oak", "request": "swap the main chair"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
