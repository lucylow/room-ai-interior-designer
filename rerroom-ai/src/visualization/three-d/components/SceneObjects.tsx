import React from 'react';
import type { SpatialScene } from '../../core/types';
import { FurnitureMesh } from './FurnitureMesh';
import { ModelErrorBoundary } from './ModelErrorBoundary';

export interface SceneObjectsProps {
  scene: SpatialScene;
  selectedIds: string[];
  onSelect?: (id: string) => void;
}

export function SceneObjects({ scene, selectedIds, onSelect }: SceneObjectsProps) {
  const selected = new Set(selectedIds);
  return (
    <group>
      {scene.objects.filter(item => item.visible).map(object => (
        <ModelErrorBoundary key={object.id} fallbackSize={Math.max(object.size.width, object.size.height, object.size.depth)}>
          <FurnitureMesh object={object} selected={selected.has(object.id)} onSelect={onSelect} />
        </ModelErrorBoundary>
      ))}
    </group>
  );
}
