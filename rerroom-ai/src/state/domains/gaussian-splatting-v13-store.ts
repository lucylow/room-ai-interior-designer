import { createExternalStore, type ExternalStore } from '../store';
import type { PipelineContext } from '../../gaussian-splatting-v13/core/pipeline-types';
import type { ReconstructionHealth } from '../../gaussian-splatting-v13/core/types';

/** Provenance link from a V13 scene and run back to the room and source model revision. */
export interface V13RunProvenance {
  roomId: string;
  sceneId: string;
  sceneRevision: string;
  sourceRevision: string;
  recordedAt: number;
}

export interface V13RoomPipelineRecord {
  provenance: V13RunProvenance;
  context: PipelineContext;
  health?: ReconstructionHealth;
  editBranchIds: string[];
}

export interface GaussianSplattingV13State {
  byRoomId: Record<string, V13RoomPipelineRecord>;
}

export const gaussianSplattingV13Store: ExternalStore<GaussianSplattingV13State> =
  createExternalStore({ byRoomId: {} });

/**
 * Store a V13 pipeline snapshot alongside the app's other domain stores.
 * sourceRevision is required so downstream CAD/BIM handoffs can reject stale alignment.
 */
export function recordV13RoomPipeline(
  record: Omit<V13RoomPipelineRecord, 'provenance'> & {
    provenance: Omit<V13RunProvenance, 'recordedAt'> & { recordedAt?: number };
  },
): void {
  if (!record.provenance.roomId || !record.provenance.sceneId || !record.provenance.sourceRevision) {
    throw new Error('V13 pipeline records require room, scene, and source revision provenance.');
  }
  if (record.context.sceneId !== record.provenance.sceneId) {
    throw new Error('V13 pipeline scene does not match its provenance scene.');
  }
  gaussianSplattingV13Store.setState((state) => ({
    ...state,
    byRoomId: {
      ...state.byRoomId,
      [record.provenance.roomId]: {
        ...record,
        provenance: { ...record.provenance, recordedAt: record.provenance.recordedAt ?? Date.now() },
        editBranchIds: [...new Set(record.editBranchIds)],
      },
    },
  }));
}

export function getV13RoomPipeline(roomId: string): V13RoomPipelineRecord | undefined {
  return gaussianSplattingV13Store.getSnapshot().byRoomId[roomId];
}

/** Clear only the V13 companion record; the room and its authoritative CAD/BIM model remain untouched. */
export function clearV13RoomPipeline(roomId: string): void {
  gaussianSplattingV13Store.setState((state) => {
    if (!(roomId in state.byRoomId)) return state;
    const byRoomId = { ...state.byRoomId };
    delete byRoomId[roomId];
    return { ...state, byRoomId };
  });
}
