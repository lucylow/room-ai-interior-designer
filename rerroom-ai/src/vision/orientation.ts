import type { Vec3 } from "../core/types";

export interface OrientationEvidence { angleRad: number; confidence: number; source: "footprint" | "bbox" | "prior"; dimensions?: { long: number; short: number }; }
export interface FurnitureOrientation { angleRad: number; confidence: number; dimensions?: { long: number; short: number }; warnings: string[]; }

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const normalizeAngle = (angle: number) => { while (angle > Math.PI / 2) angle -= Math.PI; while (angle <= -Math.PI / 2) angle += Math.PI; return angle; };

export function inferFurnitureOrientation(input: { footprint?: Vec3[]; imageWidth?: number; imageHeight?: number; priorAngleRad?: number; }): FurnitureOrientation {
  const warnings: string[] = [];
  if (input.footprint && input.footprint.length >= 2) {
    let best = { length: 0, angle: 0 };
    for (let index = 0; index < input.footprint.length; index += 1) {
      const a = input.footprint[index], b = input.footprint[(index + 1) % input.footprint.length];
      const length = Math.hypot(b.x - a.x, b.z - a.z);
      if (length > best.length) best = { length, angle: Math.atan2(b.z - a.z, b.x - a.x) };
    }
    const edges = input.footprint.map((point, index) => { const next = input.footprint![(index + 1) % input.footprint!.length]; return Math.hypot(next.x - point.x, next.z - point.z); }).sort((a, b) => b - a);
    const long = edges[0] ?? 0, short = edges.at(-1) ?? 0;
    const confidence = clamp(0.55 + Math.min(0.4, (long - short) / Math.max(long, 0.001)));
    if (confidence < 0.65) warnings.push("Footprint is close to square; orientation is ambiguous");
    return { angleRad: normalizeAngle(best.angle), confidence, dimensions: { long, short }, warnings };
  }
  if (input.imageWidth && input.imageHeight && input.imageWidth > 0 && input.imageHeight > 0) {
    const landscape = input.imageWidth >= input.imageHeight;
    return { angleRad: landscape ? 0 : Math.PI / 2, confidence: clamp(Math.abs(input.imageWidth - input.imageHeight) / Math.max(input.imageWidth, input.imageHeight)), dimensions: { long: Math.max(input.imageWidth, input.imageHeight), short: Math.min(input.imageWidth, input.imageHeight) }, warnings: ["Image-space orientation needs camera calibration"] };
  }
  if (input.priorAngleRad !== undefined) return { angleRad: normalizeAngle(input.priorAngleRad), confidence: 0.25, warnings: ["Using prior orientation only"] };
  return { angleRad: 0, confidence: 0, warnings: ["Insufficient geometry for orientation inference"] };
}
