import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_03: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_03_00", baseline: "art deco guest room with Soft Taupe", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "guest_room", style: "art_deco", provenance: provenance(91024),
  },
  {
    id: "v10_counterfactual_03_01", baseline: "bohemian mudroom with Sage Olive", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "mudroom", style: "bohemian", provenance: provenance(91025),
  },
  {
    id: "v10_counterfactual_03_02", baseline: "modern open plan with Oatmeal Charcoal", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "open_plan", style: "modern", provenance: provenance(91026),
  },
  {
    id: "v10_counterfactual_03_03", baseline: "desert modern bedroom with Warm White Sand", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bedroom", style: "desert_modern", provenance: provenance(91027),
  },
  {
    id: "v10_counterfactual_03_04", baseline: "quiet luxury dining room with Ink + Brass", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "dining_room", style: "quiet_luxury", provenance: provenance(91028),
  },
  {
    id: "v10_counterfactual_03_05", baseline: "industrial entryway with Cedar Cream", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "entryway", style: "industrial", provenance: provenance(91029),
  },
  {
    id: "v10_counterfactual_03_06", baseline: "craft modern nursery with Forest Stone", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "craft_modern", provenance: provenance(91030),
  },
  {
    id: "v10_counterfactual_03_07", baseline: "transitional media room with Mist Blue", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "transitional", provenance: provenance(91031),
  },
  {
    id: "v10_counterfactual_03_08", baseline: "organic modern reading nook with Nordic Fog", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "organic_modern", provenance: provenance(91032),
  },
  {
    id: "v10_counterfactual_03_09", baseline: "naturalist basement with Navy Linen", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "naturalist", provenance: provenance(91033),
  },
  {
    id: "v10_counterfactual_03_10", baseline: "soft industrial living room with Mushroom Cream", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "soft_industrial", provenance: provenance(91034),
  },
  {
    id: "v10_counterfactual_03_11", baseline: "warm minimal kitchen with Clay Terracotta", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "warm_minimal", provenance: provenance(91035),
  },
];
