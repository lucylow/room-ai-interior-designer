import { describe, expect, it } from 'vitest';
import { SpatialIndex } from '../../visualization/core/spatial-index';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('spatial index', () => {
  it('indexes visible objects', () => {
    const index=new SpatialIndex();
    index.build(DEMO_ROOMS[0]);
    expect(index.size()).toBe(DEMO_ROOMS[0].objects.length);
  });
  it('queries nearby objects', () => {
    const scene=DEMO_ROOMS[0];
    const index=new SpatialIndex();
    index.build(scene);
    const id=index.queryRadius(scene.objects[0].transform.position,2)[0];
    expect(id).toBeTruthy();
  });
  it('removes objects', () => {
    const index=new SpatialIndex();
    index.build(DEMO_ROOMS[0]);
    index.remove(DEMO_ROOMS[0].objects[0].id);
    expect(index.size()).toBe(DEMO_ROOMS[0].objects.length-1);
  });
});
