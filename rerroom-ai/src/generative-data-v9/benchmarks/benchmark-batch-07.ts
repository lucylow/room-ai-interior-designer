import type { BenchmarkCase } from "../core/types";

export const BENCHMARK_BATCH_07: BenchmarkCase[] = [
  {
    id: "bench-v9-0061",
    category: "style_filter",
    input: {"roomType": "bedroom", "style": "transitional", "paletteId": "nordic_sage", "request": "make it brighter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0062",
    category: "palette_filter",
    input: {"roomType": "kitchen", "style": "art_deco", "paletteId": "charcoal_clay", "request": "reduce visual clutter"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0063",
    category: "layout_advice",
    input: {"roomType": "dining_room", "style": "new_nordic", "paletteId": "forest_moss", "request": "push the style further"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0064",
    category: "budget_guard",
    input: {"roomType": "home_office", "style": "soft_industrial", "paletteId": "coastal_fog", "request": "make the layout feel more open"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0065",
    category: "geometry_preservation",
    input: {"roomType": "entryway", "style": "desert_modern", "paletteId": "ink_brass", "request": "add one stronger focal point"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0066",
    category: "refinement_consistency",
    input: {"roomType": "bathroom", "style": "moody_modern", "paletteId": "terracotta_oak", "request": "swap the main chair"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0067",
    category: "shopping_fit",
    input: {"roomType": "nursery", "style": "eclectic_modern", "paletteId": "midnight_plum", "request": "soften the contrast"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0068",
    category: "explainability",
    input: {"roomType": "studio", "style": "craft_modern", "paletteId": "blue_gray", "request": "use lighter wood"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0069",
    category: "diversity",
    input: {"roomType": "media_room", "style": "heritage_modern", "paletteId": "olive_cream", "request": "add more texture"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
  {
    id: "bench-v9-0070",
    category: "prompt_grounding",
    input: {"roomType": "guest_room", "style": "urban_soft", "paletteId": "sunlit_apricot", "request": "make it more family friendly"},
    expected: {"mustPreserveGeometry": true, "hasActionableAdvice": true, "scoreMinimum": 0.62},
    tolerance: 0.08
  },
];
