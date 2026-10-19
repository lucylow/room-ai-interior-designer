import type { Detection } from "./types";

export interface OcclusionResult { targetId: string; occluded: boolean; occluderId?: string; overlap: number; confidence: number; depthOrdered: boolean; }
type Box = { x: number; y: number; width: number; height: number };
const boxOf = (detection: Detection): Box => detection.box ?? { x: detection.x, y: detection.y, width: detection.width, height: detection.height };
const iou = (a: Box, b: Box) => {
  const left = Math.max(a.x, b.x), top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.width, b.x + b.width), bottom = Math.min(a.y + a.height, b.y + b.height);
  const intersection = Math.max(0, right - left) * Math.max(0, bottom - top);
  const union = a.width * a.height + b.width * b.height - intersection;
  return union > 0 ? intersection / union : 0;
};

export function analyzeOcclusion(detections: Detection[], threshold = 0.12): OcclusionResult[] {
  return detections.map((target, targetIndex) => {
    let strongest: { detection: Detection; overlap: number; depthOrdered: boolean } | undefined;
    for (const [candidateIndex, candidate] of detections.entries()) {
      if (candidateIndex === targetIndex) continue;
      const overlap = iou(boxOf(target), boxOf(candidate));
      const depthOrdered = target.depthM !== undefined && candidate.depthM !== undefined && candidate.depthM < target.depthM;
      if (overlap >= threshold && (!strongest || (depthOrdered && !strongest.depthOrdered) || overlap > strongest.overlap)) strongest = { detection: candidate, overlap, depthOrdered };
    }
    const targetId = target.id ?? `${target.label}-${targetIndex}`;
    return { targetId, occluded: !!strongest, occluderId: strongest?.detection.id, overlap: strongest?.overlap ?? 0, confidence: strongest ? Math.min(1, 0.35 + strongest.overlap * 0.65 + (strongest.depthOrdered ? 0.2 : 0)) : 0.9, depthOrdered: strongest?.depthOrdered ?? false };
  });
}
