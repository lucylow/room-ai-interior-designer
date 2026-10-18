import type { Rect2D, Vec2 } from '../core/types';
import { generateGrid } from '../core/layout-grid';

export interface PlanGrid {
  lines: Array<{ start: Vec2; end: Vec2; major: boolean }>;
  minorCell: number;
  majorCell: number;
}

export function createPlanGrid(bounds: Rect2D, zoom: number): PlanGrid {
  const minorCell = zoom >= 2.4 ? 0.1 : zoom >= 1.2 ? 0.25 : 0.5;
  const majorEvery = zoom >= 2.4 ? 5 : 4;
  return { lines: generateGrid(bounds, minorCell, majorEvery), minorCell, majorCell: minorCell * majorEvery };
}

export function gridLabel(value: number): string {
  return Math.abs(value) < 0.001 ? '0' : Number(value.toFixed(2)).toString();
}
