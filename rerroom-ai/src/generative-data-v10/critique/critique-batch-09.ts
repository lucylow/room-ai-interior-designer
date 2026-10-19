import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_09: CritiqueExample[] = [
  {
    id: "v10_critique_09_00", roomType: "home_office", style: "art_deco", conceptDescription: "A art deco home office using Soft Taupe and white oak.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred art deco direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91096),
  },
  {
    id: "v10_critique_09_01", roomType: "bathroom", style: "bohemian", conceptDescription: "A bohemian bathroom using Sage Olive and blackened steel.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred bohemian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91097),
  },
  {
    id: "v10_critique_09_02", roomType: "studio", style: "modern", conceptDescription: "A modern studio using Oatmeal Charcoal and microcement.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91098),
  },
  {
    id: "v10_critique_09_03", roomType: "guest_room", style: "desert_modern", conceptDescription: "A desert modern guest room using Warm White Sand and wool.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred desert modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91099),
  },
  {
    id: "v10_critique_09_04", roomType: "mudroom", style: "quiet_luxury", conceptDescription: "A quiet luxury mudroom using Ink + Brass and fluted glass.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred quiet luxury direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91100),
  },
  {
    id: "v10_critique_09_05", roomType: "open_plan", style: "industrial", conceptDescription: "A industrial open plan using Cedar Cream and walnut.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91101),
  },
  {
    id: "v10_critique_09_06", roomType: "bedroom", style: "craft_modern", conceptDescription: "A craft modern bedroom using Forest Stone and brushed brass.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred craft modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91102),
  },
  {
    id: "v10_critique_09_07", roomType: "dining_room", style: "transitional", conceptDescription: "A transitional dining room using Mist Blue and boucle.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred transitional direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91103),
  },
  {
    id: "v10_critique_09_08", roomType: "entryway", style: "organic_modern", conceptDescription: "A organic modern entryway using Nordic Fog and rattan.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred organic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91104),
  },
  {
    id: "v10_critique_09_09", roomType: "nursery", style: "naturalist", conceptDescription: "A naturalist nursery using Navy Linen and light oak.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred naturalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91105),
  },
  {
    id: "v10_critique_09_10", roomType: "media_room", style: "soft_industrial", conceptDescription: "A soft industrial media room using Mushroom Cream and ash.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred soft industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91106),
  },
  {
    id: "v10_critique_09_11", roomType: "reading_nook", style: "warm_minimal", conceptDescription: "A warm minimal reading nook using Clay Terracotta and travertine.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred warm minimal direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91107),
  },
];
