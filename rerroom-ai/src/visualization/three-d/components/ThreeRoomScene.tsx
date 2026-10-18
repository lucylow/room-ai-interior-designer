import React, { Suspense, useMemo } from 'react';
import type { SpatialScene } from '../../core/types';
import { SceneObjects } from './SceneObjects';
import { RoomShell } from './RoomShell';
import { LightingRig } from './LightingRig';
import { SpatialMeasurementLines } from './SpatialMeasurementLines';

export interface ThreeRoomSceneProps {
  scene: SpatialScene;
  selectedIds?: string[];
  quality?: number;
  showCeiling?: boolean;
  onSelect?: (id: string) => void;
}

export function ThreeRoomScene({
  scene,
  selectedIds = [],
  quality = 1,
  showCeiling = false,
  onSelect,
}: ThreeRoomSceneProps) {
  const measurementData = useMemo(() => scene.measurements, [scene.measurements]);
  return (
    <Suspense fallback={null}>
      <color attach="background" args={['#EEF1F4']} />
      <fog attach="fog" args={['#EEF1F4', 12, Math.max(28, scene.room.width * 6)]} />
      <LightingRig preset={scene.lighting} quality={quality} shadows={quality > 0.5} />
      <RoomShell scene={scene} showCeiling={showCeiling} />
      <SceneObjects scene={scene} selectedIds={selectedIds} onSelect={onSelect} />
      <SpatialMeasurementLines measurements={measurementData} />
    </Suspense>
  );
}
