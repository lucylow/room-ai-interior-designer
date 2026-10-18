import type { Rect2D } from './types';

export interface GridLine {
  start: { x: number; y: number };
  end: { x: number; y: number };
  major: boolean;
}

export function generateGrid(bounds: Rect2D, cell: number, majorEvery = 5): GridLine[] {
  const lines: GridLine[] = [];
  const safeCell = Math.max(0.05, cell);
  const minX = Math.floor(bounds.x / safeCell) * safeCell;
  const maxX = Math.ceil((bounds.x + bounds.width) / safeCell) * safeCell;
  const minY = Math.floor(bounds.y / safeCell) * safeCell;
  const maxY = Math.ceil((bounds.y + bounds.height) / safeCell) * safeCell;
  let index = 0;
  for (let x = minX; x <= maxX + safeCell * 0.5; x += safeCell) {
    lines.push({ start: { x, y: minY }, end: { x, y: maxY }, major: index % majorEvery === 0 });
    index += 1;
  }
  index = 0;
  for (let y = minY; y <= maxY + safeCell * 0.5; y += safeCell) {
    lines.push({ start: { x: minX, y }, end: { x: maxX, y }, major: index % majorEvery === 0 });
    index += 1;
  }
  return lines;
}

export function snapGridPoint(point: { x: number; y: number }, cell: number) {
  const size = Math.max(0.01, cell);
  return { x: Math.round(point.x / size) * size, y: Math.round(point.y / size) * size };
}
