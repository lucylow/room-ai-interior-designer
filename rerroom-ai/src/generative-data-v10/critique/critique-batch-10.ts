import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_10: CritiqueExample[] = [
  {
    id: "v10_critique_10_00", roomType: "basement", style: "scandinavian", conceptDescription: "A scandinavian basement using Soft Taupe and linen.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred scandinavian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91108),
  },
  {
    id: "v10_critique_10_01", roomType: "living_room", style: "eclectic_modern", conceptDescription: "A eclectic modern living room using Sage Olive and ceramic.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred eclectic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91109),
  },
  {
    id: "v10_critique_10_02", roomType: "kitchen", style: "modern_farmhouse", conceptDescription: "A modern farmhouse kitchen using Oatmeal Charcoal and white oak.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred modern farmhouse direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91110),
  },
  {
    id: "v10_critique_10_03", roomType: "home_office", style: "mid_century", conceptDescription: "A mid century home office using Warm White Sand and blackened steel.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred mid century direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91111),
  },
  {
    id: "v10_critique_10_04", roomType: "bathroom", style: "urban_soft", conceptDescription: "A urban soft bathroom using Ink + Brass and microcement.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred urban soft direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91112),
  },
  {
    id: "v10_critique_10_05", roomType: "studio", style: "new_nordic", conceptDescription: "A new nordic studio using Cedar Cream and wool.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred new nordic direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91113),
  },
  {
    id: "v10_critique_10_06", roomType: "guest_room", style: "contemporary", conceptDescription: "A contemporary guest room using Forest Stone and fluted glass.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred contemporary direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91114),
  },
  {
    id: "v10_critique_10_07", roomType: "mudroom", style: "minimalist", conceptDescription: "A minimalist mudroom using Mist Blue and walnut.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred minimalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91115),
  },
  {
    id: "v10_critique_10_08", roomType: "open_plan", style: "moody_modern", conceptDescription: "A moody modern open plan using Nordic Fog and brushed brass.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred moody modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91116),
  },
  {
    id: "v10_critique_10_09", roomType: "bedroom", style: "coastal_modern", conceptDescription: "A coastal modern bedroom using Navy Linen and boucle.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred coastal modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91117),
  },
  {
    id: "v10_critique_10_10", roomType: "dining_room", style: "japandi", conceptDescription: "A japandi dining room using Mushroom Cream and rattan.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred japandi direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91118),
  },
  {
    id: "v10_critique_10_11", roomType: "entryway", style: "heritage_modern", conceptDescription: "A heritage modern entryway using Clay Terracotta and light oak.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred heritage modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91119),
  },
];
