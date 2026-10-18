import type { Measurement, SpatialScene } from '../core/types';
import { formatMeters } from '../core/units';
import { dist3 } from '../core/vec';

export interface MeasureOverlayItem {
  measurement: Measurement;
  start: { x: number; y: number };
  end: { x: number; y: number };
  text: string;
}

export function buildMeasureOverlay(scene: SpatialScene): MeasureOverlayItem[] {
  return scene.measurements.filter(item => item.visible).map(item => {
    const end = item.b ?? item.a;
    const measuredValue = item.kind === 'distance' ? dist3(item.a, end) : item.value;
    return {
      measurement: item,
      start: { x: item.a.x, y: item.a.z },
      end: { x: end.x, y: end.z },
      text: item.label ?? (item.unit === 'm' ? formatMeters(measuredValue) : `${measuredValue.toFixed(1)} ${item.unit}`),
    };
  });
}
