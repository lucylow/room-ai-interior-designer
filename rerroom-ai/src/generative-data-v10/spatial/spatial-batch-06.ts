import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_06: SpatialExample[] = [
  {
    id: "v10_spatial_06_00", roomType: "nursery", sceneId: "scene-nursery-0", anchorKind: "door",
    candidateAction: "Place sofa for stretching and recovery while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.50, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91060),
  },
  {
    id: "v10_spatial_06_01", roomType: "media_room", sceneId: "scene-media_room-1", anchorKind: "window",
    candidateAction: "Place desk for after-school study while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91061),
  },
  {
    id: "v10_spatial_06_02", roomType: "reading_nook", sceneId: "scene-reading_nook-2", anchorKind: "wall",
    candidateAction: "Place dining table for remote work while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91062),
  },
  {
    id: "v10_spatial_06_03", roomType: "basement", sceneId: "scene-basement-3", anchorKind: "island",
    candidateAction: "Place bed for daily organization while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91063),
  },
  {
    id: "v10_spatial_06_04", roomType: "living_room", sceneId: "scene-living_room-4", anchorKind: "sofa",
    candidateAction: "Place console for weekend brunch while retaining a clear circulation path.",
    relation: "within", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91064),
  },
  {
    id: "v10_spatial_06_05", roomType: "kitchen", sceneId: "scene-kitchen-5", anchorKind: "bed",
    candidateAction: "Place bookcase for hosting friends while retaining a clear circulation path.",
    relation: "outside", metric: 0.26, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91065),
  },
  {
    id: "v10_spatial_06_06", roomType: "home_office", sceneId: "scene-home_office-6", anchorKind: "door",
    candidateAction: "Place sofa for quiet reading while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91066),
  },
  {
    id: "v10_spatial_06_07", roomType: "bathroom", sceneId: "scene-bathroom-7", anchorKind: "window",
    candidateAction: "Place desk for creative making while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91067),
  },
  {
    id: "v10_spatial_06_08", roomType: "studio", sceneId: "scene-studio-8", anchorKind: "wall",
    candidateAction: "Place dining table for morning routines while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91068),
  },
  {
    id: "v10_spatial_06_09", roomType: "guest_room", sceneId: "scene-guest_room-9", anchorKind: "island",
    candidateAction: "Place bed for family movie night while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91069),
  },
  {
    id: "v10_spatial_06_10", roomType: "mudroom", sceneId: "scene-mudroom-0", anchorKind: "sofa",
    candidateAction: "Place console for stretching and recovery while retaining a clear circulation path.",
    relation: "within", metric: 0.66, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91070),
  },
  {
    id: "v10_spatial_06_11", roomType: "open_plan", sceneId: "scene-open_plan-1", anchorKind: "bed",
    candidateAction: "Place bookcase for after-school study while retaining a clear circulation path.",
    relation: "outside", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91071),
  },
];
