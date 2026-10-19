import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_08: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_08_00", baseline: "scandinavian guest room with Soft Taupe", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "guest_room", style: "scandinavian", provenance: provenance(91084),
  },
  {
    id: "v10_counterfactual_08_01", baseline: "eclectic modern mudroom with Sage Olive", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "mudroom", style: "eclectic_modern", provenance: provenance(91085),
  },
  {
    id: "v10_counterfactual_08_02", baseline: "modern farmhouse open plan with Oatmeal Charcoal", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "open_plan", style: "modern_farmhouse", provenance: provenance(91086),
  },
  {
    id: "v10_counterfactual_08_03", baseline: "mid century bedroom with Warm White Sand", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bedroom", style: "mid_century", provenance: provenance(91087),
  },
  {
    id: "v10_counterfactual_08_04", baseline: "urban soft dining room with Ink + Brass", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "dining_room", style: "urban_soft", provenance: provenance(91088),
  },
  {
    id: "v10_counterfactual_08_05", baseline: "new nordic entryway with Cedar Cream", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "entryway", style: "new_nordic", provenance: provenance(91089),
  },
  {
    id: "v10_counterfactual_08_06", baseline: "contemporary nursery with Forest Stone", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "contemporary", provenance: provenance(91090),
  },
  {
    id: "v10_counterfactual_08_07", baseline: "minimalist media room with Mist Blue", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "minimalist", provenance: provenance(91091),
  },
  {
    id: "v10_counterfactual_08_08", baseline: "moody modern reading nook with Nordic Fog", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "moody_modern", provenance: provenance(91092),
  },
  {
    id: "v10_counterfactual_08_09", baseline: "coastal modern basement with Navy Linen", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "coastal_modern", provenance: provenance(91093),
  },
  {
    id: "v10_counterfactual_08_10", baseline: "japandi living room with Mushroom Cream", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "japandi", provenance: provenance(91094),
  },
  {
    id: "v10_counterfactual_08_11", baseline: "heritage modern kitchen with Clay Terracotta", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "heritage_modern", provenance: provenance(91095),
  },
];
