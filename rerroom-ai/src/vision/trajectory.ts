import type { Vec3 } from "../core/types";
import type { CameraPose, FrameObservation, QualityScore, TrajectoryMetrics } from "./types";

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const distance3D = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const dot = (a: CameraPose["rotation"], b: CameraPose["rotation"]) => a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
const normalizeQuat = (q: CameraPose["rotation"]) => {
  const n = Math.hypot(q.w, q.x, q.y, q.z) || 1;
  return { w: q.w / n, x: q.x / n, y: q.y / n, z: q.z / n };
};
const rotationDelta = (a: CameraPose, b: CameraPose) => {
  const cosine = Math.abs(dot(normalizeQuat(a.rotation), normalizeQuat(b.rotation)));
  return 2 * Math.acos(clamp(cosine, -1, 1));
};
const median = (values: number[]) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

export function calculateTrajectoryMetrics(poses: CameraPose[], options: { minFrames?: number; maxStepRatio?: number } = {}): TrajectoryMetrics {
  const minFrames = options.minFrames ?? 10;
  if (poses.length < 2) return { totalDistance: 0, averageStep: 0, maximumStep: 0, medianStep: 0, rotationJitter: 0, velocityJitter: 1, stability: 0, loopClosureError: 0, loopClosureScore: 0, confidence: 0, usable: false, warnings: ["At least two poses are required"] };

  const steps = poses.slice(1).map((pose, index) => distance3D(poses[index].position, pose.position));
  const rotations = poses.slice(1).map((pose, index) => rotationDelta(poses[index], pose));
  const totalDistance = steps.reduce((sum, value) => sum + value, 0);
  const averageStep = totalDistance / steps.length;
  const maximumStep = Math.max(...steps);
  const medianStep = median(steps);
  const velocityJitter = clamp((maximumStep - medianStep) / Math.max(averageStep, 0.001));
  const rotationJitter = clamp(median(rotations) / Math.PI);
  const loopClosureError = distance3D(poses[0].position, poses[poses.length - 1].position);
  const loopClosureScore = totalDistance > 0 ? clamp(1 - loopClosureError / Math.max(totalDistance * 0.2, 0.1)) : 1;
  const outlierPenalty = clamp((maximumStep / Math.max(medianStep * (options.maxStepRatio ?? 4), 0.01) - 1) / 3);
  const stability = clamp(1 - 0.45 * velocityJitter - 0.25 * rotationJitter - 0.3 * outlierPenalty);
  const warnings: string[] = [];
  if (poses.length < minFrames) warnings.push(`Need at least ${minFrames} frames for a reliable trajectory`);
  if (outlierPenalty > 0.2) warnings.push("Abrupt pose jump detected");
  if (loopClosureScore < 0.5) warnings.push("Weak loop closure");
  const confidence = clamp(stability * (poses.length / Math.max(minFrames, poses.length)) * (1 - warnings.length * 0.08));
  return { totalDistance, averageStep, maximumStep, medianStep, rotationJitter, velocityJitter, stability, loopClosureError, loopClosureScore, confidence, usable: poses.length >= minFrames && stability >= 0.55 && confidence >= 0.5, warnings };
}

export function scoreMultiFrameOdometry(frames: FrameObservation[]): QualityScore {
  const tracked = frames.filter(frame => frame.pose);
  if (!tracked.length) return { score: 0, confidence: 0, usable: false, warnings: ["No tracked frames"], metrics: { trackedFrames: 0 } };
  const pose = calculateTrajectoryMetrics(tracked.map(frame => frame.pose!));
  const inliers = frames.map(frame => clamp(frame.inlierRatio ?? (frame.pose ? 0.7 : 0)));
  const reprojection = frames.map(frame => frame.reprojectionErrorPx ?? 2);
  const inlierScore = inliers.reduce((sum, value) => sum + value, 0) / inliers.length;
  const reprojectionScore = clamp(1 - (reprojection.reduce((sum, value) => sum + value, 0) / reprojection.length) / 8);
  const score = clamp(0.55 * pose.stability + 0.25 * inlierScore + 0.2 * reprojectionScore);
  return { score, confidence: clamp(score * pose.confidence), usable: pose.usable && score >= 0.6, warnings: pose.warnings, metrics: { trackedFrames: tracked.length, inlierRatio: inlierScore, reprojectionScore, stability: pose.stability } };
}
