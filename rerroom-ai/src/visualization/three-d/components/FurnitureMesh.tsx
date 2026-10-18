import React, { memo } from 'react';
import type { SceneObject } from '../../core/types';
import { renderMaterial } from '../materials';

export interface FurnitureMeshProps {
  object: SceneObject;
  color?: string;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export const FurnitureMesh = memo(function FurnitureMesh({ object, color, selected, onSelect }: FurnitureMeshProps) {
  const material = renderMaterial(undefined, color ?? '#D4D7E2');
  const [x, y, z] = [object.transform.position.x, object.transform.position.y, object.transform.position.z];
  return (
    <group
      position={[x, y, z]}
      rotation={[0, -object.transform.rotationY, 0]}
      scale={[object.transform.scale.x, object.transform.scale.y, object.transform.scale.z]}
      visible={object.visible}
      onClick={(event) => { event.stopPropagation(); onSelect?.(object.id); }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[object.size.width, object.size.height, object.size.depth]} />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
          transparent={material.transparent}
          opacity={material.opacity}
        />
      </mesh>
      {selected && (
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[object.size.width, object.size.height, object.size.depth]} />
          <meshBasicMaterial color="#4F5BFF" wireframe transparent opacity={0.75} />
        </mesh>
      )}
    </group>
  );
});
