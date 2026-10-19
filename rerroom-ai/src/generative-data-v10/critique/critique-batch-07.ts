import type { CritiqueExample } from "../core/types";
import {  provenance } from "../core/factories";

export const CRITIQUE_BATCH_07: CritiqueExample[] = [
  {
    id: "v10_critique_07_00", roomType: "bedroom", style: "art_deco", conceptDescription: "A art deco bedroom using Soft Taupe and fluted glass.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 0 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred art deco direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91072),
  },
  {
    id: "v10_critique_07_01", roomType: "dining_room", style: "bohemian", conceptDescription: "A bohemian dining room using Sage Olive and walnut.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 1 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred bohemian direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91073),
  },
  {
    id: "v10_critique_07_02", roomType: "entryway", style: "modern", conceptDescription: "A modern entryway using Oatmeal Charcoal and brushed brass.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 2 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91074),
  },
  {
    id: "v10_critique_07_03", roomType: "nursery", style: "desert_modern", conceptDescription: "A desert modern nursery using Warm White Sand and boucle.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 0 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred desert modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91075),
  },
  {
    id: "v10_critique_07_04", roomType: "media_room", style: "quiet_luxury", conceptDescription: "A quiet luxury media room using Ink + Brass and rattan.",
    issue: "material_clash", severity: "low", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 1 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct material clash without changing the user's preferred quiet luxury direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91076),
  },
  {
    id: "v10_critique_07_05", roomType: "reading_nook", style: "industrial", conceptDescription: "A industrial reading nook using Cedar Cream and light oak.",
    issue: "lighting_error", severity: "medium", evidence: ["prompt/style alignment score 0.62", "spatial anchor drift check 2 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct lighting error without changing the user's preferred industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91077),
  },
  {
    id: "v10_critique_07_06", roomType: "basement", style: "craft_modern", conceptDescription: "A craft modern basement using Forest Stone and ash.",
    issue: "geometry_drift", severity: "high", evidence: ["prompt/style alignment score 0.66", "spatial anchor drift check 0 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct geometry drift without changing the user's preferred craft modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91078),
  },
  {
    id: "v10_critique_07_07", roomType: "living_room", style: "transitional", conceptDescription: "A transitional living room using Mist Blue and travertine.",
    issue: "budget_error", severity: "critical", evidence: ["prompt/style alignment score 0.70", "spatial anchor drift check 1 incidents", "palette delta 4 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct budget error without changing the user's preferred transitional direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91079),
  },
  {
    id: "v10_critique_07_08", roomType: "kitchen", style: "organic_modern", conceptDescription: "A organic modern kitchen using Nordic Fog and linen.",
    issue: "style_drift", severity: "low", evidence: ["prompt/style alignment score 0.74", "spatial anchor drift check 2 incidents", "palette delta 0 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct style drift without changing the user's preferred organic modern direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91080),
  },
  {
    id: "v10_critique_07_09", roomType: "home_office", style: "naturalist", conceptDescription: "A naturalist home office using Navy Linen and ceramic.",
    issue: "layout_conflict", severity: "medium", evidence: ["prompt/style alignment score 0.78", "spatial anchor drift check 0 incidents", "palette delta 1 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct layout conflict without changing the user's preferred naturalist direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91081),
  },
  {
    id: "v10_critique_07_10", roomType: "bathroom", style: "soft_industrial", conceptDescription: "A soft industrial bathroom using Mushroom Cream and white oak.",
    issue: "scale_mismatch", severity: "high", evidence: ["prompt/style alignment score 0.82", "spatial anchor drift check 1 incidents", "palette delta 2 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct scale mismatch without changing the user's preferred soft industrial direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91082),
  },
  {
    id: "v10_critique_07_11", roomType: "studio", style: "warm_minimal", conceptDescription: "A warm minimal studio using Clay Terracotta and blackened steel.",
    issue: "palette_noise", severity: "critical", evidence: ["prompt/style alignment score 0.86", "spatial anchor drift check 2 incidents", "palette delta 3 steps"],
    repairInstruction: "Keep authoritative geometry fixed; correct palette noise without changing the user's preferred warm minimal direction.",
    expectedOutcome: "Revised concept passes the critique rubric while preserving the requested mood and room function.", provenance: provenance(91083),
  },
];
