import React from 'react';
import type { SpatialScene } from '../../core/types';
import { openingPrimitives, wallPrimitives } from '../room-geometry';

export interface RoomShellProps {
  scene: SpatialScene;
  showCeiling?: boolean;
  showOpenings?: boolean;
}

export function RoomShell({ scene, showCeiling = false, showOpenings = true }: RoomShellProps) {
  const walls = wallPrimitives(scene);
  const openings = showOpenings ? openingPrimitives(scene) : [];
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[scene.room.width / 2, 0, scene.room.depth / 2]}>
        <planeGeometry args={[scene.room.width, scene.room.depth]} />
        <meshStandardMaterial color="#D7D1C6" roughness={0.88} />
      </mesh>
      {walls.map(wall => (
        <mesh key={wall.id} castShadow receiveShadow position={wall.center} rotation={[0, wall.rotation, 0]}>
          <boxGeometry args={wall.size} />
          <meshStandardMaterial color="#F0EEE9" roughness={0.92} />
        </mesh>
      ))}
      {openings.map(opening => (
        <mesh key={opening.id} position={opening.center} rotation={[0, opening.rotation, 0]}>
          <boxGeometry args={[opening.size[0], opening.size[1], Math.max(0.02, opening.size[2] * 0.35)]} />
          <meshBasicMaterial color={opening.kind === 'window' ? '#B8DDF5' : '#25262A'} transparent opacity={0.38} />
        </mesh>
      ))}
      {showCeiling && (
        <mesh position={[scene.room.width / 2, scene.room.ceiling, scene.room.depth / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[scene.room.width, scene.room.depth]} />
          <meshStandardMaterial color="#FAFAF8" side={2} />
        </mesh>
      )}
    </group>
  );
}
