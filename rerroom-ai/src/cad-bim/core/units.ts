import { Meters } from './types';

export const UNIT_TO_METERS: Record<string, number> = {
  mm: 0.001,
  millimeter: 0.001,
  millimeters: 0.001,
  cm: 0.01,
  centimeter: 0.01,
  centimeters: 0.01,
  m: 1,
  meter: 1,
  meters: 1,
  in: 0.0254,
  inch: 0.0254,
  inches: 0.0254,
  ft: 0.3048,
  foot: 0.3048,
  feet: 0.3048,
};

export function toMeters(value: number, unit: string): Meters {
  const factor = UNIT_TO_METERS[unit.toLowerCase()];
  if (!factor) throw new Error(`Unsupported unit: ${unit}`);
  return value * factor;
}
export function fromMeters(value: number, unit: string): number {
  const factor = UNIT_TO_METERS[unit.toLowerCase()];
  if (!factor) throw new Error(`Unsupported unit: ${unit}`);
  return value / factor;
}
export function metersToMillimeters(value: number): number { return Math.round(value * 1000); }
export function millimetersToMeters(value: number): number { return value / 1000; }
export function roundMeters(value: number, decimals = 6): number {
  const p = 10 ** decimals;
  return Math.round(value * p) / p;
}
export function normalizeLength(value: number, unit: string): number {
  if (!Number.isFinite(value)) throw new Error('Length must be finite');
  return roundMeters(toMeters(value, unit));
}
export function detectLikelyUnit(values: number[]): { unit: string; confidence: number } {
  const finite = values.filter(Number.isFinite).map(Math.abs).filter(v => v > 0);
  if (!finite.length) return { unit: 'unknown', confidence: 0 };
  const median = [...finite].sort((a,b)=>a-b)[Math.floor(finite.length/2)];
  if (median > 100 && median < 100000) return { unit: 'mm', confidence: 0.72 };
  if (median > 10 && median < 10000) return { unit: 'cm', confidence: 0.48 };
  if (median > 0.5 && median < 100) return { unit: 'm', confidence: 0.62 };
  if (median > 1 && median < 500) return { unit: 'in', confidence: 0.32 };
  return { unit: 'm', confidence: 0.2 };
}
