import { CaptureSession, type CaptureInput, type CaptureFrame } from "./captureSession";
import { calculateTrajectoryMetrics } from "../vision/trajectory";
import { CoverageGrid } from "../vision/coverageGrid";
import { analyzeOcclusion } from "../vision/occlusion";
import type { Detection } from "../vision/types";

export interface ProcessedFrame { frame: CaptureFrame; occlusion: ReturnType<typeof analyzeOcclusion>; usable: boolean; recoveryActions: string[]; }
export interface PipelineSummary { frameCount: number; usableFrames: number; trajectory: ReturnType<typeof calculateTrajectoryMetrics>; coverage: ReturnType<CoverageGrid["report"]>; weakCoverageCells: ReturnType<CoverageGrid["weakCells"]>; accepted: boolean; recommendations: string[]; }

export class AdvancedVisionPipeline {
  private readonly session: CaptureSession;
  private readonly coverage: CoverageGrid;
  constructor(options: { maxFrames?: number; cellSize?: number; expectedCells?: number } = {}) {
    this.session = new CaptureSession(options.maxFrames ?? 300);
    this.coverage = new CoverageGrid(options.cellSize ?? 0.5);
    this.expectedCells = options.expectedCells;
  }
  private readonly expectedCells?: number;

  processFrame(input: CaptureInput): ProcessedFrame {
    const frame = this.session.add(input);
    this.coverage.observe(frame.pose.position.x, frame.pose.position.z, frame.quality.readiness, frame.timestampMs);
    const occlusion = analyzeOcclusion(frame.detections as Detection[]);
    return { frame, occlusion, usable: frame.quality.accepted, recoveryActions: frame.quality.reasons };
  }

  finalize(nowMs = Date.now()): PipelineSummary {
    const frames = this.session.get();
    const poses = frames.map(frame => frame.pose);
    const trajectory = calculateTrajectoryMetrics(poses);
    const expectedCells = this.expectedCells ?? Math.max(1, Math.ceil(Math.max(trajectory.totalDistance, this.coverage.all().length * 0.5) / 0.5));
    const coverage = this.coverage.report(expectedCells, nowMs);
    const recommendations = [...trajectory.warnings, ...coverage.weakCells.length ? ["rescan-weak-coverage-cells"] : [], trajectory.usable ? "" : "improve-camera-trajectory"].filter(Boolean);
    return { frameCount: frames.length, usableFrames: this.session.usableFrames(), trajectory, coverage, weakCoverageCells: coverage.weakCells, accepted: trajectory.usable && coverage.confidence >= 0.55 && this.session.usableFrames() > 0, recommendations: [...new Set(recommendations)] };
  }
  reset(): void { this.session.reset(); }
}
