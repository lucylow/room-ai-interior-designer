import React from 'react';

export function ProxyMesh({ size = 1, color = '#C7CCD5' }: { size?: number; color?: string }) {
  return (
    <mesh>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe opacity={0.32} transparent />
    </mesh>
  );
}
