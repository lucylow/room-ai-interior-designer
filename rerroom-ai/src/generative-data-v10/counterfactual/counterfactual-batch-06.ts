import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_06: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_06_00", baseline: "scandinavian nursery with Soft Taupe", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "scandinavian", provenance: provenance(91060),
  },
  {
    id: "v10_counterfactual_06_01", baseline: "eclectic modern media room with Sage Olive", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "eclectic_modern", provenance: provenance(91061),
  },
  {
    id: "v10_counterfactual_06_02", baseline: "modern farmhouse reading nook with Oatmeal Charcoal", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "modern_farmhouse", provenance: provenance(91062),
  },
  {
    id: "v10_counterfactual_06_03", baseline: "mid century basement with Warm White Sand", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "mid_century", provenance: provenance(91063),
  },
  {
    id: "v10_counterfactual_06_04", baseline: "urban soft living room with Ink + Brass", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "urban_soft", provenance: provenance(91064),
  },
  {
    id: "v10_counterfactual_06_05", baseline: "new nordic kitchen with Cedar Cream", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "new_nordic", provenance: provenance(91065),
  },
  {
    id: "v10_counterfactual_06_06", baseline: "contemporary home office with Forest Stone", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "home_office", style: "contemporary", provenance: provenance(91066),
  },
  {
    id: "v10_counterfactual_06_07", baseline: "minimalist bathroom with Mist Blue", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bathroom", style: "minimalist", provenance: provenance(91067),
  },
  {
    id: "v10_counterfactual_06_08", baseline: "moody modern studio with Nordic Fog", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "studio", style: "moody_modern", provenance: provenance(91068),
  },
  {
    id: "v10_counterfactual_06_09", baseline: "coastal modern guest room with Navy Linen", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "guest_room", style: "coastal_modern", provenance: provenance(91069),
  },
  {
    id: "v10_counterfactual_06_10", baseline: "japandi mudroom with Mushroom Cream", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "mudroom", style: "japandi", provenance: provenance(91070),
  },
  {
    id: "v10_counterfactual_06_11", baseline: "heritage modern open plan with Clay Terracotta", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "open_plan", style: "heritage_modern", provenance: provenance(91071),
  },
];
