import type { SceneObject, SpatialScene } from '../core/types';
import { moveObject, removeObject, resizeObject, rotateObject, addObject, setObjectVisibility } from '../core/scene';

export type VisualizationCommand =
  | { type: 'move'; objectId: string; dx: number; dy: number; dz: number; label?: string }
  | { type: 'rotate'; objectId: string; rotationY: number; label?: string }
  | { type: 'resize'; objectId: string; width: number; height: number; depth: number; label?: string }
  | { type: 'remove'; objectId: string; label?: string }
  | { type: 'add'; object: SceneObject; label?: string }
  | { type: 'visibility'; objectId: string; visible: boolean; label?: string };

export function executeCommand(scene: SpatialScene, command: VisualizationCommand): SpatialScene {
  switch (command.type) {
    case 'move': return moveObject(scene, command.objectId, { x: command.dx, y: command.dy, z: command.dz });
    case 'rotate': return rotateObject(scene, command.objectId, command.rotationY);
    case 'resize': return resizeObject(scene, command.objectId, command.width, command.height, command.depth);
    case 'remove': return removeObject(scene, command.objectId);
    case 'add': return addObject(scene, command.object);
    case 'visibility': return setObjectVisibility(scene, command.objectId, command.visible);
  }
}

export function commandLabel(command: VisualizationCommand): string {
  return command.label ?? ({
    move: 'Move object',
    rotate: 'Rotate object',
    resize: 'Resize object',
    remove: 'Remove object',
    add: 'Add object',
    visibility: 'Change visibility',
  } as Record<VisualizationCommand['type'], string>)[command.type];
}
