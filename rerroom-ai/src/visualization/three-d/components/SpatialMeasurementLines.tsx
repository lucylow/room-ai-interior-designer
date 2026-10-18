import React from 'react';
import type { Measurement } from '../../core/types';
import { segmentPose } from '../line-orientation';

export function SpatialMeasurementLines({ measurements }: { measurements: Measurement[] }) {
  return (
    <group>
      {measurements.filter(item => item.visible && item.b).map(item => {
        const pose = segmentPose(item.a, item.b!);
        return (
          <group key={item.id} position={[pose.midpoint.x, pose.midpoint.y, pose.midpoint.z]} rotation={[pose.pitch, pose.yaw, 0]}>
            <mesh>
              <boxGeometry args={[0.012, 0.012, Math.max(0.01, pose.length)]} />
              <meshBasicMaterial color="#4F5BFF" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
