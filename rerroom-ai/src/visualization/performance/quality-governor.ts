import type { LODLevel } from './lod';
import { clamp } from '../core/vec';

export interface DeviceSignals {
  frameMs: number;
  memoryPressure: 'normal' | 'moderate' | 'high';
  batteryLow: boolean;
  reducedMotion: boolean;
}

export interface QualityState {
  level: number;
  lodBias: LODLevel;
  shadows: boolean;
  postProcessing: boolean;
  textureScale: number;
  maxVisible: number;
}

export function qualityGovernor(signals: DeviceSignals, current: QualityState): QualityState {
  let level = current.level;
  if (signals.frameMs > 20) level -= 0.12;
  if (signals.frameMs > 28) level -= 0.15;
  if (signals.memoryPressure === 'moderate') level -= 0.08;
  if (signals.memoryPressure === 'high') level -= 0.2;
  if (signals.batteryLow) level -= 0.08;
  if (signals.reducedMotion) level = Math.min(level, 0.75);
  level = clamp(level, 0.3, 1);
  return {
    ...current,
    level,
    lodBias: level < 0.5 ? 'low' : level < 0.75 ? 'medium' : current.lodBias,
    shadows: current.shadows && level >= 0.55,
    postProcessing: current.postProcessing && level >= 0.7,
    textureScale: clamp(level, 0.25, 1),
    maxVisible: Math.round(40 + 140 * level),
  };
}

export function defaultQualityState(reducedMotion = false): QualityState {
  return {
    level: reducedMotion ? 0.75 : 1,
    lodBias: 'high',
    shadows: !reducedMotion,
    postProcessing: !reducedMotion,
    textureScale: 1,
    maxVisible: 180,
  };
}
