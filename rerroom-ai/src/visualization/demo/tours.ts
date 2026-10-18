import type { CameraTour, SpatialScene } from '../core/types';
import { cameraForPreset } from '../core/camera';

export function makeTour(scene: SpatialScene, id = `tour-${scene.metadata.roomId}`): CameraTour {
  const presets = ['wide', 'hero', 'eye-level', 'corner', 'detail', 'top'] as const;
  const step = 5000;
  return {
    id,
    name: `${scene.metadata.roomId} presentation`,
    durationMs: step * presets.length,
    loop: true,
    keyframes: presets.map((preset, index) => ({
      at: index * step,
      pose: cameraForPreset(scene, preset),
    })),
  };
}

export const TOUR_TIPS = [
  'Start wide to establish the room footprint.',
  'Move to eye level for furniture proportions.',
  'Use corner view to inspect circulation.',
  'Use detail view to inspect materials.',
  'Finish overhead to review the complete plan.',
];
