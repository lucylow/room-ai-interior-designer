import type { Vec3 } from "../core/types";
import type { CameraPose, Detection, SpatialAnchor } from "../vision/types";

export type TwinNodeKind = "room" | "wall" | "floor" | "opening" | "furniture" | "surface" | "unknown";
export interface MeasurementEstimate { value: number; unit: "m"; confidence: number; source: "vision" | "depth" | "roomplan" | "cad-bim"; constructionGrade: false; disclaimer: string; }
export interface TwinNode { id: string; kind: TwinNodeKind; label: string; position: Vec3; size?: { width: number; depth: number; height: number }; confidence: number; observations: number; lastSeenMs: number; sourceIds: string[]; measurement?: MeasurementEstimate; }
export interface TwinRelation { from: string; to: string; type: "contains" | "adjacent" | "occludes" | "supports" | "anchors"; confidence: number; }
export interface RoomDigitalTwin { roomId: string; revision: number; nodes: TwinNode[]; relations: TwinRelation[]; anchors: SpatialAnchor[]; lastUpdatedMs: number; constructionGrade: false; measurementDisclaimer: string; }

const clamp = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
const centerOf = (detection: Detection, pose: CameraPose): Vec3 => ({ x: pose.position.x + detection.x / 100, y: pose.position.y + (detection.depthM ?? 1), z: pose.position.z + detection.y / 100 });

export class RoomDigitalTwinStore {
  private nodes = new Map<string, TwinNode>();
  private relations: TwinRelation[] = [];
  private revision = 0;
  private lastUpdatedMs = 0;
  constructor(private readonly roomId: string, private readonly staleAfterMs = 30_000) {}

  ingestFrame(input: { timestampMs: number; pose: CameraPose; detections: Detection[]; anchors?: SpatialAnchor[] }): RoomDigitalTwin {
    for (const [index, detection] of input.detections.entries()) {
      const id = detection.id ?? `${detection.label}-${index}`;
      const position = centerOf(detection, input.pose);
      const confidence = clamp(detection.score);
      const existing = this.nodes.get(id);
      if (!existing) this.nodes.set(id, { id, kind: "furniture", label: detection.label, position, size: { width: Math.max(0.01, detection.width / 100), depth: Math.max(0.01, detection.depthM ?? 0.5), height: Math.max(0.01, detection.height / 100) }, confidence, observations: 1, lastSeenMs: input.timestampMs, sourceIds: [input.timestampMs.toString()] });
      else {
        const blend = clamp(existing.confidence * 0.7 + confidence * 0.3);
        existing.position = { x: existing.position.x * 0.7 + position.x * 0.3, y: existing.position.y * 0.7 + position.y * 0.3, z: existing.position.z * 0.7 + position.z * 0.3 };
        existing.confidence = blend;
        existing.observations += 1;
        existing.lastSeenMs = input.timestampMs;
        if (!existing.sourceIds.includes(input.timestampMs.toString())) existing.sourceIds.push(input.timestampMs.toString());
      }
    }
    this.relations = this.relations.filter(relation => relation.type !== "occludes");
    for (const [index, detection] of input.detections.entries()) for (const other of input.detections.slice(index + 1)) if (detection.depthM !== undefined && other.depthM !== undefined && Math.abs(detection.depthM - other.depthM) > 0.1) this.relations.push({ from: detection.id ?? `${detection.label}-${index}`, to: other.id ?? other.label, type: "occludes", confidence: clamp(Math.abs(detection.depthM - other.depthM)) });
    this.revision += 1;
    this.lastUpdatedMs = input.timestampMs;
    return this.snapshot(input.anchors ?? []);
  }

  snapshot(anchors: SpatialAnchor[] = [], nowMs = this.lastUpdatedMs): RoomDigitalTwin {
    const nodes = [...this.nodes.values()].filter(node => nowMs - node.lastSeenMs <= this.staleAfterMs);
    return { roomId: this.roomId, revision: this.revision, nodes, relations: this.relations.filter(relation => nodes.some(node => node.id === relation.from) && nodes.some(node => node.id === relation.to)), anchors, lastUpdatedMs: this.lastUpdatedMs, constructionGrade: false, measurementDisclaimer: "Measurements are visual/depth estimates and require independent validation before construction or fabrication." };
  }
}
