import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_05: CritiqueExample[] = [
  {
    id: "v10_critique_05_00", roomType: "basement", style: "art_deco", conceptDescription: "A art deco basement using Soft Taupe and rattan.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred art deco direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91048),
  },
  {
    id: "v10_critique_05_01", roomType: "living_room", style: "bohemian", conceptDescription: "A bohemian living room using Sage Olive and light oak.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred bohemian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91049),
  },
  {
    id: "v10_critique_05_02", roomType: "kitchen", style: "modern", conceptDescription: "A modern kitchen using Oatmeal Charcoal and ash.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91050),
  },
  {
    id: "v10_critique_05_03", roomType: "home_office", style: "desert_modern", conceptDescription: "A desert modern home office using Warm White Sand and travertine.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred desert modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91051),
  },
  {
    id: "v10_critique_05_04", roomType: "bathroom", style: "quiet_luxury", conceptDescription: "A quiet luxury bathroom using Ink + Brass and linen.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred quiet luxury direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91052),
  },
  {
    id: "v10_critique_05_05", roomType: "studio", style: "industrial", conceptDescription: "A industrial studio using Cedar Cream and ceramic.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91053),
  },
  {
    id: "v10_critique_05_06", roomType: "guest_room", style: "craft_modern", conceptDescription: "A craft modern guest room using Forest Stone and white oak.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred craft modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91054),
  },
  {
    id: "v10_critique_05_07", roomType: "mudroom", style: "transitional", conceptDescription: "A transitional mudroom using Mist Blue and blackened steel.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred transitional direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91055),
  },
  {
    id: "v10_critique_05_08", roomType: "open_plan", style: "organic_modern", conceptDescription: "A organic modern open plan using Nordic Fog and microcement.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred organic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91056),
  },
  {
    id: "v10_critique_05_09", roomType: "bedroom", style: "naturalist", conceptDescription: "A naturalist bedroom using Navy Linen and wool.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred naturalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91057),
  },
  {
    id: "v10_critique_05_10", roomType: "dining_room", style: "soft_industrial", conceptDescription: "A soft industrial dining room using Mushroom Cream and fluted glass.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred soft industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91058),
  },
  {
    id: "v10_critique_05_11", roomType: "entryway", style: "warm_minimal", conceptDescription: "A warm minimal entryway using Clay Terracotta and walnut.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred warm minimal direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91059),
  },
];
