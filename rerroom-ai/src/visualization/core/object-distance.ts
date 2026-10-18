import type { SceneObject, Vec2, Vec3 } from './types';
import { objectPlanCenter } from './transform';

export function objectToPointDistance(object:SceneObject, point:Vec2):number{
  const center=objectPlanCenter(object);
  return Math.hypot(center.x-point.x,center.y-point.y);
}

export function sortByDistance2D(objects:SceneObject[],point:Vec2):SceneObject[]{
  return [...objects].sort((a,b)=>objectToPointDistance(a,point)-objectToPointDistance(b,point));
}

export function verticalDistance(object:SceneObject, height:number):number{
  return Math.abs(object.transform.position.y-height);
}

export function sceneObjectCentroid(objects:SceneObject[]):Vec3{
  if(!objects.length) return {x:0,y:0,z:0};
  const sum=objects.reduce((acc,object)=>({
    x:acc.x+object.transform.position.x,
    y:acc.y+object.transform.position.y,
    z:acc.z+object.transform.position.z,
  }),{x:0,y:0,z:0});
  return {x:sum.x/objects.length,y:sum.y/objects.length,z:sum.z/objects.length};
}
