import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_03: SpatialExample[] = [
  {
    id: "v10_spatial_03_00", roomType: "guest_room", sceneId: "scene-guest_room-4", anchorKind: "door",
    candidateAction: "Place sofa for weekend brunch while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91024),
  },
  {
    id: "v10_spatial_03_01", roomType: "mudroom", sceneId: "scene-mudroom-5", anchorKind: "window",
    candidateAction: "Place desk for hosting friends while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.26, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91025),
  },
  {
    id: "v10_spatial_03_02", roomType: "open_plan", sceneId: "scene-open_plan-6", anchorKind: "wall",
    candidateAction: "Place dining table for quiet reading while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91026),
  },
  {
    id: "v10_spatial_03_03", roomType: "bedroom", sceneId: "scene-bedroom-7", anchorKind: "island",
    candidateAction: "Place bed for creative making while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91027),
  },
  {
    id: "v10_spatial_03_04", roomType: "dining_room", sceneId: "scene-dining_room-8", anchorKind: "sofa",
    candidateAction: "Place console for morning routines while retaining a clear circulation path.",
    relation: "within", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91028),
  },
  {
    id: "v10_spatial_03_05", roomType: "entryway", sceneId: "scene-entryway-9", anchorKind: "bed",
    candidateAction: "Place bookcase for family movie night while retaining a clear circulation path.",
    relation: "outside", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91029),
  },
  {
    id: "v10_spatial_03_06", roomType: "nursery", sceneId: "scene-nursery-0", anchorKind: "door",
    candidateAction: "Place sofa for stretching and recovery while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.66, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91030),
  },
  {
    id: "v10_spatial_03_07", roomType: "media_room", sceneId: "scene-media_room-1", anchorKind: "window",
    candidateAction: "Place desk for after-school study while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91031),
  },
  {
    id: "v10_spatial_03_08", roomType: "reading_nook", sceneId: "scene-reading_nook-2", anchorKind: "wall",
    candidateAction: "Place dining table for remote work while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91032),
  },
  {
    id: "v10_spatial_03_09", roomType: "basement", sceneId: "scene-basement-3", anchorKind: "island",
    candidateAction: "Place bed for daily organization while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91033),
  },
  {
    id: "v10_spatial_03_10", roomType: "living_room", sceneId: "scene-living_room-4", anchorKind: "sofa",
    candidateAction: "Place console for weekend brunch while retaining a clear circulation path.",
    relation: "within", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91034),
  },
  {
    id: "v10_spatial_03_11", roomType: "kitchen", sceneId: "scene-kitchen-5", anchorKind: "bed",
    candidateAction: "Place bookcase for hosting friends while retaining a clear circulation path.",
    relation: "outside", metric: 0.42, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91035),
  },
];
