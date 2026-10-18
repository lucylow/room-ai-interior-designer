import type { Vec2 } from '../core/types';
import { clamp } from '../core/vec';

export interface GestureState {
  active: boolean;
  pointerId?: string;
  start: Vec2;
  current: Vec2;
  scaleStart: number;
  rotationStart: number;
}

export function idleGesture(): GestureState {
  return { active: false, start: { x: 0, y: 0 }, current: { x: 0, y: 0 }, scaleStart: 1, rotationStart: 0 };
}

export function beginGesture(pointerId: string, point: Vec2, scale: number, rotation: number): GestureState {
  return { active: true, pointerId, start: point, current: point, scaleStart: scale, rotationStart: rotation };
}

export function updateGesture(state: GestureState, point: Vec2, viewportScale = 1): GestureState {
  const factor = clamp(viewportScale, 0.01, 100);
  return { ...state, current: { x: point.x, y: point.y }, scaleStart: state.scaleStart / factor };
}

export function endGesture(state: GestureState): GestureState {
  return { ...state, active: false, pointerId: undefined };
}
