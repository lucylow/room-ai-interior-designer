import { describe, expect, it } from 'vitest';
import { makeObject, moveObject, rotateObject, resizeObject } from '../../visualization/core/scene';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('scene operations', () => {
  it('moves an object', () => {
    const scene = DEMO_ROOMS[0];
    const object = scene.objects[0];
    const next = moveObject(scene, object.id, {x:0.2,y:0,z:0.3});
    expect(next.objects.find(item=>item.id===object.id)?.transform.position.x).toBe(object.transform.position.x + 0.2);
  });
  it('does not move locked objects', () => {
    const scene = DEMO_ROOMS[0];
    const object = {...scene.objects[0], locked:true};
    const lockedScene = {...scene, objects:[object]};
    expect(moveObject(lockedScene, object.id, {x:1,y:0,z:1})).toEqual(lockedScene);
  });
  it('rotates an object', () => {
    const scene = DEMO_ROOMS[0];
    const next = rotateObject(scene, scene.objects[0].id, Math.PI/2);
    expect(next.objects[0].transform.rotationY).toBe(Math.PI/2);
  });
  it('resizes with positive bounds', () => {
    const scene = DEMO_ROOMS[0];
    const next = resizeObject(scene, scene.objects[0].id, 2, 1, 1.5);
    expect(next.objects[0].size.width).toBe(2);
  });
  it('rejects non-finite move and resize values without corrupting the scene', () => {
    const scene = DEMO_ROOMS[0];
    expect(moveObject(scene, scene.objects[0].id, {x:Number.POSITIVE_INFINITY,y:0,z:0})).toBe(scene);
    expect(resizeObject(scene, scene.objects[0].id, Number.NaN, 1, 1)).toBe(scene);
  });
  it('clamps movement to the room and ceiling', () => {
    const scene = DEMO_ROOMS[0];
    const object = scene.objects[0];
    const next = moveObject(scene, object.id, {x:100,y:100,z:100});
    const moved = next.objects.find(item=>item.id===object.id)!;
    expect(moved.transform.position.x + moved.size.width / 2).toBeLessThanOrEqual(scene.room.width + 1e-8);
    expect(moved.transform.position.z + moved.size.depth / 2).toBeLessThanOrEqual(scene.room.depth + 1e-8);
    expect(moved.transform.position.y + moved.size.height / 2).toBeLessThanOrEqual(scene.room.ceiling + 1e-8);
  });
  it('creates object defaults', () => {
    const item = makeObject({id:'x',type:'chair',label:'Chair'});
    expect(item.visible).toBe(true);
    expect(item.transform.scale.x).toBe(1);
  });
});
