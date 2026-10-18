import { clamp } from './vec';

export type UnitSystem = 'metric' | 'imperial';

export function metersToCentimeters(m: number): number { return m * 100; }
export function centimetersToMeters(cm: number): number { return cm / 100; }
export function metersToInches(m: number): number { return m * 39.37007874015748; }
export function inchesToMeters(inches: number): number { return inches / 39.37007874015748; }
export function metersToFeet(m: number): number { return m * 3.280839895013123; }
export function feetToMeters(ft: number): number { return ft / 3.280839895013123; }

export function formatMeters(m: number, system: UnitSystem = 'metric'): string {
  if (system === 'metric') {
    if (Math.abs(m) < 1) return `${Math.round(m * 100)} cm`;
    return `${m.toFixed(2)} m`;
  }
  const inches = metersToInches(m);
  const feet = Math.floor(inches / 12);
  const remainder = Math.round(inches - feet * 12);
  if (remainder === 12) return `${feet + 1} ft`;
  return `${feet} ft ${remainder} in`;
}

export function formatArea(squareMeters: number, system: UnitSystem = 'metric'): string {
  if (system === 'metric') return `${squareMeters.toFixed(2)} m²`;
  return `${(squareMeters * 10.763910416709722).toFixed(1)} ft²`;
}

export function fitScale(worldWidth: number, worldHeight: number, viewportWidth: number, viewportHeight: number, padding = 48): number {
  const usableWidth = Math.max(1, viewportWidth - padding * 2);
  const usableHeight = Math.max(1, viewportHeight - padding * 2);
  return clamp(Math.min(usableWidth / Math.max(worldWidth, 0.001), usableHeight / Math.max(worldHeight, 0.001)), 0.01, 10000);
}

export function snapLength(meters: number, increment = 0.01): number {
  const safe = Math.max(0, increment);
  return safe === 0 ? meters : Math.round(meters / safe) * safe;
}
