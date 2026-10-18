import React, { Suspense } from 'react';
import type { SceneObject } from '../../core/types';
import { ProxyMesh } from './ProxyMesh';
import { ModelErrorBoundary } from './ModelErrorBoundary';

export interface ModelAssetProps {
  object: SceneObject;
  lod: 'proxy' | 'low' | 'medium' | 'high';
  modelRenderer?: (object: SceneObject, lod: ModelAssetProps['lod']) => React.ReactNode;
}

function ModelContent({ object, lod, modelRenderer }: ModelAssetProps) {
  return modelRenderer
    ? modelRenderer(object, lod)
    : <ProxyMesh size={Math.max(object.size.width, object.size.height, object.size.depth)} />;
}

export function ModelAsset({ object, lod, modelRenderer }: ModelAssetProps) {
  const fallbackSize = Math.max(object.size.width, object.size.height, object.size.depth);
  return (
    <ModelErrorBoundary fallbackSize={fallbackSize}>
      <Suspense fallback={<ProxyMesh size={fallbackSize} />}>
        <ModelContent object={object} lod={lod} modelRenderer={modelRenderer} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
