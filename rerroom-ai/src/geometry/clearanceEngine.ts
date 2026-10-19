export interface Object3D { id: string; label: string; center: { x: number; y: number; z: number }; size: { width: number; depth: number; height: number }; yaw: number; }
export interface ClearanceResult { objectId: string; minimumClearance: number; blocked: boolean; blockingObjects: string[]; directional: { front: number; back: number; left: number; right: number }; confidence: number; warnings: string[]; }
type Axis = { x: number; z: number };
const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const dot = (a: Axis, b: Axis) => a.x * b.x + a.z * b.z;
const axesFor = (yaw: number): [Axis, Axis] => [{ x: Math.cos(yaw), z: Math.sin(yaw) }, { x: -Math.sin(yaw), z: Math.cos(yaw) }];
const extent = (object: Object3D, axis: Axis) => { const [localX, localZ] = axesFor(object.yaw); return Math.abs(dot(axis, localX)) * object.size.width / 2 + Math.abs(dot(axis, localZ)) * object.size.depth / 2; };
const centerDistance = (a: Object3D, b: Object3D, axis: Axis) => Math.abs((b.center.x - a.center.x) * axis.x + (b.center.z - a.center.z) * axis.z);

export function calculateClearance(target: Object3D, objects: Object3D[], minimumRequired = 0.6): ClearanceResult {
  const targetAxes = axesFor(target.yaw);
  const directions: Record<keyof ClearanceResult["directional"], Axis> = { front: targetAxes[0], back: { x: -targetAxes[0].x, z: -targetAxes[0].z }, left: targetAxes[1], right: { x: -targetAxes[1].x, z: -targetAxes[1].z } };
  const directional = { front: Number.POSITIVE_INFINITY, back: Number.POSITIVE_INFINITY, left: Number.POSITIVE_INFINITY, right: Number.POSITIVE_INFINITY };
  const blockers: string[] = [];
  let minimumClearance = Number.POSITIVE_INFINITY;
  for (const object of objects) {
    if (object.id === target.id) continue;
    const candidateAxes = [...targetAxes, ...axesFor(object.yaw)];
    const separations = candidateAxes.map(axis => centerDistance(target, object, axis) - extent(target, axis) - extent(object, axis));
    const gap = Math.max(0, Math.max(...separations));
    const overlap = separations.every(value => value < 0);
    minimumClearance = Math.min(minimumClearance, overlap ? 0 : gap);
    if (overlap || gap < minimumRequired) blockers.push(object.id);
    for (const [direction, axis] of Object.entries(directions) as Array<[keyof typeof directional, Axis]>) {
      const signed = (object.center.x - target.center.x) * axis.x + (object.center.z - target.center.z) * axis.z;
      if (signed > 0) directional[direction] = Math.min(directional[direction], Math.max(0, signed - extent(target, axis) - extent(object, axis)));
    }
  }
  if (!Number.isFinite(minimumClearance)) minimumClearance = 10;
  for (const key of Object.keys(directional) as Array<keyof typeof directional>) if (!Number.isFinite(directional[key])) directional[key] = 10;
  const warnings = blockers.length ? [`${blockers.length} object(s) violate the ${minimumRequired}m clearance target`] : [];
  return { objectId: target.id, minimumClearance, blocked: blockers.length > 0, blockingObjects: blockers, directional, confidence: clamp(1 - blockers.length / Math.max(objects.length, 1)), warnings };
}
