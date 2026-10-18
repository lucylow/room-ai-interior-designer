import type { Vec2, Viewport2D } from '../core/types';
import { clamp } from '../core/vec';
import { createPlanProjection } from './projection';

export function panViewport(viewport: Viewport2D, dx: number, dy: number): Viewport2D {
  return { ...viewport, x: viewport.x + dx, y: viewport.y + dy };
}

export function zoomViewport(viewport: Viewport2D, factor: number, anchor: Vec2): Viewport2D {
  const nextZoom = clamp(viewport.zoom * factor, 0.05, 20);
  const ratio = nextZoom / viewport.zoom;
  return {
    ...viewport,
    zoom: nextZoom,
    x: anchor.x - (anchor.x - viewport.x) * ratio,
    y: anchor.y - (anchor.y - viewport.y) * ratio,
  };
}

export function fitViewport(viewport: Viewport2D, roomWidth: number, roomDepth: number, padding = 32): Viewport2D {
  const scale = Math.min(
    Math.max(1, viewport.width - padding * 2) / Math.max(roomWidth, 0.1),
    Math.max(1, viewport.height - padding * 2) / Math.max(roomDepth, 0.1),
  );
  const reference = createPlanProjection({ ...viewport, x: 0, y: 0, zoom: 1 }, roomWidth, roomDepth, padding);
  const current = reference.pixelsPerMeter;
  return { ...viewport, x: 0, y: 0, zoom: scale / Math.max(current, 0.0001) };
}
