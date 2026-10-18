export interface FrameMonitor {
  record(frameMs: number): void;
  snapshot(): { fps: number; avgFrameMs: number; p95FrameMs: number; samples: number };
  reset(): void;
}

export function createFrameMonitor(windowSize = 120): FrameMonitor {
  let samples: number[] = [];
  return {
    record(frameMs) {
      if (!Number.isFinite(frameMs)) return;
      samples.push(Math.max(0, frameMs));
      if (samples.length > windowSize) samples = samples.slice(-windowSize);
    },
    snapshot() {
      if (!samples.length) return { fps: 60, avgFrameMs: 0, p95FrameMs: 0, samples: 0 };
      const sorted = [...samples].sort((a, b) => a - b);
      const avg = samples.reduce((sum, value) => sum + value, 0) / samples.length;
      const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];
      return { fps: avg ? 1000 / avg : 60, avgFrameMs: avg, p95FrameMs: p95, samples: samples.length };
    },
    reset() { samples = []; },
  };
}
