import type { Gaussian3D, SplatBounds } from '../core/types';
import { vec3 } from '../math/vec3';

export function calculateSplatBounds(splats:Gaussian3D[]):SplatBounds {
  if(splats.length===0)return {center:[0,0,0],radius:0,min:[0,0,0],max:[0,0,0]};
  let min:[number,number,number]=[Infinity,Infinity,Infinity]; let max:[number,number,number]=[-Infinity,-Infinity,-Infinity];
  for(const s of splats){const lo=vec3.sub(s.mean,s.scale),hi=vec3.add(s.mean,s.scale);min=vec3.min(min,lo);max=vec3.max(max,hi);}
  const center=vec3.mul(vec3.add(min,max),0.5); return {center,radius:vec3.distance(min,max)/2,min,max};
}

export function containsPoint(bounds:SplatBounds,p:[number,number,number]):boolean { return p[0]>=bounds.min[0]&&p[0]<=bounds.max[0]&&p[1]>=bounds.min[1]&&p[1]<=bounds.max[1]&&p[2]>=bounds.min[2]&&p[2]<=bounds.max[2]; }
