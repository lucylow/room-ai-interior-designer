import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_05: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_05_00", baseline: "art deco basement with Soft Taupe", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "art_deco", provenance: provenance(91048),
  },
  {
    id: "v10_counterfactual_05_01", baseline: "bohemian living room with Sage Olive", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "bohemian", provenance: provenance(91049),
  },
  {
    id: "v10_counterfactual_05_02", baseline: "modern kitchen with Oatmeal Charcoal", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "modern", provenance: provenance(91050),
  },
  {
    id: "v10_counterfactual_05_03", baseline: "desert modern home office with Warm White Sand", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "home_office", style: "desert_modern", provenance: provenance(91051),
  },
  {
    id: "v10_counterfactual_05_04", baseline: "quiet luxury bathroom with Ink + Brass", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bathroom", style: "quiet_luxury", provenance: provenance(91052),
  },
  {
    id: "v10_counterfactual_05_05", baseline: "industrial studio with Cedar Cream", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "studio", style: "industrial", provenance: provenance(91053),
  },
  {
    id: "v10_counterfactual_05_06", baseline: "craft modern guest room with Forest Stone", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "guest_room", style: "craft_modern", provenance: provenance(91054),
  },
  {
    id: "v10_counterfactual_05_07", baseline: "transitional mudroom with Mist Blue", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "mudroom", style: "transitional", provenance: provenance(91055),
  },
  {
    id: "v10_counterfactual_05_08", baseline: "organic modern open plan with Nordic Fog", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "open_plan", style: "organic_modern", provenance: provenance(91056),
  },
  {
    id: "v10_counterfactual_05_09", baseline: "naturalist bedroom with Navy Linen", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bedroom", style: "naturalist", provenance: provenance(91057),
  },
  {
    id: "v10_counterfactual_05_10", baseline: "soft industrial dining room with Mushroom Cream", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "dining_room", style: "soft_industrial", provenance: provenance(91058),
  },
  {
    id: "v10_counterfactual_05_11", baseline: "warm minimal entryway with Clay Terracotta", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "entryway", style: "warm_minimal", provenance: provenance(91059),
  },
];
