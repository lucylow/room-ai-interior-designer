import React from 'react';
import type { SpatialScene, Viewport2D } from '../src/visualization/core/types';
import { PlanCanvas } from '../src/visualization/components/PlanCanvas';

export interface TwoDRendererSetupProps {
  scene: SpatialScene;
  viewport: Viewport2D;
  selectedIds: string[];
  dark?: boolean;
  onSelect?: (id: string) => void;
}

export function TwoDRendererSetup(props: TwoDRendererSetupProps) {
  return <PlanCanvas {...props} />;
}
