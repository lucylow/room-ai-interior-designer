import React from 'react';

export function CompassGizmo() {
  return (
    <group position={[0, 0.03, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.24, 24]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.04, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.07, 0.16, 3]} />
        <meshBasicMaterial color="#4F5BFF" />
      </mesh>
    </group>
  );
}
