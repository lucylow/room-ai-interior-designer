export interface GaussianCaptureReadiness { coverage: number; poseQuality: number; sharpness: number; exposure: number; motion: number; readiness: number; accepted: boolean; reasons: string[]; confidence: number; hardFailures: string[]; }
export type GaussianCaptureInput = Omit<GaussianCaptureReadiness, "readiness" | "accepted" | "reasons" | "confidence" | "hardFailures">;
const clamp = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export function evaluateGaussianCapture(input: GaussianCaptureInput): GaussianCaptureReadiness {
  const normalized = { coverage: clamp(input.coverage), poseQuality: clamp(input.poseQuality), sharpness: clamp(input.sharpness), exposure: clamp(input.exposure), motion: clamp(input.motion) };
  const motionQuality = 1 - normalized.motion;
  const readiness = normalized.coverage * 0.25 + normalized.poseQuality * 0.25 + normalized.sharpness * 0.2 + normalized.exposure * 0.15 + motionQuality * 0.15;
  const reasons: string[] = [];
  if (normalized.coverage < 0.7) reasons.push("increase-room-coverage");
  if (normalized.poseQuality < 0.7) reasons.push("improve-camera-pose");
  if (normalized.sharpness < 0.6) reasons.push("reduce-motion-blur");
  if (normalized.exposure < 0.55) reasons.push("improve-exposure");
  if (motionQuality < 0.55) reasons.push("slow-camera-motion");
  const hardFailures = [normalized.coverage < 0.45 ? "coverage-too-low" : "", normalized.poseQuality < 0.45 ? "pose-not-trustworthy" : "", normalized.sharpness < 0.35 ? "capture-too-blurry" : ""].filter(Boolean);
  const accepted = readiness >= 0.72 && hardFailures.length === 0;
  const confidence = clamp(readiness * (1 - reasons.length * 0.06));
  return { ...normalized, readiness, accepted, reasons, confidence, hardFailures };
}
