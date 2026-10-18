import type { SceneObject, SpatialScene, Vec3 } from './types';
import { clampDragDelta, snapPosition } from './snap';
import { moveObject } from './scene';

export interface DragSession {
  objectId: string;
  start: Vec3;
  current: Vec3;
  startedAt: number;
}

export interface DragOptions {
  snap: Parameters<typeof snapPosition>[2];
  maxDeltaPerFrame?: number;
}

export function createDragSession(object: SceneObject, now = Date.now()): DragSession {
  return { objectId: object.id, start: { ...object.transform.position }, current: { ...object.transform.position }, startedAt: now };
}

export function applyDrag(scene: SpatialScene, session: DragSession, delta: Vec3, options: DragOptions): { scene: SpatialScene; session: DragSession } {
  const safe = clampDragDelta(delta, options.maxDeltaPerFrame ?? 0.5);
  const current = {
    x: session.current.x + safe.x,
    y: session.current.y + safe.y,
    z: session.current.z + safe.z,
  };
  const object = scene.objects.find(item => item.id === session.objectId);
  if (!object) return { scene, session };
  const preview = { ...object, transform: { ...object.transform, position: current } };
  const snap = snapPosition(preview, scene, options.snap);
  const nextScene = moveObject(scene, session.objectId, {
    x: snap.position.x - object.transform.position.x,
    y: snap.position.y - object.transform.position.y,
    z: snap.position.z - object.transform.position.z,
  });
  return { scene: nextScene, session: { ...session, current: snap.position } };
}

export function endDrag(session: DragSession): { objectId: string; displacement: Vec3; durationMs: number } {
  return {
    objectId: session.objectId,
    displacement: {
      x: session.current.x - session.start.x,
      y: session.current.y - session.start.y,
      z: session.current.z - session.start.z,
    },
    durationMs: Math.max(0, Date.now() - session.startedAt),
  };
}
