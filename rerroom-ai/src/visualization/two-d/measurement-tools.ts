import type { Measurement, Vec2, Vec3 } from '../core/types';
import { distanceMeasurement } from '../core/measurements';
import { planDistance } from '../core/measurements';

export interface MeasurementDraft {
  start: Vec2 | null;
  end: Vec2 | null;
}

export function emptyMeasurementDraft(): MeasurementDraft {
  return { start: null, end: null };
}

export function updateMeasurementDraft(draft: MeasurementDraft, point: Vec2): MeasurementDraft {
  if (!draft.start) return { start: point, end: null };
  return { ...draft, end: point };
}

export function draftLength(draft: MeasurementDraft): number {
  return draft.start && draft.end ? planDistance(draft.start, draft.end) : 0;
}

export function draftToMeasurement(draft: MeasurementDraft, id: string): Measurement | null {
  if (!draft.start || !draft.end) return null;
  const a: Vec3 = { x: draft.start.x, y: 0, z: draft.start.y };
  const b: Vec3 = { x: draft.end.x, y: 0, z: draft.end.y };
  return distanceMeasurement(id, a, b);
}
