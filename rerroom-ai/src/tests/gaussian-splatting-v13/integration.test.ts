import { describe, expect, it } from 'vitest';
import { makeV13DemoScene } from '../../gaussian-splatting-v13/demo/v13-demo-scene';
import { rasterizeReference } from '../../gaussian-splatting-v13/render/reference-rasterizer';
import { runV13 } from '../../gaussian-splatting-v13/pipeline/v13-orchestrator';
import {
  clearV13RoomPipeline,
  getV13RoomPipeline,
  recordV13RoomPipeline,
} from '../../state/domains/gaussian-splatting-v13-store';

describe('Gaussian Splatting V13 app integration', () => {
  it('runs the deterministic reference render and reports pipeline health', () => {
    const scene = makeV13DemoScene(96);
    const camera = scene.cameras[0];
    const request = { camera, width: 32, height: 24, quality: 'preview' as const, maxGaussians: 64 };
    const render = rasterizeReference(scene, request);
    const result = runV13(scene, request, 'test-v13-job');

    expect(render.rgba).toHaveLength(32 * 24 * 4);
    expect(result.context.stages).toHaveLength(10);
    expect(result.context.stages.every((stage) => stage.status === 'succeeded')).toBe(true);
    expect(result.health.overall).toBeGreaterThanOrEqual(0);
    expect(result.health.overall).toBeLessThanOrEqual(1);
  });

  it('stores room pipeline state with source revision provenance and protects CAD/BIM authority', () => {
    const scene = makeV13DemoScene(48);
    const request = {
      camera: scene.cameras[0], width: 16, height: 12,
      quality: 'preview' as const, maxGaussians: 32,
    };
    const result = runV13(scene, request, 'test-room-job');

    recordV13RoomPipeline({
      provenance: {
        roomId: 'room-1', sceneId: scene.id, sceneRevision: scene.revision,
        sourceRevision: 'cad-rev-7', recordedAt: 1234,
      },
      context: result.context,
      health: result.health,
      editBranchIds: ['branch-a', 'branch-a'],
    });

    expect(getV13RoomPipeline('room-1')?.provenance.sourceRevision).toBe('cad-rev-7');
    expect(getV13RoomPipeline('room-1')?.editBranchIds).toEqual(['branch-a']);
    expect(() => recordV13RoomPipeline({
      provenance: { roomId: 'room-1', sceneId: 'wrong-scene', sceneRevision: scene.revision, sourceRevision: 'cad-rev-7' },
      context: result.context,
      editBranchIds: [],
    })).toThrow('V13 pipeline scene does not match its provenance scene.');

    clearV13RoomPipeline('room-1');
    expect(getV13RoomPipeline('room-1')).toBeUndefined();
  });
});
