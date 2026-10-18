import type { SpatialScene, Vec3 } from './types';
import { dist3 } from './vec';

export type SceneDiffKind = 'added' | 'removed' | 'moved' | 'resized' | 'rotated' | 'visibility' | 'unchanged';

export interface SceneDiff {
  objectId: string;
  kind: SceneDiffKind;
  label: string;
  positionDelta?: Vec3;
  rotationDelta?: number;
  sizeDelta?: { width: number; height: number; depth: number };
}

export function diffScenes(before: SpatialScene, after: SpatialScene): SceneDiff[] {
  const beforeMap = new Map(before.objects.map(item => [item.id, item]));
  const afterMap = new Map(after.objects.map(item => [item.id, item]));
  const output: SceneDiff[] = [];

  for (const object of after.objects) {
    const previous = beforeMap.get(object.id);
    if (!previous) {
      output.push({ objectId: object.id, kind: 'added', label: object.label });
      continue;
    }
    const positionDelta = {
      x: object.transform.position.x - previous.transform.position.x,
      y: object.transform.position.y - previous.transform.position.y,
      z: object.transform.position.z - previous.transform.position.z,
    };
    const sizeDelta = {
      width: object.size.width - previous.size.width,
      height: object.size.height - previous.size.height,
      depth: object.size.depth - previous.size.depth,
    };
    if (dist3(object.transform.position, previous.transform.position) > 0.001) {
      output.push({ objectId: object.id, kind: 'moved', label: object.label, positionDelta });
    } else if (Math.abs(object.transform.rotationY - previous.transform.rotationY) > 0.001) {
      output.push({ objectId: object.id, kind: 'rotated', label: object.label, rotationDelta: object.transform.rotationY - previous.transform.rotationY });
    } else if (Math.abs(sizeDelta.width) + Math.abs(sizeDelta.height) + Math.abs(sizeDelta.depth) > 0.001) {
      output.push({ objectId: object.id, kind: 'resized', label: object.label, sizeDelta });
    } else if (object.visible !== previous.visible) {
      output.push({ objectId: object.id, kind: 'visibility', label: object.label });
    } else {
      output.push({ objectId: object.id, kind: 'unchanged', label: object.label });
    }
  }

  for (const object of before.objects) {
    if (!afterMap.has(object.id)) output.push({ objectId: object.id, kind: 'removed', label: object.label });
  }
  return output;
}
