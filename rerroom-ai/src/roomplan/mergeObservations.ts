import type { Vec3 } from "../core/types";
import type { Detection } from "../vision/types";
import type { RoomDigitalTwin } from "../spatial/digitalTwin";

export interface RoomPlanObservation { id: string; kind: "wall" | "floor" | "door" | "window" | "furniture"; label: string; position: Vec3; size?: { width: number; depth: number; height: number }; confidence: number; }
export interface MergeReport { twin: RoomDigitalTwin; added: number; updated: number; conflicts: string[]; measurementDisclaimer: string; }
const distance = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

export function mergeRoomPlanObservations(twin: RoomDigitalTwin, roomPlan: RoomPlanObservation[], vision: Detection[] = []): MergeReport {
  const nodes = [...twin.nodes];
  const conflicts: string[] = [];
  let added = 0, updated = 0;
  for (const observation of roomPlan) {
    const existing = nodes.find(node => node.id === observation.id || (node.kind === observation.kind && node.label === observation.label && distance(node.position, observation.position) < 0.5));
    if (!existing) { nodes.push({ id: observation.id, kind: observation.kind === "furniture" ? "furniture" : observation.kind === "door" || observation.kind === "window" ? "opening" : observation.kind, label: observation.label, position: observation.position, size: observation.size, confidence: observation.confidence, observations: 1, lastSeenMs: twin.lastUpdatedMs, sourceIds: [`roomplan:${observation.id}`] }); added += 1; }
    else { if (observation.size && existing.size && Math.abs(observation.size.width - existing.size.width) > 0.2) conflicts.push(`dimension-conflict:${existing.id}`); existing.confidence = Math.max(existing.confidence, observation.confidence); existing.sourceIds = [...new Set([...existing.sourceIds, `roomplan:${observation.id}`])]; updated += 1; }
  }
  for (const detection of vision) if (!nodes.some(node => node.label === detection.label && node.kind === "furniture")) conflicts.push(`vision-only:${detection.label}`);
  return { twin: { ...twin, revision: twin.revision + 1, nodes, lastUpdatedMs: Date.now() }, added, updated, conflicts, measurementDisclaimer: "RoomPlan and vision measurements are estimates. Validate independently before construction, fabrication, or safety-critical placement." };
}
