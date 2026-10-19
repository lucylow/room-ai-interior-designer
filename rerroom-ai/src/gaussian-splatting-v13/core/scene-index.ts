// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.

import {Gaussian,Scene,Vec3} from './types';
export type SceneIndexBucket={key:string;ids:string[]};
function key(v:number,size:number){return Math.floor(v/Math.max(.001,size));}
export function buildSpatialIndex(scene:Scene,cell=.75):SceneIndexBucket[]{const m=new Map<string,string[]>();for(const g of scene.gaussians){const k=`${key(g.mean.x,cell)}:${key(g.mean.y,cell)}:${key(g.mean.z,cell)}`;const a=m.get(k)||[];a.push(g.id);m.set(k,a);}return [...m].map(([key,ids])=>({key,ids}));}
export function queryRadius(scene:Scene,center:Vec3,radius:number):Gaussian[]{const r2=radius*radius;return scene.gaussians.filter(g=>{const dx=g.mean.x-center.x,dy=g.mean.y-center.y,dz=g.mean.z-center.z;return dx*dx+dy*dy+dz*dz<=r2;});}
export function nearestGaussian(scene:Scene,center:Vec3):Gaussian|undefined{let best:Gaussian|undefined;let d=Infinity;for(const g of scene.gaussians){const dx=g.mean.x-center.x,dy=g.mean.y-center.y,dz=g.mean.z-center.z;const x=dx*dx+dy*dy+dz*dz;if(x<d){d=x;best=g;}}return best;}
