import type { SpatialScene } from '../core/types';
import { cloneScene, moveObject, rotateObject } from '../core/scene';

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  build: (scene: SpatialScene) => SpatialScene;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'before-after-open',
    title: 'Open the center',
    description: 'Move the largest visible object away from the center to make the room read more open.',
    build(scene) {
      const target = [...scene.objects].sort((a,b) => b.size.width*b.size.depth - a.size.width*a.size.depth)[0];
      return target ? moveObject(scene, target.id, { x: 0.35, y: 0, z: 0.2 }) : cloneScene(scene);
    },
  },
  {
    id: 'rotate-seating',
    title: 'Face the seating',
    description: 'Rotate the first seating piece toward the room center.',
    build(scene) {
      const target = scene.objects.find(item => item.type === 'sofa' || item.type === 'chair');
      return target ? rotateObject(scene, target.id, Math.PI / 2) : cloneScene(scene);
    },
  },
  {
    id: 'minimal-cleanup',
    title: 'Minimal presentation',
    description: 'Hide the smallest decorative object for a calmer presentation frame.',
    build(scene) {
      const target = [...scene.objects].filter(item => item.type === 'plant' || item.type === 'lamp').sort((a,b) => a.size.width*a.size.depth - b.size.width*b.size.depth)[0];
      return target ? { ...scene, objects: scene.objects.map(item => item.id === target.id ? { ...item, visible: false } : item) } : cloneScene(scene);
    },
  },
];

export function scenario(scene: SpatialScene, id: string): SpatialScene {
  return DEMO_SCENARIOS.find(item => item.id === id)?.build(scene) ?? cloneScene(scene);
}
