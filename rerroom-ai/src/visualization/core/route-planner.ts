import type { SpatialScene, Vec2 } from './types';
import { dist2 } from './vec';
import { pointInPolygon } from './geometry';

export interface RouteNode {
  id: string;
  point: Vec2;
}

export interface RouteResult {
  points: Vec2[];
  distance: number;
  reachable: boolean;
}

export function planRoute(scene: SpatialScene, start: Vec2, end: Vec2, cell = 0.25): RouteResult {
  const cols = Math.max(1, Math.ceil(scene.room.width / cell));
  const rows = Math.max(1, Math.ceil(scene.room.depth / cell));
  const startCell = { x: Math.round(start.x/cell), y: Math.round(start.y/cell) };
  const endCell = { x: Math.round(end.x/cell), y: Math.round(end.y/cell) };
  const queue: Array<{ x:number; y:number; prev?: string }> = [{ ...startCell }];
  const visited = new Map<string, { x:number; y:number; prev?: string }>();
  const key = (x:number,y:number) => `${x}:${y}`;
  visited.set(key(startCell.x,startCell.y), {...startCell});
  const directions = [[1,0],[-1,0],[0,1],[0,-1]] as const;

  while (queue.length) {
    const current = queue.shift()!;
    if (current.x === endCell.x && current.y === endCell.y) break;
    for (const [dx,dy] of directions) {
      const nx=current.x+dx, ny=current.y+dy;
      if(nx<0 || ny<0 || nx>cols || ny>rows) continue;
      const k=key(nx,ny);
      if(visited.has(k)) continue;
      const point={x:nx*cell,y:ny*cell};
      const blocked = scene.objects.some(object => {
        const cx=object.transform.position.x, cz=object.transform.position.z;
        return object.visible && Math.abs(point.x-cx)<=object.size.width/2 && Math.abs(point.y-cz)<=object.size.depth/2;
      });
      if(blocked || pointInPolygon(point, [{x:0,y:0},{x:scene.room.width,y:0},{x:scene.room.width,y:scene.room.depth},{x:0,y:scene.room.depth}])===false) continue;
      const node={x:nx,y:ny,prev:key(current.x,current.y)};
      visited.set(k,node);
      queue.push(node);
    }
  }

  const endKey=key(endCell.x,endCell.y);
  if(!visited.has(endKey)) return {points:[],distance:0,reachable:false};
  const points:Vec2[]=[];
  let cursor: string | undefined=endKey;
  while(cursor){
    const node=visited.get(cursor);
    if(!node) break;
    points.push({x:node.x*cell,y:node.y*cell});
    cursor=node.prev;
  }
  points.reverse();
  let distance=0;
  for(let i=1;i<points.length;i+=1) distance+=dist2(points[i-1],points[i]);
  return {points,distance,reachable:true};
}
