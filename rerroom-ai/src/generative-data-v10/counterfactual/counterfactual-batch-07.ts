import type { CounterfactualExample } from "../core/types";
import {  provenance } from "../core/factories";

export const COUNTERFACTUAL_BATCH_07: CounterfactualExample[] = [
  {
    id: "v10_counterfactual_07_00", baseline: "art deco bedroom with Soft Taupe", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bedroom", style: "art_deco", provenance: provenance(91072),
  },
  {
    id: "v10_counterfactual_07_01", baseline: "bohemian dining room with Sage Olive", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "dining_room", style: "bohemian", provenance: provenance(91073),
  },
  {
    id: "v10_counterfactual_07_02", baseline: "modern entryway with Oatmeal Charcoal", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "entryway", style: "modern", provenance: provenance(91074),
  },
  {
    id: "v10_counterfactual_07_03", baseline: "desert modern nursery with Warm White Sand", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "nursery", style: "desert_modern", provenance: provenance(91075),
  },
  {
    id: "v10_counterfactual_07_04", baseline: "quiet luxury media room with Ink + Brass", intervention: "increase natural light",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "media_room", style: "quiet_luxury", provenance: provenance(91076),
  },
  {
    id: "v10_counterfactual_07_05", baseline: "industrial reading nook with Cedar Cream", intervention: "replace coffee table with round profile",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "reading_nook", style: "industrial", provenance: provenance(91077),
  },
  {
    id: "v10_counterfactual_07_06", baseline: "craft modern basement with Forest Stone", intervention: "reduce furniture density",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "basement", style: "craft_modern", provenance: provenance(91078),
  },
  {
    id: "v10_counterfactual_07_07", baseline: "transitional living room with Mist Blue", intervention: "switch accent wall to lighter tone",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "living_room", style: "transitional", provenance: provenance(91079),
  },
  {
    id: "v10_counterfactual_07_08", baseline: "organic modern kitchen with Nordic Fog", intervention: "add closed storage",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "kitchen", style: "organic_modern", provenance: provenance(91080),
  },
  {
    id: "v10_counterfactual_07_09", baseline: "naturalist home office with Navy Linen", intervention: "rotate sofa 7 degrees",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "home_office", style: "naturalist", provenance: provenance(91081),
  },
  {
    id: "v10_counterfactual_07_10", baseline: "soft industrial bathroom with Mushroom Cream", intervention: "use smaller rug",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "bathroom", style: "soft_industrial", provenance: provenance(91082),
  },
  {
    id: "v10_counterfactual_07_11", baseline: "warm minimal studio with Clay Terracotta", intervention: "swap metal accent for oak",
    expectedChange: ["improved focal clarity", "updated material/palette balance", "same room envelope"], preserved: ["wall positions", "doors", "windows", "ceiling height"],
    tradeoffs: ["small composition change", "possible reduced storage", "new material cost"], roomType: "studio", style: "warm_minimal", provenance: provenance(91083),
  },
];
