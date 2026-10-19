import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_02: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_02_00", baseline: "scandinavian bedroom with Soft Taupe", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bedroom", style: "scandinavian", provenance: provenance(91012),
  },
  {
    id: "v10_counterfactual_02_01", baseline: "eclectic modern dining room with Sage Olive", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "dining_room", style: "eclectic_modern", provenance: provenance(91013),
  },
  {
    id: "v10_counterfactual_02_02", baseline: "modern farmhouse entryway with Oatmeal Charcoal", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "entryway", style: "modern_farmhouse", provenance: provenance(91014),
  },
  {
    id: "v10_counterfactual_02_03", baseline: "mid century nursery with Warm White Sand", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "mid_century", provenance: provenance(91015),
  },
  {
    id: "v10_counterfactual_02_04", baseline: "urban soft media room with Ink + Brass", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "urban_soft", provenance: provenance(91016),
  },
  {
    id: "v10_counterfactual_02_05", baseline: "new nordic reading nook with Cedar Cream", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "new_nordic", provenance: provenance(91017),
  },
  {
    id: "v10_counterfactual_02_06", baseline: "contemporary basement with Forest Stone", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "contemporary", provenance: provenance(91018),
  },
  {
    id: "v10_counterfactual_02_07", baseline: "minimalist living room with Mist Blue", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "minimalist", provenance: provenance(91019),
  },
  {
    id: "v10_counterfactual_02_08", baseline: "moody modern kitchen with Nordic Fog", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "moody_modern", provenance: provenance(91020),
  },
  {
    id: "v10_counterfactual_02_09", baseline: "coastal modern home office with Navy Linen", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "home_office", style: "coastal_modern", provenance: provenance(91021),
  },
  {
    id: "v10_counterfactual_02_10", baseline: "japandi bathroom with Mushroom Cream", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bathroom", style: "japandi", provenance: provenance(91022),
  },
  {
    id: "v10_counterfactual_02_11", baseline: "heritage modern studio with Clay Terracotta", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "studio", style: "heritage_modern", provenance: provenance(91023),
  },
];
