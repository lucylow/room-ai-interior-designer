import { describe, expect, it } from 'vitest';
import { collectCollisionIssues, checkPairCollision } from '../../visualization/core/collision';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('spatial collision', () => {
  it('finds boundary violations', () => {
    const scene = DEMO_ROOMS[0];
    const object = {...scene.objects[0], transform:{...scene.objects[0].transform, position:{x:-1,y:0,z:0}}};
    const next = {...scene, objects:[object]};
    expect(collectCollisionIssues(next).some(issue=>issue.code==='room-boundary')).toBe(true);
  });
  it('detects pair overlap', () => {
    const a = sceneObject('a',0.5,0.5);
    const b = sceneObject('b',0.55,0.55);
    expect(checkPairCollision(a,b)).toBe(true);
  });
  it('still reports overlapping objects when both are locked', () => {
    const a = {...sceneObject('locked-a',0.5,0.5), locked:true};
    const b = {...sceneObject('locked-b',0.55,0.55), locked:true};
    expect(checkPairCollision(a,b)).toBe(true);
  });
  it('ignores hidden objects', () => {
    const a = {...sceneObject('a',0.5,0.5), visible:false};
    const b = sceneObject('b',0.5,0.5);
    expect(checkPairCollision(a,b)).toBe(false);
  });
  it('does not report boundaries for hidden objects', () => {
    const object = {...sceneObject('hidden',100,100), visible:false};
    expect(collectCollisionIssues({...DEMO_ROOMS[0], objects:[object]})).toEqual([]);
  });
  it('measures clearance from the full door opening span', () => {
    const scene = DEMO_ROOMS[0];
    const opening = scene.room.openings.find(item=>item.kind==='door')!;
    const wall = scene.room.walls.find(item=>item.id===opening.wallId)!;
    const dx = wall.end.x-wall.start.x;
    const dy = wall.end.y-wall.start.y;
    const length = Math.hypot(dx,dy);
    const t = opening.offset/length;
    const center = {x:wall.start.x+dx*t,y:wall.start.y+dy*t};
    const blocker = {
      ...sceneObject('blocker',center.x+0.3,center.y+dy/length),
      size:{width:0.4,height:0.8,depth:0.4},
    };
    const issues = collectCollisionIssues({...scene,objects:[blocker]});
    expect(issues.some(issue=>issue.code==='door-clearance'&&issue.targetId===blocker.id)).toBe(true);
  });
});

function sceneObject(id:string,x:number,z:number) {
  return {
    id,type:'table',label:id,
    transform:{position:{x,y:0,z},rotationY:0,scale:{x:1,y:1,z:1}},
    size:{width:1,height:1,depth:1},visible:true,locked:false,
  };
}
