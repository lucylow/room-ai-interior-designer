import React from 'react';
import { Billboard, Text } from '@react-three/drei';

export function ObjectBillboardLabel({ text, position, visible = true }: { text: string; position: [number, number, number]; visible?: boolean }) {
  if (!visible) return null;
  return (
    <Billboard position={position}>
      <Text
        fontSize={0.11}
        color="#17181B"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.008}
        outlineColor="#FFFFFF"
      >
        {text}
      </Text>
    </Billboard>
  );
}
