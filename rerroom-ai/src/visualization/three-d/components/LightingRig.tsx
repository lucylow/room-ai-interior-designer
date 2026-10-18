import React from 'react';
import type { LightingPreset } from '../../core/types';
import { lightingIntensity } from '../lighting';

export interface LightingRigProps {
  preset: LightingPreset;
  quality?: number;
  shadows?: boolean;
}

export function LightingRig({ preset, quality = 1, shadows = true }: LightingRigProps) {
  const intensity = lightingIntensity(preset, quality);
  return (
    <>
      <ambientLight intensity={intensity.ambient} />
      <hemisphereLight intensity={intensity.fill * 0.7} color="#FFF8EA" groundColor="#B9C2D1" />
      <directionalLight
        position={[Math.cos(preset.sunAzimuth) * 8, Math.max(2, preset.sunElevation * 8), Math.sin(preset.sunAzimuth) * 8]}
        intensity={intensity.key}
        castShadow={shadows && intensity.shadows}
        shadow-mapSize={shadows ? 1024 : 256}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
      />
      <pointLight position={[1, 2.4, 1]} intensity={intensity.fill * 0.6} distance={15} />
    </>
  );
}
