import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_04: SpatialExample[] = [
  {
    id: "v10_spatial_04_00", roomType: "home_office", sceneId: "scene-home_office-6", anchorKind: "door",
    candidateAction: "Place sofa for quiet reading while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91036),
  },
  {
    id: "v10_spatial_04_01", roomType: "bathroom", sceneId: "scene-bathroom-7", anchorKind: "window",
    candidateAction: "Place desk for creative making while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91037),
  },
  {
    id: "v10_spatial_04_02", roomType: "studio", sceneId: "scene-studio-8", anchorKind: "wall",
    candidateAction: "Place dining table for morning routines while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91038),
  },
  {
    id: "v10_spatial_04_03", roomType: "guest_room", sceneId: "scene-guest_room-9", anchorKind: "island",
    candidateAction: "Place bed for family movie night while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91039),
  },
  {
    id: "v10_spatial_04_04", roomType: "mudroom", sceneId: "scene-mudroom-0", anchorKind: "sofa",
    candidateAction: "Place console for stretching and recovery while retaining a clear circulation path.",
    relation: "within", metric: 0.18, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91040),
  },
  {
    id: "v10_spatial_04_05", roomType: "open_plan", sceneId: "scene-open_plan-1", anchorKind: "bed",
    candidateAction: "Place bookcase for after-school study while retaining a clear circulation path.",
    relation: "outside", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91041),
  },
  {
    id: "v10_spatial_04_06", roomType: "bedroom", sceneId: "scene-bedroom-2", anchorKind: "door",
    candidateAction: "Place sofa for remote work while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91042),
  },
  {
    id: "v10_spatial_04_07", roomType: "dining_room", sceneId: "scene-dining_room-3", anchorKind: "window",
    candidateAction: "Place desk for daily organization while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91043),
  },
  {
    id: "v10_spatial_04_08", roomType: "entryway", sceneId: "scene-entryway-4", anchorKind: "wall",
    candidateAction: "Place dining table for weekend brunch while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91044),
  },
  {
    id: "v10_spatial_04_09", roomType: "nursery", sceneId: "scene-nursery-5", anchorKind: "island",
    candidateAction: "Place bed for hosting friends while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.58, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91045),
  },
  {
    id: "v10_spatial_04_10", roomType: "media_room", sceneId: "scene-media_room-6", anchorKind: "sofa",
    candidateAction: "Place console for quiet reading while retaining a clear circulation path.",
    relation: "within", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91046),
  },
  {
    id: "v10_spatial_04_11", roomType: "reading_nook", sceneId: "scene-reading_nook-7", anchorKind: "bed",
    candidateAction: "Place bookcase for creative making while retaining a clear circulation path.",
    relation: "outside", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91047),
  },
];
