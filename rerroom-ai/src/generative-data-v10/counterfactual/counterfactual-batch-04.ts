import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_04: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_04_00", baseline: "scandinavian home office with Soft Taupe", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "home_office", style: "scandinavian", provenance: provenance(91036),
  },
  {
    id: "v10_counterfactual_04_01", baseline: "eclectic modern bathroom with Sage Olive", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bathroom", style: "eclectic_modern", provenance: provenance(91037),
  },
  {
    id: "v10_counterfactual_04_02", baseline: "modern farmhouse studio with Oatmeal Charcoal", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "studio", style: "modern_farmhouse", provenance: provenance(91038),
  },
  {
    id: "v10_counterfactual_04_03", baseline: "mid century guest room with Warm White Sand", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "guest_room", style: "mid_century", provenance: provenance(91039),
  },
  {
    id: "v10_counterfactual_04_04", baseline: "urban soft mudroom with Ink + Brass", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "mudroom", style: "urban_soft", provenance: provenance(91040),
  },
  {
    id: "v10_counterfactual_04_05", baseline: "new nordic open plan with Cedar Cream", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "open_plan", style: "new_nordic", provenance: provenance(91041),
  },
  {
    id: "v10_counterfactual_04_06", baseline: "contemporary bedroom with Forest Stone", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bedroom", style: "contemporary", provenance: provenance(91042),
  },
  {
    id: "v10_counterfactual_04_07", baseline: "minimalist dining room with Mist Blue", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "dining_room", style: "minimalist", provenance: provenance(91043),
  },
  {
    id: "v10_counterfactual_04_08", baseline: "moody modern entryway with Nordic Fog", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "entryway", style: "moody_modern", provenance: provenance(91044),
  },
  {
    id: "v10_counterfactual_04_09", baseline: "coastal modern nursery with Navy Linen", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "coastal_modern", provenance: provenance(91045),
  },
  {
    id: "v10_counterfactual_04_10", baseline: "japandi media room with Mushroom Cream", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "japandi", provenance: provenance(91046),
  },
  {
    id: "v10_counterfactual_04_11", baseline: "heritage modern reading nook with Clay Terracotta", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "heritage_modern", provenance: provenance(91047),
  },
];
