import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_01: CritiqueExample[] = [
  {
    id: "v10_critique_01_00", roomType: "nursery", style: "art_deco", conceptDescription: "A art deco nursery using Soft Taupe and microcement.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred art deco direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91000),
  },
  {
    id: "v10_critique_01_01", roomType: "media_room", style: "bohemian", conceptDescription: "A bohemian media room using Sage Olive and wool.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred bohemian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91001),
  },
  {
    id: "v10_critique_01_02", roomType: "reading_nook", style: "modern", conceptDescription: "A modern reading nook using Oatmeal Charcoal and fluted glass.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91002),
  },
  {
    id: "v10_critique_01_03", roomType: "basement", style: "desert_modern", conceptDescription: "A desert modern basement using Warm White Sand and walnut.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred desert modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91003),
  },
  {
    id: "v10_critique_01_04", roomType: "living_room", style: "quiet_luxury", conceptDescription: "A quiet luxury living room using Ink + Brass and brushed brass.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred quiet luxury direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91004),
  },
  {
    id: "v10_critique_01_05", roomType: "kitchen", style: "industrial", conceptDescription: "A industrial kitchen using Cedar Cream and boucle.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91005),
  },
  {
    id: "v10_critique_01_06", roomType: "home_office", style: "craft_modern", conceptDescription: "A craft modern home office using Forest Stone and rattan.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred craft modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91006),
  },
  {
    id: "v10_critique_01_07", roomType: "bathroom", style: "transitional", conceptDescription: "A transitional bathroom using Mist Blue and light oak.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred transitional direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91007),
  },
  {
    id: "v10_critique_01_08", roomType: "studio", style: "organic_modern", conceptDescription: "A organic modern studio using Nordic Fog and ash.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred organic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91008),
  },
  {
    id: "v10_critique_01_09", roomType: "guest_room", style: "naturalist", conceptDescription: "A naturalist guest room using Navy Linen and travertine.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 0 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred naturalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91009),
  },
  {
    id: "v10_critique_01_10", roomType: "mudroom", style: "soft_industrial", conceptDescription: "A soft industrial mudroom using Mushroom Cream and linen.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 1 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred soft industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91010),
  },
  {
    id: "v10_critique_01_11", roomType: "open_plan", style: "warm_minimal", conceptDescription: "A warm minimal open plan using Clay Terracotta and ceramic.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 2 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred warm minimal direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91011),
  },
];
