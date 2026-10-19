import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_03: CritiqueExample[] = [
  {
    id: "v10_critique_03_00", roomType: "guest_room", style: "art_deco", conceptDescription: "A art deco guest room using Soft Taupe and linen.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred art deco direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91024),
  },
  {
    id: "v10_critique_03_01", roomType: "mudroom", style: "bohemian", conceptDescription: "A bohemian mudroom using Sage Olive and ceramic.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred bohemian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91025),
  },
  {
    id: "v10_critique_03_02", roomType: "open_plan", style: "modern", conceptDescription: "A modern open plan using Oatmeal Charcoal and white oak.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91026),
  },
  {
    id: "v10_critique_03_03", roomType: "bedroom", style: "desert_modern", conceptDescription: "A desert modern bedroom using Warm White Sand and blackened steel.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred desert modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91027),
  },
  {
    id: "v10_critique_03_04", roomType: "dining_room", style: "quiet_luxury", conceptDescription: "A quiet luxury dining room using Ink + Brass and microcement.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred quiet luxury direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91028),
  },
  {
    id: "v10_critique_03_05", roomType: "entryway", style: "industrial", conceptDescription: "A industrial entryway using Cedar Cream and wool.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91029),
  },
  {
    id: "v10_critique_03_06", roomType: "nursery", style: "craft_modern", conceptDescription: "A craft modern nursery using Forest Stone and fluted glass.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred craft modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91030),
  },
  {
    id: "v10_critique_03_07", roomType: "media_room", style: "transitional", conceptDescription: "A transitional media room using Mist Blue and walnut.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred transitional direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91031),
  },
  {
    id: "v10_critique_03_08", roomType: "reading_nook", style: "organic_modern", conceptDescription: "A organic modern reading nook using Nordic Fog and brushed brass.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred organic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91032),
  },
  {
    id: "v10_critique_03_09", roomType: "basement", style: "naturalist", conceptDescription: "A naturalist basement using Navy Linen and boucle.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred naturalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91033),
  },
  {
    id: "v10_critique_03_10", roomType: "living_room", style: "soft_industrial", conceptDescription: "A soft industrial living room using Mushroom Cream and rattan.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred soft industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91034),
  },
  {
    id: "v10_critique_03_11", roomType: "kitchen", style: "warm_minimal", conceptDescription: "A warm minimal kitchen using Clay Terracotta and light oak.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred warm minimal direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91035),
  },
];
