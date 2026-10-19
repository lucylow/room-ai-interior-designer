import type { SpatialExample } from "../core/types";
import {  provenance } from "../core/factories";

export const SPATIAL_BATCH_07: SpatialExample[] = [
  {
    id: "v10_spatial_07_00", roomType: "bedroom", sceneId: "scene-bedroom-2", anchorKind: "door",
    candidateAction: "Place sofa for remote work while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.18, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91072),
  },
  {
    id: "v10_spatial_07_01", roomType: "dining_room", sceneId: "scene-dining_room-3", anchorKind: "window",
    candidateAction: "Place desk for daily organization while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91073),
  },
  {
    id: "v10_spatial_07_02", roomType: "entryway", sceneId: "scene-entryway-4", anchorKind: "wall",
    candidateAction: "Place dining table for weekend brunch while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91074),
  },
  {
    id: "v10_spatial_07_03", roomType: "nursery", sceneId: "scene-nursery-5", anchorKind: "island",
    candidateAction: "Place bed for hosting friends while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.42, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91075),
  },
  {
    id: "v10_spatial_07_04", roomType: "media_room", sceneId: "scene-media_room-6", anchorKind: "sofa",
    candidateAction: "Place console for quiet reading while retaining a clear circulation path.",
    relation: "within", metric: 0.50, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91076),
  },
  {
    id: "v10_spatial_07_05", roomType: "reading_nook", sceneId: "scene-reading_nook-7", anchorKind: "bed",
    candidateAction: "Place bookcase for creative making while retaining a clear circulation path.",
    relation: "outside", metric: 0.58, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91077),
  },
  {
    id: "v10_spatial_07_06", roomType: "basement", sceneId: "scene-basement-8", anchorKind: "door",
    candidateAction: "Place sofa for morning routines while retaining a clear circulation path.",
    relation: "adjacent", metric: 0.66, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91078),
  },
  {
    id: "v10_spatial_07_07", roomType: "living_room", sceneId: "scene-living_room-9", anchorKind: "window",
    candidateAction: "Place desk for family movie night while retaining a clear circulation path.",
    relation: "clear_of", metric: 0.74, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91079),
  },
  {
    id: "v10_spatial_07_08", roomType: "kitchen", sceneId: "scene-kitchen-0", anchorKind: "wall",
    candidateAction: "Place dining table for stretching and recovery while retaining a clear circulation path.",
    relation: "centered_on", metric: 0.18, tolerance: 0.12, expected: "adjust",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91080),
  },
  {
    id: "v10_spatial_07_09", roomType: "home_office", sceneId: "scene-home_office-1", anchorKind: "island",
    candidateAction: "Place bed for after-school study while retaining a clear circulation path.",
    relation: "aligned_with", metric: 0.26, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91081),
  },
  {
    id: "v10_spatial_07_10", roomType: "bathroom", sceneId: "scene-bathroom-2", anchorKind: "sofa",
    candidateAction: "Place console for remote work while retaining a clear circulation path.",
    relation: "within", metric: 0.34, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91082),
  },
  {
    id: "v10_spatial_07_11", roomType: "studio", sceneId: "scene-studio-3", anchorKind: "bed",
    candidateAction: "Place bookcase for daily organization while retaining a clear circulation path.",
    relation: "outside", metric: 0.42, tolerance: 0.12, expected: "pass",
    explanation: "Measured against source-space anchors; a small adjustment is preferred over rebuilding the scene when clearance is marginal.", provenance: provenance(91083),
  },
];
