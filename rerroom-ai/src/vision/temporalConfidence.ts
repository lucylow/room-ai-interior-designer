export interface Observation { timestamp: number; confidence: number; value: number; }
export interface TemporalEstimate { value: number; confidence: number; variance: number; sampleCount: number; ageMs: number; stale: boolean; }

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export class TemporalConfidenceFusion {
  private history: Observation[] = [];
  constructor(private readonly maxHistory = 30, private readonly halfLifeMs = 1200, private readonly maxAgeMs = 15_000) {}

  add(value: number, confidence: number, timestamp = Date.now()): void {
    if (!Number.isFinite(value) || !Number.isFinite(timestamp)) return;
    const normalized = clamp(confidence);
    const previous = this.history.at(-1);
    if (previous && timestamp < previous.timestamp) return;
    this.history.push({ value, confidence: normalized, timestamp });
    if (this.history.length > this.maxHistory) this.history.splice(0, this.history.length - this.maxHistory);
  }

  estimate(now = Date.now()): TemporalEstimate {
    if (!this.history.length) return { value: 0, confidence: 0, variance: 0, sampleCount: 0, ageMs: Infinity, stale: true };
    const latest = this.history.at(-1)!;
    const ageMs = Math.max(0, now - latest.timestamp);
    const weighted = this.history.map(observation => {
      const age = Math.max(0, now - observation.timestamp);
      const temporalWeight = Math.exp(-age / Math.max(1, this.halfLifeMs));
      return { observation, weight: clamp(observation.confidence) * temporalWeight };
    }).filter(item => item.weight > 1e-5);
    const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
    if (!totalWeight) return { value: latest.value, confidence: 0, variance: 0, sampleCount: 1, ageMs, stale: ageMs > this.maxAgeMs };
    const value = weighted.reduce((sum, item) => sum + item.observation.value * item.weight, 0) / totalWeight;
    const variance = weighted.reduce((sum, item) => sum + (item.observation.value - value) ** 2 * item.weight, 0) / totalWeight;
    const consistency = 1 / (1 + Math.sqrt(variance));
    const evidence = 1 - Math.exp(-totalWeight / 2);
    const freshness = Math.exp(-ageMs / Math.max(1, this.maxAgeMs));
    return { value, confidence: clamp(consistency * evidence * freshness), variance, sampleCount: weighted.length, ageMs, stale: ageMs > this.maxAgeMs };
  }

  clear(): void { this.history = []; }
  observations(): readonly Observation[] { return this.history; }
}
