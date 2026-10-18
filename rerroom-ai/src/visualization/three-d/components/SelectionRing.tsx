import React from 'react';

export function SelectionRing({ radius = 0.7 }: { radius?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <ringGeometry args={[radius * 0.9, radius, 32]} />
      <meshBasicMaterial color="#4F5BFF" transparent opacity={0.9} />
    </mesh>
  );
}
