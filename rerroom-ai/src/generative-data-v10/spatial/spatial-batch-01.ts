import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_01: SpatialExample[] = [
  {
    id: "v10_spatial_01_00", roomType: "nursery", sceneId: "scene-nursery-0", anchorKind: "door",
    candidateAction: "Place sofa for stretching and recovery while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.18, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91000),
  },
  {
    id: "v10_spatial_01_01", roomType: "media_room", sceneId: "scene-media_room-1", anchorKind: "window",
    candidateAction: "Place desk for after-school study while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91001),
  },
  {
    id: "v10_spatial_01_02", roomType: "reading_nook", sceneId: "scene-reading_nook-2", anchorKind: "wall",
    candidateAction: "Place dining table for remote work while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91002),
  },
  {
    id: "v10_spatial_01_03", roomType: "basement", sceneId: "scene-basement-3", anchorKind: "island",
    candidateAction: "Place bed for daily organization while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91003),
  },
  {
    id: "v10_spatial_01_04", roomType: "living_room", sceneId: "scene-living_room-4", anchorKind: "sofa",
    candidateAction: "Place console for weekend brunch while retaining a clear circulation path.",
    relation: "within", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91004),
  },
  {
    id: "v10_spatial_01_05", roomType: "kitchen", sceneId: "scene-kitchen-5", anchorKind: "bed",
    candidateAction: "Place bookcase for hosting friends while retaining a clear circulation path.",
    relation: "outside", metric: 0.58, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91005),
  },
  {
    id: "v10_spatial_01_06", roomType: "home_office", sceneId: "scene-home_office-6", anchorKind: "door",
    candidateAction: "Place sofa for quiet reading while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91006),
  },
  {
    id: "v10_spatial_01_07", roomType: "bathroom", sceneId: "scene-bathroom-7", anchorKind: "window",
    candidateAction: "Place desk for creative making while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91007),
  },
  {
    id: "v10_spatial_01_08", roomType: "studio", sceneId: "scene-studio-8", anchorKind: "wall",
    candidateAction: "Place dining table for morning routines while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91008),
  },
  {
    id: "v10_spatial_01_09", roomType: "guest_room", sceneId: "scene-guest_room-9", anchorKind: "island",
    candidateAction: "Place bed for family movie night while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91009),
  },
  {
    id: "v10_spatial_01_10", roomType: "mudroom", sceneId: "scene-mudroom-0", anchorKind: "sofa",
    candidateAction: "Place console for stretching and recovery while retaining a clear circulation path.",
    relation: "within", metric: 0.34, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91010),
  },
  {
    id: "v10_spatial_01_11", roomType: "open_plan", sceneId: "scene-open_plan-1", anchorKind: "bed",
    candidateAction: "Place bookcase for after-school study while retaining a clear circulation path.",
    relation: "outside", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91011),
  },
];
