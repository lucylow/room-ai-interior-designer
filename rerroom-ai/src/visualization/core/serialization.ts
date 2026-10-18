import { safeJsonParse } from '../../security/safe-json';
import { SECURITY_CONSTANTS } from '../../security/constants';
import type { SpatialScene } from './types';

export const VISUALIZATION_SCHEMA_VERSION = 3;
const MAX_SCENE_CHARS = 2_000_000;
const MAX_WALLS = 256;
const MAX_OPENINGS = 512;
const MAX_MEASUREMENTS = 500;
const MAX_MATERIALS = 256;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireRecord(value: unknown, name: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(`Invalid scene ${name}.`);
  return value;
}

function requireText(value: unknown, name: string, max = 256): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.length > max) throw new Error(`Invalid scene ${name}.`);
}

function requireNumber(value: unknown, name: string, min: number, max: number): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`Invalid scene ${name}.`);
}

function requireVec2(value: unknown, name: string): asserts value is { x: number; y: number } {
  const point = requireRecord(value, name);
  requireNumber(point.x, `${name}.x`, -1000, 1000);
  requireNumber(point.y, `${name}.y`, -1000, 1000);
}

function requireVec3(value: unknown, name: string): asserts value is { x: number; y: number; z: number } {
  const point = requireRecord(value, name);
  requireNumber(point.x, `${name}.x`, -1000, 1000);
  requireNumber(point.y, `${name}.y`, -1000, 1000);
  requireNumber(point.z, `${name}.z`, -1000, 1000);
}

function requireUniqueIds(items: unknown[], name: string): void {
  const ids = new Set<string>();
  for (const item of items) {
    const id = requireRecord(item, name).id;
    requireText(id, `${name}.id`);
    if (ids.has(id)) throw new Error(`Duplicate scene ${name} id.`);
    ids.add(id);
  }
}

/** Throws a generic, non-data-bearing error when the scene is unsafe to render or persist. */
export function assertSpatialScene(value: unknown): asserts value is SpatialScene {
  const scene = requireRecord(value, 'root');
  const metadata = requireRecord(scene.metadata, 'metadata');
  requireText(metadata.id, 'metadata.id');
  requireText(metadata.roomId, 'metadata.roomId');
  requireNumber(metadata.version, 'metadata.version', 1, Number.MAX_SAFE_INTEGER);
  requireNumber(metadata.createdAt, 'metadata.createdAt', 0, Number.MAX_SAFE_INTEGER);
  requireNumber(metadata.updatedAt, 'metadata.updatedAt', 0, Number.MAX_SAFE_INTEGER);
  if (metadata.unit !== 'm') throw new Error('Scene dimensions must use meters.');

  const room = requireRecord(scene.room, 'room');
  requireNumber(room.width, 'room.width', 0.1, 100);
  requireNumber(room.depth, 'room.depth', 0.1, 100);
  requireNumber(room.ceiling, 'room.ceiling', 0.1, 20);
  if (!Array.isArray(room.walls) || room.walls.length > MAX_WALLS) throw new Error('Invalid scene walls.');
  if (!Array.isArray(room.openings) || room.openings.length > MAX_OPENINGS) throw new Error('Invalid scene openings.');
  requireUniqueIds(room.walls, 'wall');
  requireUniqueIds(room.openings, 'opening');
  const wallLengths = new Map<string, number>();
  for (const item of room.walls) {
    const wall = requireRecord(item, 'wall');
    requireVec2(wall.start, 'wall.start');
    requireVec2(wall.end, 'wall.end');
    requireNumber(wall.thickness, 'wall.thickness', 0.01, 2);
    const start = wall.start as { x: number; y: number };
    const end = wall.end as { x: number; y: number };
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    if (length < 0.05 || length > 500) throw new Error('Invalid scene wall length.');
    wallLengths.set(wall.id as string, length);
  }
  for (const item of room.openings) {
    const opening = requireRecord(item, 'opening');
    requireText(opening.wallId, 'opening.wallId');
    const wallLength = wallLengths.get(opening.wallId as string);
    if (wallLength === undefined) throw new Error('Scene opening references an unknown wall.');
    requireNumber(opening.offset, 'opening.offset', 0, wallLength);
    requireNumber(opening.width, 'opening.width', 0.05, Math.min(100, wallLength));
    requireNumber(opening.height, 'opening.height', 0.05, room.ceiling as number);
    requireNumber(opening.sillHeight, 'opening.sillHeight', 0, room.ceiling as number);
    if ((opening.sillHeight as number) + (opening.height as number) > (room.ceiling as number) + 1e-6) {
      throw new Error('Scene opening exceeds the room height.');
    }
    if (!['door', 'window', 'arch'].includes(String(opening.kind))) throw new Error('Invalid scene opening kind.');
  }

  if (!Array.isArray(scene.objects) || scene.objects.length > SECURITY_CONSTANTS.maxRoomObjects) throw new Error('Invalid scene objects.');
  requireUniqueIds(scene.objects, 'object');
  for (const item of scene.objects) {
    const object = requireRecord(item, 'object');
    requireText(object.type, 'object.type', 128);
    requireText(object.label, 'object.label', 512);
    if (typeof object.visible !== 'boolean' || typeof object.locked !== 'boolean') throw new Error('Invalid scene object flags.');
    const transform = requireRecord(object.transform, 'object.transform');
    requireVec3(transform.position, 'object.position');
    requireNumber(transform.rotationY, 'object.rotation', -Math.PI * 100, Math.PI * 100);
    const scale = requireRecord(transform.scale, 'object.scale');
    requireNumber(scale.x, 'object.scale.x', 0.001, 10);
    requireNumber(scale.y, 'object.scale.y', 0.001, 10);
    requireNumber(scale.z, 'object.scale.z', 0.001, 10);
    const size = requireRecord(object.size, 'object.size');
    requireNumber(size.width, 'object.width', 0.01, SECURITY_CONSTANTS.maxObjectDimensionM);
    requireNumber(size.height, 'object.height', 0.01, SECURITY_CONSTANTS.maxObjectDimensionM);
    requireNumber(size.depth, 'object.depth', 0.01, SECURITY_CONSTANTS.maxObjectDimensionM);
    if (object.selected !== undefined && typeof object.selected !== 'boolean') throw new Error('Invalid scene object selection.');
    if (object.metadata !== undefined) {
      const objectMetadata = requireRecord(object.metadata, 'object.metadata');
      if (Object.keys(objectMetadata).length > 64 || Object.entries(objectMetadata).some(([key, entry]) => key.length > 128 || !['string', 'number', 'boolean'].includes(typeof entry) || (typeof entry === 'number' && !Number.isFinite(entry)) || (typeof entry === 'string' && entry.length > 512))) {
        throw new Error('Invalid scene object metadata.');
      }
    }
  }

  if (!Array.isArray(scene.measurements) || scene.measurements.length > MAX_MEASUREMENTS) throw new Error('Invalid scene measurements.');
  requireUniqueIds(scene.measurements, 'measurement');
  for (const item of scene.measurements) {
    const measurement = requireRecord(item, 'measurement');
    if (!['distance', 'area', 'perimeter', 'angle', 'height'].includes(String(measurement.kind))) throw new Error('Invalid scene measurement kind.');
    requireVec3(measurement.a, 'measurement.start');
    if (measurement.b !== undefined) requireVec3(measurement.b, 'measurement.end');
    if (measurement.points !== undefined && (!Array.isArray(measurement.points) || measurement.points.length > 256)) throw new Error('Invalid scene measurement points.');
    for (const point of (measurement.points ?? []) as unknown[]) requireVec3(point, 'measurement.point');
    requireNumber(measurement.value, 'measurement.value', 0, 1_000_000);
    if (!['m', 'cm', 'ft', 'in', 'deg'].includes(String(measurement.unit))) throw new Error('Invalid scene measurement unit.');
    if (measurement.label !== undefined) requireText(measurement.label, 'measurement.label', 512);
    if (typeof measurement.visible !== 'boolean') throw new Error('Invalid scene measurement visibility.');
  }

  if (!Array.isArray(scene.materials) || scene.materials.length > MAX_MATERIALS) throw new Error('Invalid scene materials.');
  requireUniqueIds(scene.materials, 'material');
  for (const item of scene.materials) {
    const material = requireRecord(item, 'material');
    requireText(material.name, 'material.name', 256);
    requireText(material.color, 'material.color', 128);
    requireNumber(material.roughness, 'material.roughness', 0, 1);
    requireNumber(material.metalness, 'material.metalness', 0, 1);
    requireNumber(material.opacity, 'material.opacity', 0, 1);
    for (const key of ['textureUrl', 'normalUrl']) if (material[key] !== undefined) requireText(material[key], `material.${key}`, 2048);
  }

  const lighting = requireRecord(scene.lighting, 'lighting');
  requireText(lighting.id, 'lighting.id');
  requireText(lighting.name, 'lighting.name', 256);
  for (const key of ['ambient', 'keyIntensity', 'fillIntensity']) requireNumber(lighting[key], `lighting.${key}`, 0, 20);
  requireNumber(lighting.colorTemperature, 'lighting.colorTemperature', 1000, 20_000);
  requireNumber(lighting.sunAzimuth, 'lighting.sunAzimuth', -100, 100);
  requireNumber(lighting.sunElevation, 'lighting.sunElevation', -100, 100);
  if (typeof lighting.shadows !== 'boolean') throw new Error('Invalid scene lighting settings.');
}

export function serializeScene(scene: SpatialScene): string {
  assertSpatialScene(scene);
  const raw = JSON.stringify({ schema: VISUALIZATION_SCHEMA_VERSION, scene });
  if (raw.length > MAX_SCENE_CHARS) throw new Error('Scene is too large to persist.');
  return raw;
}

export function deserializeScene(raw: string): SpatialScene {
  const parsed: unknown = safeJsonParse(raw);
  if (raw.length > MAX_SCENE_CHARS) throw new Error('Scene is too large to load.');
  const envelope = isRecord(parsed) && Object.prototype.hasOwnProperty.call(parsed, 'scene') ? parsed : { schema: 1, scene: parsed };
  const schema = envelope.schema === undefined ? 1 : envelope.schema;
  if (typeof schema !== 'number' || !Number.isInteger(schema) || schema < 1 || schema > VISUALIZATION_SCHEMA_VERSION) {
    throw new Error('Unsupported visualization scene version.');
  }
  const scene = requireRecord(envelope.scene, 'root');
  if (!Array.isArray(scene.objects)) throw new Error('Invalid scene objects.');
  const migrated = migrateScene(scene as unknown as SpatialScene, schema);
  assertSpatialScene(migrated);
  return migrated;
}

export function migrateScene(scene: SpatialScene, schema: number): SpatialScene {
  if (!Number.isInteger(schema) || schema < 1 || schema > VISUALIZATION_SCHEMA_VERSION) throw new Error('Unsupported visualization scene version.');
  const cloned = JSON.parse(JSON.stringify(scene)) as SpatialScene;
  if (schema < 2) {
    if (!Array.isArray(cloned.objects)) throw new Error('Invalid scene objects.');
    cloned.objects = cloned.objects.map(object => {
      if (!object || typeof object !== 'object' || !object.transform || typeof object.transform !== 'object') throw new Error('Invalid legacy scene transform.');
      return { ...object, transform: { ...object.transform, scale: object.transform.scale ?? { x: 1, y: 1, z: 1 } } };
    });
  }
  if (schema < 3) {
    cloned.measurements = (Array.isArray(cloned.measurements) ? cloned.measurements : []).map(item => item && typeof item === 'object' ? { ...item, visible: item.visible ?? true } : item);
  }
  if (!cloned.metadata || typeof cloned.metadata !== 'object') throw new Error('Invalid scene metadata.');
  cloned.metadata = {
    ...cloned.metadata,
    version: Number.isFinite(cloned.metadata.version) && cloned.metadata.version >= 1 ? cloned.metadata.version : 1,
    updatedAt: Number.isFinite(cloned.metadata.updatedAt) && cloned.metadata.updatedAt >= 0 ? cloned.metadata.updatedAt : Date.now(),
  };
  return cloned;
}

export function safeCloneScene(scene: SpatialScene): SpatialScene {
  return deserializeScene(serializeScene(scene));
}
