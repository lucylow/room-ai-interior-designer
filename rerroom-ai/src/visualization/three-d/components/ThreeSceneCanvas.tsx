import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { CameraPose, CameraPresetId, SpatialScene } from '../../core/types';
import { cameraForPreset } from '../../core/camera';
import { makeTour } from '../../demo/tours';
import { ThreeRoomScene } from './ThreeRoomScene';
import { FloorGrid } from './FloorGrid';
import { CompassGizmo } from './CompassGizmo';
import { environmentForTheme } from '../environment';
import { TourCamera } from './TourCamera';
import { ThreeSceneFallback } from './ThreeSceneFallback';

export interface ThreeSceneCanvasProps {
  scene: SpatialScene;
  width?: number | string;
  height?: number | string;
  selectedIds?: string[];
  quality?: number;
  showGrid?: boolean;
  onSelect?: (id: string) => void;
  onUsePlan?: () => void;
  cameraPreset?: CameraPresetId;
  tourPlaying?: boolean;
  reducedMotion?: boolean;
}

export function ThreeSceneCanvas({
  scene,
  width = '100%',
  height = '100%',
  selectedIds = [],
  quality = 1,
  showGrid = false,
  onSelect,
  onUsePlan,
  cameraPreset = 'hero',
  tourPlaying = false,
  reducedMotion = false,
}: ThreeSceneCanvasProps) {
  const presetCamera = useMemo(() => cameraForPreset(scene, cameraPreset), [scene, cameraPreset]);
  const tour = useMemo(() => makeTour(scene), [scene]);
  const [tourPose, setTourPose] = useState<CameraPose | null>(null);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const camera = tourPose ?? presetCamera;
  const environment = useMemo(() => environmentForTheme('bright', quality), [quality]);
  useEffect(() => setTourPose(null), [scene, cameraPreset]);
  useEffect(() => {
    if (!canvasElement) return;
    const onLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const onRestored = () => setContextLost(false);
    canvasElement.addEventListener('webglcontextlost', onLost);
    canvasElement.addEventListener('webglcontextrestored', onRestored);
    return () => {
      canvasElement.removeEventListener('webglcontextlost', onLost);
      canvasElement.removeEventListener('webglcontextrestored', onRestored);
    };
  }, [canvasElement]);

  return (
    <div
      role="img"
      aria-label={`${scene.metadata.roomId} interactive three-dimensional visualization`}
      style={{ width, height, minHeight: 400, background: environment.background, position: 'relative' }}
    >
      <Canvas
        fallback={<ThreeSceneFallback scene={scene} onUsePlan={onUsePlan} />}
        shadows={quality >= 0.55}
        dpr={Math.min(2, Math.max(1, quality * 2))}
        gl={{ antialias: quality >= 0.55, powerPreference: quality >= 0.75 ? 'high-performance' : 'default' }}
        onCreated={({ gl }) => { setCanvasElement(gl.domElement); setContextLost(false); }}
      >
        <TourCamera tour={tour} playing={tourPlaying} reducedMotion={reducedMotion} onPose={setTourPose} />
        <PerspectiveCamera
          makeDefault
          fov={camera.fov}
          near={camera.near}
          far={camera.far}
          position={[camera.position.x, camera.position.y, camera.position.z]}
        />
        <OrbitControls
          makeDefault
          enableDamping={!tourPlaying && !reducedMotion}
          dampingFactor={0.08}
          minDistance={0.45}
          maxDistance={Math.max(1, scene.room.width, scene.room.depth) * 2.5}
          target={[camera.target.x, camera.target.y, camera.target.z]}
          enabled={!tourPlaying}
        />
        <fog attach="fog" args={[environment.fogColor, environment.fogNear, environment.fogFar]} />
        <Suspense fallback={null}>
          <ThreeRoomScene scene={scene} selectedIds={selectedIds} quality={quality} onSelect={onSelect} />
          {showGrid && <FloorGrid width={scene.room.width} depth={scene.room.depth} />}
          <CompassGizmo />
        </Suspense>
      </Canvas>
      {contextLost ? (
        <div role="alert" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', background: '#F3F4F7' }}>
          <div>
            <strong>3D preview paused</strong>
            <p>The browser lost the graphics context. The 2D plan remains available while the renderer recovers.</p>
            <button type="button" onClick={onUsePlan}>Use the 2D plan</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
