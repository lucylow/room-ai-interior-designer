import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_08: CritiqueExample[] = [
  {
    id: "v10_critique_08_00", roomType: "guest_room", style: "scandinavian", conceptDescription: "A scandinavian guest room using Soft Taupe and microcement.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred scandinavian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91084),
  },
  {
    id: "v10_critique_08_01", roomType: "mudroom", style: "eclectic_modern", conceptDescription: "A eclectic modern mudroom using Sage Olive and wool.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred eclectic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91085),
  },
  {
    id: "v10_critique_08_02", roomType: "open_plan", style: "modern_farmhouse", conceptDescription: "A modern farmhouse open plan using Oatmeal Charcoal and fluted glass.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred modern farmhouse direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91086),
  },
  {
    id: "v10_critique_08_03", roomType: "bedroom", style: "mid_century", conceptDescription: "A mid century bedroom using Warm White Sand and walnut.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred mid century direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91087),
  },
  {
    id: "v10_critique_08_04", roomType: "dining_room", style: "urban_soft", conceptDescription: "A urban soft dining room using Ink + Brass and brushed brass.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred urban soft direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91088),
  },
  {
    id: "v10_critique_08_05", roomType: "entryway", style: "new_nordic", conceptDescription: "A new nordic entryway using Cedar Cream and boucle.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred new nordic direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91089),
  },
  {
    id: "v10_critique_08_06", roomType: "nursery", style: "contemporary", conceptDescription: "A contemporary nursery using Forest Stone and rattan.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred contemporary direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91090),
  },
  {
    id: "v10_critique_08_07", roomType: "media_room", style: "minimalist", conceptDescription: "A minimalist media room using Mist Blue and light oak.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred minimalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91091),
  },
  {
    id: "v10_critique_08_08", roomType: "reading_nook", style: "moody_modern", conceptDescription: "A moody modern reading nook using Nordic Fog and ash.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred moody modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91092),
  },
  {
    id: "v10_critique_08_09", roomType: "basement", style: "coastal_modern", conceptDescription: "A coastal modern basement using Navy Linen and travertine.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred coastal modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91093),
  },
  {
    id: "v10_critique_08_10", roomType: "living_room", style: "japandi", conceptDescription: "A japandi living room using Mushroom Cream and linen.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred japandi direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91094),
  },
  {
    id: "v10_critique_08_11", roomType: "kitchen", style: "heritage_modern", conceptDescription: "A heritage modern kitchen using Clay Terracotta and ceramic.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred heritage modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91095),
  },
];
