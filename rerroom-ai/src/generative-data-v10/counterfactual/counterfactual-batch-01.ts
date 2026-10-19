import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_01: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_01_00", baseline: "art deco nursery with Soft Taupe", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "art_deco", provenance: provenance(91000),
  },
  {
    id: "v10_counterfactual_01_01", baseline: "bohemian media room with Sage Olive", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "bohemian", provenance: provenance(91001),
  },
  {
    id: "v10_counterfactual_01_02", baseline: "modern reading nook with Oatmeal Charcoal", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "modern", provenance: provenance(91002),
  },
  {
    id: "v10_counterfactual_01_03", baseline: "desert modern basement with Warm White Sand", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "desert_modern", provenance: provenance(91003),
  },
  {
    id: "v10_counterfactual_01_04", baseline: "quiet luxury living room with Ink + Brass", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "quiet_luxury", provenance: provenance(91004),
  },
  {
    id: "v10_counterfactual_01_05", baseline: "industrial kitchen with Cedar Cream", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "industrial", provenance: provenance(91005),
  },
  {
    id: "v10_counterfactual_01_06", baseline: "craft modern home office with Forest Stone", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "home_office", style: "craft_modern", provenance: provenance(91006),
  },
  {
    id: "v10_counterfactual_01_07", baseline: "transitional bathroom with Mist Blue", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bathroom", style: "transitional", provenance: provenance(91007),
  },
  {
    id: "v10_counterfactual_01_08", baseline: "organic modern studio with Nordic Fog", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "studio", style: "organic_modern", provenance: provenance(91008),
  },
  {
    id: "v10_counterfactual_01_09", baseline: "naturalist guest room with Navy Linen", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "guest_room", style: "naturalist", provenance: provenance(91009),
  },
  {
    id: "v10_counterfactual_01_10", baseline: "soft industrial mudroom with Mushroom Cream", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "mudroom", style: "soft_industrial", provenance: provenance(91010),
  },
  {
    id: "v10_counterfactual_01_11", baseline: "warm minimal open plan with Clay Terracotta", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "open_plan", style: "warm_minimal", provenance: provenance(91011),
  },
];
