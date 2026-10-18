import React from 'react';
import type { SpatialScene } from '../src/visualization/core/types';
import { ThreeSceneCanvas } from '../src/visualization/three-d/components/ThreeSceneCanvas';

export interface ThreeRendererSetupProps {
  scene: SpatialScene;
  quality: number;
  selectedIds: string[];
  onSelect?: (id: string) => void;
}

export function ThreeRendererSetup({ scene, quality, selectedIds, onSelect }: ThreeRendererSetupProps) {
  return (
    <ThreeSceneCanvas
      scene={scene}
      quality={quality}
      selectedIds={selectedIds}
      onSelect={onSelect}
      showGrid={false}
    />
  );
}
