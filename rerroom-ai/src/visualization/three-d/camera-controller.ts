import type { CameraPose, CameraPresetId, SpatialScene } from '../core/types';
import { cameraForPreset, clampCamera, interpolateCamera } from '../core/camera';
import { clamp } from '../core/vec';

export interface CameraController {
  getPose(): CameraPose;
  setPose(pose: CameraPose): void;
  snap(preset: CameraPresetId, animate?: boolean): CameraPose;
  zoom(delta: number): CameraPose;
  pan(dx: number, dy: number): CameraPose;
}

export function createCameraController(scene: SpatialScene, initial?: CameraPose): CameraController {
  let pose = clampCamera(initial ?? cameraForPreset(scene, 'hero'), scene);
  return {
    getPose: () => pose,
    setPose(next) { pose = clampCamera(next, scene); },
    snap(preset, animate = true) {
      const target = clampCamera(cameraForPreset(scene, preset), scene);
      pose = animate ? interpolateCamera(pose, target, 1) : target;
      return pose;
    },
    zoom(delta) {
      const dx = pose.position.x - pose.target.x;
      const dy = pose.position.y - pose.target.y;
      const dz = pose.position.z - pose.target.z;
      const distance = Math.max(0.35, Math.hypot(dx, dy, dz) + delta);
      const scale = distance / Math.max(0.001, Math.hypot(dx, dy, dz));
      pose = clampCamera({ ...pose, position: {
        x: pose.target.x + dx * scale,
        y: pose.target.y + dy * scale,
        z: pose.target.z + dz * scale,
      } }, scene);
      return pose;
    },
    pan(dx, dy) {
      const amount = clamp(Math.hypot(dx, dy), 0, 2);
      pose = clampCamera({
        ...pose,
        position: { x: pose.position.x + dx, y: pose.position.y + dy, z: pose.position.z },
        target: { x: pose.target.x + dx, y: pose.target.y + dy, z: pose.target.z },
      }, scene);
      void amount;
      return pose;
    },
  };
}
