import type { CoverageCell, CoverageReport } from "./types";

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export class CoverageGrid {
  private cells = new Map<string, CoverageCell>();
  constructor(private readonly cellSize = 0.5, private readonly halfLifeMs = 30_000) {}
  private key(x: number, z: number) { return `${x}:${z}`; }
  private coordinates(x: number, z: number) { return { x: Math.floor(x / this.cellSize), z: Math.floor(z / this.cellSize) }; }

  observe(x: number, z: number, quality: number, timestampMs = Date.now()): void {
    const grid = this.coordinates(x, z);
    const key = this.key(grid.x, grid.z);
    const sample = clamp(quality);
    const existing = this.cells.get(key);
    if (!existing) { this.cells.set(key, { ...grid, observations: 1, quality: sample, lastSeenMs: timestampMs }); return; }
    const age = Math.max(0, timestampMs - existing.lastSeenMs);
    const recency = Math.exp(-age / this.halfLifeMs);
    const weight = Math.max(0.1, recency);
    existing.observations += 1;
    existing.quality = clamp((existing.quality * weight + sample) / (weight + 1));
    existing.lastSeenMs = Math.max(existing.lastSeenMs, timestampMs);
  }

  coverage(expectedCells: number): number { return expectedCells > 0 ? clamp(this.cells.size / expectedCells) : 0; }
  weakCells(threshold = 0.5): CoverageCell[] { return this.all().filter(cell => cell.quality < threshold).sort((a, b) => a.quality - b.quality); }
  all(): CoverageCell[] { return [...this.cells.values()]; }

  report(expectedCells: number, nowMs = Date.now(), qualityThreshold = 0.55): CoverageReport {
    const cells = this.all();
    const coverage = this.coverage(expectedCells);
    const quality = cells.length ? cells.reduce((sum, cell) => sum + cell.quality, 0) / cells.length : 0;
    const freshness = cells.length ? cells.reduce((sum, cell) => sum + Math.exp(-(nowMs - cell.lastSeenMs) / this.halfLifeMs), 0) / cells.length : 0;
    const weakCells = this.weakCells(qualityThreshold);
    const observed = new Set(cells.map(cell => this.key(cell.x, cell.z)));
    const suggestedCells = weakCells.slice(0, 8).map(cell => ({ x: (cell.x + 0.5) * this.cellSize, z: (cell.z + 0.5) * this.cellSize }));
    for (const cell of cells) {
      for (const neighbor of [{ x: cell.x + 1, z: cell.z }, { x: cell.x, z: cell.z + 1 }]) {
        if (!observed.has(this.key(neighbor.x, neighbor.z)) && suggestedCells.length < 8) suggestedCells.push({ x: (neighbor.x + 0.5) * this.cellSize, z: (neighbor.z + 0.5) * this.cellSize });
      }
    }
    return { coverage, quality, confidence: clamp(0.5 * coverage + 0.35 * quality + 0.15 * freshness), weakCells, suggestedCells };
  }
}
