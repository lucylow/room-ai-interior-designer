import type { DataClass } from './types';

export const TELEMETRY_DENY_CLASSES: ReadonlySet<DataClass> = new Set([
  'credential',
  'room-image',
  'room-video',
  'room-layout',
  'contact',
  'financial',
  'construction',
]);

export function telemetryAllowed(dataClass: DataClass): boolean {
  return !TELEMETRY_DENY_CLASSES.has(dataClass);
}
