import type { Vec2, Viewport2D } from '../core/types';
import { panViewport, zoomViewport } from './viewport';

export type PlanGesture =
  | { type: 'pan'; dx: number; dy: number }
  | { type: 'zoom'; factor: number; anchor: Vec2 }
  | { type: 'rotate'; radians: number };

export function reducePlanGesture(viewport: Viewport2D, gesture: PlanGesture): Viewport2D {
  switch (gesture.type) {
    case 'pan':
      return panViewport(viewport, gesture.dx, gesture.dy);
    case 'zoom':
      return zoomViewport(viewport, gesture.factor, gesture.anchor);
    case 'rotate':
      return { ...viewport, rotation: viewport.rotation + gesture.radians };
  }
}

export interface DragProjection {
  startScreen: Vec2;
  currentScreen: Vec2;
  deltaWorld: Vec2;
}

export function createDragProjection(startScreen: Vec2): DragProjection {
  return { startScreen, currentScreen: startScreen, deltaWorld: { x: 0, y: 0 } };
}
