import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_04: CritiqueExample[] = [
  {
    id: "v10_critique_04_00", roomType: "home_office", style: "scandinavian", conceptDescription: "A scandinavian home office using Soft Taupe and ash.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred scandinavian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91036),
  },
  {
    id: "v10_critique_04_01", roomType: "bathroom", style: "eclectic_modern", conceptDescription: "A eclectic modern bathroom using Sage Olive and travertine.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred eclectic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91037),
  },
  {
    id: "v10_critique_04_02", roomType: "studio", style: "modern_farmhouse", conceptDescription: "A modern farmhouse studio using Oatmeal Charcoal and linen.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred modern farmhouse direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91038),
  },
  {
    id: "v10_critique_04_03", roomType: "guest_room", style: "mid_century", conceptDescription: "A mid century guest room using Warm White Sand and ceramic.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred mid century direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91039),
  },
  {
    id: "v10_critique_04_04", roomType: "mudroom", style: "urban_soft", conceptDescription: "A urban soft mudroom using Ink + Brass and white oak.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred urban soft direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91040),
  },
  {
    id: "v10_critique_04_05", roomType: "open_plan", style: "new_nordic", conceptDescription: "A new nordic open plan using Cedar Cream and blackened steel.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred new nordic direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91041),
  },
  {
    id: "v10_critique_04_06", roomType: "bedroom", style: "contemporary", conceptDescription: "A contemporary bedroom using Forest Stone and microcement.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred contemporary direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91042),
  },
  {
    id: "v10_critique_04_07", roomType: "dining_room", style: "minimalist", conceptDescription: "A minimalist dining room using Mist Blue and wool.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred minimalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91043),
  },
  {
    id: "v10_critique_04_08", roomType: "entryway", style: "moody_modern", conceptDescription: "A moody modern entryway using Nordic Fog and fluted glass.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred moody modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91044),
  },
  {
    id: "v10_critique_04_09", roomType: "nursery", style: "coastal_modern", conceptDescription: "A coastal modern nursery using Navy Linen and walnut.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred coastal modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91045),
  },
  {
    id: "v10_critique_04_10", roomType: "media_room", style: "japandi", conceptDescription: "A japandi media room using Mushroom Cream and brushed brass.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred japandi direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91046),
  },
  {
    id: "v10_critique_04_11", roomType: "reading_nook", style: "heritage_modern", conceptDescription: "A heritage modern reading nook using Clay Terracotta and boucle.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred heritage modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91047),
  },
];
