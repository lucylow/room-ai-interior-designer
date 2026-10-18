import type { SpatialScene } from '../core/types';

export interface PlanExportSpec {
  width: number;
  height: number;
  scale: number;
  background: string;
  includeLabels: boolean;
  includeMeasurements: boolean;
  pixelRatio: number;
}

export function defaultPlanExport(width = 2400, height = 1600): PlanExportSpec {
  return {
    width,
    height,
    scale: 140,
    background: '#F8F8F6',
    includeLabels: true,
    includeMeasurements: true,
    pixelRatio: 2,
  };
}

export function boundedPlanExport(input: Partial<PlanExportSpec>): PlanExportSpec {
  const defaults = defaultPlanExport();
  return {
    ...defaults,
    ...input,
    width: Math.min(6000, Math.max(320, input.width ?? defaults.width)),
    height: Math.min(6000, Math.max(320, input.height ?? defaults.height)),
    scale: Math.min(500, Math.max(40, input.scale ?? defaults.scale)),
    pixelRatio: Math.min(4, Math.max(1, input.pixelRatio ?? defaults.pixelRatio)),
  };
}

export function estimatePlanPixels(scene: SpatialScene, spec: PlanExportSpec): number {
  return Math.ceil(scene.room.width * spec.scale * spec.pixelRatio) *
    Math.ceil(scene.room.depth * spec.scale * spec.pixelRatio);
}
