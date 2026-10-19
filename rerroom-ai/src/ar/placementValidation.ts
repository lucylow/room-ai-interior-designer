import type { Vec3 } from "../core/types";
import type { PlacementCandidate } from "../vision/types";

export interface RaycastHit { position: Vec3; distanceM: number; alignment: number; classification?: "floor" | "wall" | "ceiling" | "table" | "unknown"; }
export interface PlacementEnvironment { mappingReady: boolean; depthReady: boolean; raycast?: RaycastHit; clearanceM: number; scaleError: number; collision: boolean; }
export interface ARPlacementAssessment { valid: boolean; score: number; reasons: string[]; estimatesOnly: true; }
const clamp = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export function assessARPlacement(candidate: PlacementCandidate, environment: PlacementEnvironment): ARPlacementAssessment {
  const reasons: string[] = [];
  if (!environment.mappingReady) reasons.push("scene-mapping-not-ready");
  if (!environment.depthReady) reasons.push("depth-not-available");
  if (!environment.raycast) reasons.push("raycast-did-not-hit-surface");
  else if (environment.raycast.classification && environment.raycast.classification !== "floor" && environment.raycast.classification !== "table") reasons.push("invalid-placement-surface");
  if (environment.clearanceM < 0.6) reasons.push("insufficient-clearance");
  if (environment.scaleError > 0.1) reasons.push("scale-estimate-outside-tolerance");
  if (environment.collision) reasons.push("collision-detected");
  const score = clamp(0.2 * Number(environment.mappingReady) + 0.2 * Number(environment.depthReady) + 0.2 * Number(!!environment.raycast) + 0.2 * clamp(environment.clearanceM / 0.6) + 0.2 * (1 - clamp(environment.scaleError * 5)));
  return { valid: score >= 0.8 && reasons.length === 0, score, reasons, estimatesOnly: true };
}
