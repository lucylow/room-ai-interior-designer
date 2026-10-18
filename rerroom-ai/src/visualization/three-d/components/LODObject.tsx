import React, { useMemo } from 'react';
import type { SceneObject, Vec3 } from '../../core/types';
import { makeRenderableObjects } from '../object-lod';
import { ModelAsset } from './ModelAsset';

export function LODObject({
  object,
  cameraPosition,
  maxObjects = 160,
}: {
  object: SceneObject;
  cameraPosition: Vec3;
  maxObjects?: number;
}) {
  const renderables = useMemo(
    () => makeRenderableObjects([object], cameraPosition, maxObjects),
    [cameraPosition, maxObjects, object],
  );
  const renderable = renderables[0];
  if (!renderable) return null;
  return <ModelAsset object={object} lod={renderable.lod} />;
}
