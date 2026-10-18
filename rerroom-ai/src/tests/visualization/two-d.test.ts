import { describe, expect, it } from 'vitest';
import { createPlanProjection } from '../../visualization/two-d/projection';
import { buildPlanItems } from '../../visualization/two-d/layout';
import { hitTestScene } from '../../visualization/two-d/hit-testing';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('2D visualization', () => {
  it('round-trips projection coordinates', () => {
    const scene=DEMO_ROOMS[0];
    const projection=createPlanProjection({x:0,y:0,zoom:1,width:600,height:500,rotation:0},scene.room.width,scene.room.depth);
    const screen=projection.worldToScreen({x:2,y:1});
    const world=projection.screenToWorld(screen);
    expect(Math.abs(world.x-2)).toBeLessThan(0.0001);
    expect(Math.abs(world.y-1)).toBeLessThan(0.0001);
  });
  it('builds one plan item per visible object', () => {
    const scene=DEMO_ROOMS[0];
    expect(buildPlanItems(scene).length).toBe(scene.objects.filter(item=>item.visible).length);
  });
  it('hits an object center', () => {
    const scene=DEMO_ROOMS[0];
    const object=scene.objects[0];
    expect(hitTestScene(scene,{x:object.transform.position.x,y:object.transform.position.z})).toBeTruthy();
  });
});
