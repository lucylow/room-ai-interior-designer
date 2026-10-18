import React from 'react';

export function FloorGrid({ width, depth, cell = 0.5 }: { width: number; depth: number; cell?: number }) {
  const columns = Math.max(1, Math.ceil(width / cell));
  const rows = Math.max(1, Math.ceil(depth / cell));
  const points: React.ReactNode[] = [];
  for (let i = 0; i <= columns; i += 1) {
    points.push(
      <mesh key={`x-${i}`} position={[i * cell - width / 2, 0.012, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.008, 0.008, depth]} />
        <meshBasicMaterial color="#B7BDC8" transparent opacity={0.32} />
      </mesh>,
    );
  }
  for (let i = 0; i <= rows; i += 1) {
    points.push(
      <mesh key={`z-${i}`} position={[0, 0.012, i * cell - depth / 2]}>
        <boxGeometry args={[width, 0.008, 0.008]} />
        <meshBasicMaterial color="#B7BDC8" transparent opacity={0.32} />
      </mesh>,
    );
  }
  return <group position={[width / 2, 0, depth / 2]}>{points}</group>;
}
