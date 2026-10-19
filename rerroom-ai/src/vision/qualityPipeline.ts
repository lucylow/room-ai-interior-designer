import type { Vec3 } from "../core/types";
import type { Detection, DepthSample, PlacementCandidate, PlacementValidation, QualityScore, SegmentationRegion, SpatialAnchor, TourFrame } from "./types";

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const distance = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const mean = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

export function depthAwareSegmentation(samples: DepthSample[], minConfidence = 0.45): SegmentationRegion[] {
  const groups = new Map<string, DepthSample[]>();
  for (const sample of samples) if (sample.confidence >= minConfidence && sample.label) groups.set(sample.label, [...(groups.get(sample.label) ?? []), sample]);
  return [...groups.entries()].map(([label, values]) => { const depths = values.map(value => value.depthM); const meanDepthM = mean(depths); return { label, pixelCount: values.length, meanDepthM, depthSpreadM: Math.max(...depths) - Math.min(...depths), confidence: clamp(mean(values.map(value => value.confidence)) * (1 - clamp((Math.max(...depths) - Math.min(...depths)) / 3) * 0.25)) }; });
}

export function lightingAwareDetection(detections: Detection[], ambientBrightness: number): Detection[] {
  const target = clamp(ambientBrightness);
  return detections.map(detection => { const brightness = detection.brightness ?? target; const contrastFit = 1 - Math.abs(brightness - target); return { ...detection, score: clamp(detection.score * (0.7 + 0.3 * contrastFit)) }; });
}

export function validateARPlacement(candidate: PlacementCandidate, obstacles: PlacementCandidate[], anchors: SpatialAnchor[] = []): PlacementValidation {
  const collisions = obstacles.filter(obstacle => Math.abs(candidate.position.x - obstacle.position.x) * 2 < candidate.size.x + obstacle.size.x && Math.abs(candidate.position.z - obstacle.position.z) * 2 < candidate.size.z + obstacle.size.z && Math.abs(candidate.position.y - obstacle.position.y) * 2 < candidate.size.y + obstacle.size.y).map((_, index) => `obstacle-${index + 1}`);
  const depthViolations = candidate.position.y - candidate.size.y / 2 < 0 ? ["below-floor"] : [];
  const anchorViolations = anchors.filter(anchor => distance(candidate.position, anchor.position) > anchor.toleranceM && anchor.confidence >= 0.7).map(anchor => anchor.id);
  const score = clamp(1 - collisions.length * 0.35 - depthViolations.length * 0.3 - anchorViolations.length * 0.2);
  return { valid: score >= 0.7 && collisions.length === 0 && depthViolations.length === 0, score, collisions, depthViolations, anchorViolations, warnings: anchorViolations.length ? ["Candidate is outside trusted spatial anchors"] : [] };
}

export function score3DSGCapture(input: { frameSharpness: number[]; exposureVariance: number; poseConfidence: number; depthCompleteness: number; semanticCoverage: number; }): QualityScore {
  const sharpness = clamp(mean(input.frameSharpness));
  const exposure = clamp(1 - input.exposureVariance);
  const score = clamp(0.2 * sharpness + 0.2 * exposure + 0.25 * input.poseConfidence + 0.2 * input.depthCompleteness + 0.15 * input.semanticCoverage);
  const warnings = [input.poseConfidence < 0.6 ? "Pose confidence is low" : "", input.depthCompleteness < 0.65 ? "Depth has uncovered regions" : "", sharpness < 0.55 ? "Capture is soft or motion-blurred" : ""].filter(Boolean);
  return { score, confidence: clamp(score * (1 - warnings.length * 0.1)), usable: score >= 0.65 && input.poseConfidence >= 0.5, warnings, metrics: { sharpness, exposure, poseConfidence: input.poseConfidence, depthCompleteness: input.depthCompleteness, semanticCoverage: input.semanticCoverage } };
}

export function scoreTourConsistency(frames: TourFrame[]): QualityScore {
  if (frames.length < 2) return { score: 0, confidence: 0, usable: false, warnings: ["A tour needs at least two frames"], metrics: { frames: frames.length } };
  const roomConsistency = frames.every(frame => frame.roomId === frames[0].roomId) ? 1 : 0;
  const anchorOverlap = mean(frames.slice(1).map((frame, index) => { const previous = new Set(frames[index].visibleAnchorIds); return frame.visibleAnchorIds.filter(id => previous.has(id)).length / Math.max(1, frame.visibleAnchorIds.length); }));
  const steps = frames.slice(1).map((frame, index) => distance(frame.pose.position, frames[index].pose.position));
  const motionSmoothness = clamp(1 - (Math.max(...steps) - mean(steps)) / Math.max(mean(steps) * 3, 0.1));
  const score = clamp(0.45 * roomConsistency + 0.35 * anchorOverlap + 0.2 * motionSmoothness);
  return { score, confidence: clamp(score * (frames.length >= 4 ? 1 : 0.8)), usable: score >= 0.65, warnings: roomConsistency ? [] : ["Tour crosses room coordinate systems"], metrics: { roomConsistency, anchorOverlap, motionSmoothness } };
}

export function matchShopItem(query: { labels: string[]; materials?: string[]; dimensions?: Vec3 }, item: { labels: string[]; materials?: string[]; dimensions?: Vec3 }): number {
  const labels = query.labels.length ? query.labels.filter(label => item.labels.includes(label)).length / query.labels.length : 0;
  const materials = query.materials?.length ? query.materials.filter(material => item.materials?.includes(material)).length / query.materials.length : 0.5;
  const dimensionFit = query.dimensions && item.dimensions ? clamp(1 - distance(query.dimensions, item.dimensions) / Math.max(1, distance(query.dimensions, { x: 0, y: 0, z: 0 }))) : 0.5;
  return clamp(0.55 * labels + 0.25 * materials + 0.2 * dimensionFit);
}

export function validateSpatialAnchors(observed: SpatialAnchor[], expected: SpatialAnchor[]): QualityScore {
  const matches = expected.map(anchor => observed.find(candidate => candidate.id === anchor.id && distance(candidate.position, anchor.position) <= Math.max(anchor.toleranceM, candidate.toleranceM))).filter(Boolean).length;
  const score = expected.length ? matches / expected.length : 1;
  return { score, confidence: mean(observed.map(anchor => anchor.confidence)), usable: score >= 0.8, warnings: score < 0.8 ? ["Some CAD/BIM anchors are missing or displaced"] : [], metrics: { expected: expected.length, matched: matches, anchorCoverage: score } };
}

export function fuseTemporalConfidence(previous: number, current: number, agreement: number, decay = 0.85): number { return clamp(decay * previous * clamp(agreement) + (1 - decay) * clamp(current)); }

export function recoverVisionQuality(input: QualityScore): string[] {
  if (input.usable && input.score >= 0.85) return ["accept", "cache"];
  const actions: string[] = [];
  if ((input.metrics.poseConfidence ?? 1) < 0.65) actions.push("relocalize");
  if ((input.metrics.depthCompleteness ?? 1) < 0.7) actions.push("rescan-depth");
  if ((input.metrics.sharpness ?? 1) < 0.6) actions.push("capture-slower");
  if (!actions.length) actions.push("rescore", "request-review");
  return actions;
}
