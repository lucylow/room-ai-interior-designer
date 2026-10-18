import type { Vec2 } from '../core/types';

export interface PlanAnnotation {
  id: string;
  kind: 'note' | 'room-label' | 'warning' | 'measurement';
  text: string;
  position: Vec2;
  rotation: number;
  visible: boolean;
}

export function makeAnnotation(id: string, text: string, position: Vec2, kind: PlanAnnotation['kind'] = 'note'): PlanAnnotation {
  return { id, kind, text: text.trim().slice(0, 200), position, rotation: 0, visible: true };
}

export function moveAnnotation(annotation: PlanAnnotation, position: Vec2): PlanAnnotation {
  return { ...annotation, position };
}

export function rotateAnnotation(annotation: PlanAnnotation, rotation: number): PlanAnnotation {
  return { ...annotation, rotation };
}
