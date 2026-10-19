import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_02: CritiqueExample[] = [
  {
    id: "v10_critique_02_00", roomType: "bedroom", style: "scandinavian", conceptDescription: "A scandinavian bedroom using Soft Taupe and white oak.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred scandinavian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91012),
  },
  {
    id: "v10_critique_02_01", roomType: "dining_room", style: "eclectic_modern", conceptDescription: "A eclectic modern dining room using Sage Olive and blackened steel.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred eclectic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91013),
  },
  {
    id: "v10_critique_02_02", roomType: "entryway", style: "modern_farmhouse", conceptDescription: "A modern farmhouse entryway using Oatmeal Charcoal and microcement.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred modern farmhouse direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91014),
  },
  {
    id: "v10_critique_02_03", roomType: "nursery", style: "mid_century", conceptDescription: "A mid century nursery using Warm White Sand and wool.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred mid century direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91015),
  },
  {
    id: "v10_critique_02_04", roomType: "media_room", style: "urban_soft", conceptDescription: "A urban soft media room using Ink + Brass and fluted glass.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred urban soft direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91016),
  },
  {
    id: "v10_critique_02_05", roomType: "reading_nook", style: "new_nordic", conceptDescription: "A new nordic reading nook using Cedar Cream and walnut.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred new nordic direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91017),
  },
  {
    id: "v10_critique_02_06", roomType: "basement", style: "contemporary", conceptDescription: "A contemporary basement using Forest Stone and brushed brass.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred contemporary direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91018),
  },
  {
    id: "v10_critique_02_07", roomType: "living_room", style: "minimalist", conceptDescription: "A minimalist living room using Mist Blue and boucle.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred minimalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91019),
  },
  {
    id: "v10_critique_02_08", roomType: "kitchen", style: "moody_modern", conceptDescription: "A moody modern kitchen using Nordic Fog and rattan.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred moody modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91020),
  },
  {
    id: "v10_critique_02_09", roomType: "home_office", style: "coastal_modern", conceptDescription: "A coastal modern home office using Navy Linen and light oak.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred coastal modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91021),
  },
  {
    id: "v10_critique_02_10", roomType: "bathroom", style: "japandi", conceptDescription: "A japandi bathroom using Mushroom Cream and ash.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred japandi direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91022),
  },
  {
    id: "v10_critique_02_11", roomType: "studio", style: "heritage_modern", conceptDescription: "A heritage modern studio using Clay Terracotta and travertine.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred heritage modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91023),
  },
];
