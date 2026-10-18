import { describe, expect, it } from 'vitest';
import { snapToGrid, snapPosition } from '../../visualization/core/snap';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('snapping', () => {
  it('snaps world points to the grid', () => {
    expect(snapToGrid({x:1.12,y:0,z:2.24},0.25)).toEqual({x:1,y:0,z:2.25});
  });
  it('chooses an available grid snap', () => {
    const scene = DEMO_ROOMS[0];
    const result = snapPosition(scene.objects[0],scene,{modes:['grid'],gridSize:0.25,wallDistance:0.2,objectDistance:0.3});
    expect(result.mode).toBe('grid');
  });
  it('returns none when no mode exists', () => {
    const scene = DEMO_ROOMS[0];
    const result = snapPosition(scene.objects[0],scene,{modes:['none'],gridSize:0.25,wallDistance:0.2,objectDistance:0.3});
    expect(result.mode).toBe('none');
  });
});
