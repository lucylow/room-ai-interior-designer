import { describe, expect, it } from 'vitest';
import { runVisualAIV14 } from '../../visual-ai-v14';
import { createFrame } from '../../visual-ai-v14/core/image-buffer';
import {
  clearVisualAIV14Revisions,
  getVisualAIV14Revisions,
  recordVisualAIV14Revision,
} from '../../state/domains/visual-ai-v14-store';

describe('Visual AI V14 integration', () => {
  it('generates seeded 2D/3D visual data, renders reference buffers, and passes its visual gate', () => {
    const result = runVisualAIV14(42);
    expect(result.dataset).toHaveLength(512);
    expect(result.room2d.furniture).toHaveLength(3);
    expect(result.room3d.splats).toHaveLength(4800);
    expect(result.render.planPixels).toBe(640 * 448 * 4);
    expect(result.render.splatPixels).toBe(640 * 448 * 4);
    expect(result.render.enhancedSharpness).toBeGreaterThan(result.render.planSharpness);
    expect(result.render.planConsistency).toBeGreaterThan(0.97);
    expect(result.gate.pass).toBe(true);
  });

  it('rejects invalid or excessive reference-buffer allocations before allocation', () => {
    expect(() => createFrame(0, 10)).toThrow('invalid_frame_dimensions');
    expect(() => createFrame(1.5, 10)).toThrow('invalid_frame_dimensions');
    expect(() => createFrame(5000, 4000)).toThrow('frame_pixel_limit_exceeded');
    expect(() => createFrame(1, 1, { r: Number.NaN, g: 0, b: 0 })).toThrow('invalid_frame_color');
  });

  it('stores visual QA beside a concept revision with source provenance', () => {
    const result = runVisualAIV14(7);
    const record = recordVisualAIV14Revision({
      roomId: 'room-v14', conceptRevisionId: 'concept-r3', sourceRevision: 'bim-r9',
      result, recordedAt: 2345,
    });
    expect(record.sourceRevision).toBe('bim-r9');
    expect(record.syntheticDatasetRecords).toBe(512);
    expect(getVisualAIV14Revisions('room-v14')).toHaveLength(1);
    expect(() => recordVisualAIV14Revision({
      roomId: 'room-v14', conceptRevisionId: '', sourceRevision: 'bim-r9', result,
    })).toThrow('Visual revision records require room, concept, and source revision identifiers.');
    clearVisualAIV14Revisions('room-v14');
    expect(getVisualAIV14Revisions('room-v14')).toEqual([]);
  });
});
