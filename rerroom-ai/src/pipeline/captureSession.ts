import type { CameraPose, Detection } from "../vision/types";
import { evaluateGaussianCapture } from "../3dgs/captureGate";

export interface SurfaceObservation { id: string; confidence: number; label?: string; }
export interface CaptureMetrics { coverage?: number; poseQuality?: number; sharpness?: number; exposure?: number; motion?: number; }
export interface CaptureInput { id?: string; timestampMs?: number; pose: CameraPose; detections: Detection[]; surfaces: SurfaceObservation[]; metrics?: CaptureMetrics; }
export interface CaptureFrame { id: string; timestampMs: number; pose: CameraPose; detections: Detection[]; surfaces: SurfaceObservation[]; quality: ReturnType<typeof evaluateGaussianCapture>; }

const clamp = (value: number | undefined, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : fallback;

export class CaptureSession {
  private frames: CaptureFrame[] = [];
  constructor(private readonly maxFrames = 300) {}

  add(input: CaptureInput): CaptureFrame {
    const timestampMs = input.timestampMs ?? input.pose.timestampMs ?? Date.now();
    const previous = this.frames.at(-1);
    const motion = input.metrics?.motion ?? (previous ? Math.min(1, Math.hypot(input.pose.position.x - previous.pose.position.x, input.pose.position.y - previous.pose.position.y, input.pose.position.z - previous.pose.position.z)) : 0);
    const quality = evaluateGaussianCapture({ coverage: clamp(input.metrics?.coverage, 0.5), poseQuality: clamp(input.metrics?.poseQuality ?? input.pose.confidence, 0.5), sharpness: clamp(input.metrics?.sharpness, 0.5), exposure: clamp(input.metrics?.exposure, 0.5), motion: clamp(motion) });
    const frame: CaptureFrame = { id: input.id ?? `frame-${timestampMs}-${this.frames.length}`, timestampMs, pose: { ...input.pose, timestampMs }, detections: [...input.detections], surfaces: [...input.surfaces], quality };
    this.frames.push(frame);
    if (this.frames.length > this.maxFrames) this.frames.splice(0, this.frames.length - this.maxFrames);
    return frame;
  }

  get(): readonly CaptureFrame[] { return this.frames; }
  usableFrames(): number { return this.frames.filter(frame => frame.quality.accepted).length; }
  latest(): CaptureFrame | undefined { return this.frames.at(-1); }
  reset(): void { this.frames = []; }
}
