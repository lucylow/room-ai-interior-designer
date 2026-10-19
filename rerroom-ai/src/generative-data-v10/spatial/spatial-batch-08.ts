import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_08: SpatialExample[] = [
  {
    id: "v10_spatial_08_00", roomType: "guest_room", sceneId: "scene-guest_room-4", anchorKind: "door",
    candidateAction: "Place sofa for weekend brunch while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91084),
  },
  {
    id: "v10_spatial_08_01", roomType: "mudroom", sceneId: "scene-mudroom-5", anchorKind: "window",
    candidateAction: "Place desk for hosting friends while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.58, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91085),
  },
  {
    id: "v10_spatial_08_02", roomType: "open_plan", sceneId: "scene-open_plan-6", anchorKind: "wall",
    candidateAction: "Place dining table for quiet reading while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91086),
  },
  {
    id: "v10_spatial_08_03", roomType: "bedroom", sceneId: "scene-bedroom-7", anchorKind: "island",
    candidateAction: "Place bed for creative making while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91087),
  },
  {
    id: "v10_spatial_08_04", roomType: "dining_room", sceneId: "scene-dining_room-8", anchorKind: "sofa",
    candidateAction: "Place console for morning routines while retaining a clear circulation path.",
    relation: "within", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91088),
  },
  {
    id: "v10_spatial_08_05", roomType: "entryway", sceneId: "scene-entryway-9", anchorKind: "bed",
    candidateAction: "Place bookcase for family movie night while retaining a clear circulation path.",
    relation: "outside", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91089),
  },
  {
    id: "v10_spatial_08_06", roomType: "nursery", sceneId: "scene-nursery-0", anchorKind: "door",
    candidateAction: "Place sofa for stretching and recovery while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.34, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91090),
  },
  {
    id: "v10_spatial_08_07", roomType: "media_room", sceneId: "scene-media_room-1", anchorKind: "window",
    candidateAction: "Place desk for after-school study while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91091),
  },
  {
    id: "v10_spatial_08_08", roomType: "reading_nook", sceneId: "scene-reading_nook-2", anchorKind: "wall",
    candidateAction: "Place dining table for remote work while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91092),
  },
  {
    id: "v10_spatial_08_09", roomType: "basement", sceneId: "scene-basement-3", anchorKind: "island",
    candidateAction: "Place bed for daily organization while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91093),
  },
  {
    id: "v10_spatial_08_10", roomType: "living_room", sceneId: "scene-living_room-4", anchorKind: "sofa",
    candidateAction: "Place console for weekend brunch while retaining a clear circulation path.",
    relation: "within", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91094),
  },
  {
    id: "v10_spatial_08_11", roomType: "kitchen", sceneId: "scene-kitchen-5", anchorKind: "bed",
    candidateAction: "Place bookcase for hosting friends while retaining a clear circulation path.",
    relation: "outside", metric: 0.74, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91095),
  },
];
