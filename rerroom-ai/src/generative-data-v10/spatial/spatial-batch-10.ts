import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_10: SpatialExample[] = [
  {
    id: "v10_spatial_10_00", roomType: "basement", sceneId: "scene-basement-8", anchorKind: "door",
    candidateAction: "Place sofa for morning routines while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91108),
  },
  {
    id: "v10_spatial_10_01", roomType: "living_room", sceneId: "scene-living_room-9", anchorKind: "window",
    candidateAction: "Place desk for family movie night while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91109),
  },
  {
    id: "v10_spatial_10_02", roomType: "kitchen", sceneId: "scene-kitchen-0", anchorKind: "wall",
    candidateAction: "Place dining table for stretching and recovery while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.66, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91110),
  },
  {
    id: "v10_spatial_10_03", roomType: "home_office", sceneId: "scene-home_office-1", anchorKind: "island",
    candidateAction: "Place bed for after-school study while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91111),
  },
  {
    id: "v10_spatial_10_04", roomType: "bathroom", sceneId: "scene-bathroom-2", anchorKind: "sofa",
    candidateAction: "Place console for remote work while retaining a clear circulation path.",
    relation: "within", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91112),
  },
  {
    id: "v10_spatial_10_05", roomType: "studio", sceneId: "scene-studio-3", anchorKind: "bed",
    candidateAction: "Place bookcase for daily organization while retaining a clear circulation path.",
    relation: "outside", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91113),
  },
  {
    id: "v10_spatial_10_06", roomType: "guest_room", sceneId: "scene-guest_room-4", anchorKind: "door",
    candidateAction: "Place sofa for weekend brunch while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91114),
  },
  {
    id: "v10_spatial_10_07", roomType: "mudroom", sceneId: "scene-mudroom-5", anchorKind: "window",
    candidateAction: "Place desk for hosting friends while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.42, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91115),
  },
  {
    id: "v10_spatial_10_08", roomType: "open_plan", sceneId: "scene-open_plan-6", anchorKind: "wall",
    candidateAction: "Place dining table for quiet reading while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91116),
  },
  {
    id: "v10_spatial_10_09", roomType: "bedroom", sceneId: "scene-bedroom-7", anchorKind: "island",
    candidateAction: "Place bed for creative making while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91117),
  },
  {
    id: "v10_spatial_10_10", roomType: "dining_room", sceneId: "scene-dining_room-8", anchorKind: "sofa",
    candidateAction: "Place console for morning routines while retaining a clear circulation path.",
    relation: "within", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91118),
  },
  {
    id: "v10_spatial_10_11", roomType: "entryway", sceneId: "scene-entryway-9", anchorKind: "bed",
    candidateAction: "Place bookcase for family movie night while retaining a clear circulation path.",
    relation: "outside", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91119),
  },
];
