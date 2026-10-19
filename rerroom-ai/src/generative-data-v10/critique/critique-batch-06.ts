import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_06: CritiqueExample[] = [
  {
    id: "v10_critique_06_00", roomType: "nursery", style: "scandinavian", conceptDescription: "A scandinavian nursery using Soft Taupe and brushed brass.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred scandinavian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91060),
  },
  {
    id: "v10_critique_06_01", roomType: "media_room", style: "eclectic_modern", conceptDescription: "A eclectic modern media room using Sage Olive and boucle.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred eclectic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91061),
  },
  {
    id: "v10_critique_06_02", roomType: "reading_nook", style: "modern_farmhouse", conceptDescription: "A modern farmhouse reading nook using Oatmeal Charcoal and rattan.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred modern farmhouse direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91062),
  },
  {
    id: "v10_critique_06_03", roomType: "basement", style: "mid_century", conceptDescription: "A mid century basement using Warm White Sand and light oak.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred mid century direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91063),
  },
  {
    id: "v10_critique_06_04", roomType: "living_room", style: "urban_soft", conceptDescription: "A urban soft living room using Ink + Brass and ash.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred urban soft direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91064),
  },
  {
    id: "v10_critique_06_05", roomType: "kitchen", style: "new_nordic", conceptDescription: "A new nordic kitchen using Cedar Cream and travertine.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred new nordic direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91065),
  },
  {
    id: "v10_critique_06_06", roomType: "home_office", style: "contemporary", conceptDescription: "A contemporary home office using Forest Stone and linen.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred contemporary direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91066),
  },
  {
    id: "v10_critique_06_07", roomType: "bathroom", style: "minimalist", conceptDescription: "A minimalist bathroom using Mist Blue and ceramic.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred minimalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91067),
  },
  {
    id: "v10_critique_06_08", roomType: "studio", style: "moody_modern", conceptDescription: "A moody modern studio using Nordic Fog and white oak.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred moody modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91068),
  },
  {
    id: "v10_critique_06_09", roomType: "guest_room", style: "coastal_modern", conceptDescription: "A coastal modern guest room using Navy Linen and blackened steel.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred coastal modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91069),
  },
  {
    id: "v10_critique_06_10", roomType: "mudroom", style: "japandi", conceptDescription: "A japandi mudroom using Mushroom Cream and microcement.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred japandi direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91070),
  },
  {
    id: "v10_critique_06_11", roomType: "open_plan", style: "heritage_modern", conceptDescription: "A heritage modern open plan using Clay Terracotta and wool.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred heritage modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91071),
  },
];
