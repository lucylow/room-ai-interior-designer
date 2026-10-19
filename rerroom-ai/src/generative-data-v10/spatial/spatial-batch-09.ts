import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_09: SpatialExample[] = [
  {
    id: "v10_spatial_09_00", roomType: "home_office", sceneId: "scene-home_office-6", anchorKind: "door",
    candidateAction: "Place sofa for quiet reading while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91096),
  },
  {
    id: "v10_spatial_09_01", roomType: "bathroom", sceneId: "scene-bathroom-7", anchorKind: "window",
    candidateAction: "Place desk for creative making while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91097),
  },
  {
    id: "v10_spatial_09_02", roomType: "studio", sceneId: "scene-studio-8", anchorKind: "wall",
    candidateAction: "Place dining table for morning routines while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91098),
  },
  {
    id: "v10_spatial_09_03", roomType: "guest_room", sceneId: "scene-guest_room-9", anchorKind: "island",
    candidateAction: "Place bed for family movie night while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91099),
  },
  {
    id: "v10_spatial_09_04", roomType: "mudroom", sceneId: "scene-mudroom-0", anchorKind: "sofa",
    candidateAction: "Place console for stretching and recovery while retaining a clear circulation path.",
    relation: "within", metric: 0.50, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91100),
  },
  {
    id: "v10_spatial_09_05", roomType: "open_plan", sceneId: "scene-open_plan-1", anchorKind: "bed",
    candidateAction: "Place bookcase for after-school study while retaining a clear circulation path.",
    relation: "outside", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91101),
  },
  {
    id: "v10_spatial_09_06", roomType: "bedroom", sceneId: "scene-bedroom-2", anchorKind: "door",
    candidateAction: "Place sofa for remote work while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91102),
  },
  {
    id: "v10_spatial_09_07", roomType: "dining_room", sceneId: "scene-dining_room-3", anchorKind: "window",
    candidateAction: "Place desk for daily organization while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91103),
  },
  {
    id: "v10_spatial_09_08", roomType: "entryway", sceneId: "scene-entryway-4", anchorKind: "wall",
    candidateAction: "Place dining table for weekend brunch while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91104),
  },
  {
    id: "v10_spatial_09_09", roomType: "nursery", sceneId: "scene-nursery-5", anchorKind: "island",
    candidateAction: "Place bed for hosting friends while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.26, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91105),
  },
  {
    id: "v10_spatial_09_10", roomType: "media_room", sceneId: "scene-media_room-6", anchorKind: "sofa",
    candidateAction: "Place console for quiet reading while retaining a clear circulation path.",
    relation: "within", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91106),
  },
  {
    id: "v10_spatial_09_11", roomType: "reading_nook", sceneId: "scene-reading_nook-7", anchorKind: "bed",
    candidateAction: "Place bookcase for creative making while retaining a clear circulation path.",
    relation: "outside", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91107),
  },
];
