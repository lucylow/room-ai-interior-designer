import type { RoomObjectState, RoomStateModel } from '../../security/types';
import { makeObject } from '../core/scene';
import type { SceneObject, SpatialScene } from '../core/types';
import { assertSpatialScene } from '../core/serialization';
import { DEMO_MATERIALS } from '../demo/catalog';

const ROOM_OBJECT_TYPES = ['sofa', 'table', 'rug', 'lamp', 'cabinet', 'bed', 'chair', 'plant', 'custom'] as const;

function isRoomObjectType(value: string): value is RoomObjectState['type'] {
  return (ROOM_OBJECT_TYPES as readonly string[]).includes(value);
}

function mapRoomObject(object: RoomObjectState): SceneObject {
  return makeObject({
    id: object.id,
    type: object.type,
    label: object.label,
    transform: {
      position: { x: object.x, y: object.y + object.height / 2, z: object.z },
      rotationY: object.rotationY,
      scale: { x: 1, y: 1, z: 1 },
    },
    size: { width: object.width, height: object.height, depth: object.depth },
    visible: true,
    locked: object.locked,
  });
}

export function roomStateToScene(room: RoomStateModel): SpatialScene {
  if (!room || typeof room.id !== 'string' || !room.id || !room.measurements || !Array.isArray(room.objects)) {
    throw new Error('Invalid room state.');
  }
  const width = room.measurements.widthM ?? 5;
  const depth = room.measurements.depthM ?? 4;
  const ceiling = room.measurements.ceilingM ?? 2.7;
  const scene: SpatialScene = {
    metadata: {
      id: `${room.id}-visualization`,
      roomId: room.id,
      version: room.version,
      unit: 'm',
      createdAt: room.updatedAt,
      updatedAt: room.updatedAt,
    },
    room: {
      width,
      depth,
      ceiling,
      walls: [
        { id: `${room.id}-north`, start: { x: 0, y: 0 }, end: { x: width, y: 0 }, thickness: 0.12 },
        { id: `${room.id}-east`, start: { x: width, y: 0 }, end: { x: width, y: depth }, thickness: 0.12 },
        { id: `${room.id}-south`, start: { x: width, y: depth }, end: { x: 0, y: depth }, thickness: 0.12 },
        { id: `${room.id}-west`, start: { x: 0, y: depth }, end: { x: 0, y: 0 }, thickness: 0.12 },
      ],
      openings: [],
      floorMaterialId: 'mat-floor',
      wallMaterialId: 'mat-wall',
    },
    objects: room.objects.map(mapRoomObject),
    measurements: [],
    materials: DEMO_MATERIALS,
    lighting: {
      id: 'room-default-light',
      name: 'Room Default',
      ambient: 0.72,
      keyIntensity: 1.4,
      fillIntensity: 0.7,
      colorTemperature: 5000,
      sunAzimuth: 0.8,
      sunElevation: 0.8,
      shadows: true,
    },
  };
  assertSpatialScene(scene);
  return scene;
}

export function sceneToRoomState(scene: SpatialScene, source: RoomStateModel): RoomStateModel {
  assertSpatialScene(scene);
  return {
    ...source,
    measurements: { widthM: scene.room.width, depthM: scene.room.depth, ceilingM: scene.room.ceiling },
    objects: scene.objects.map((object) => {
      if (!isRoomObjectType(object.type)) throw new Error('Scene contains an unsupported room object type.');
      return {
        id: object.id,
        type: object.type,
        label: object.label,
        x: object.transform.position.x,
        y: object.transform.position.y - object.size.height / 2,
        z: object.transform.position.z,
        width: object.size.width,
        height: object.size.height,
        depth: object.size.depth,
        rotationY: object.transform.rotationY,
        locked: object.locked,
      };
    }),
    updatedAt: Date.now(),
    version: source.version + 1,
  };
}
