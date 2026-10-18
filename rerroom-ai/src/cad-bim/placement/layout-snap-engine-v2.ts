import { PlacementCandidate, LayoutPlan } from '../planning/types';

export type SnapMode='grid'|'edge'|'center'|'alignment'|'off';
export interface SnapConfig { mode:SnapMode; gridM:number; thresholdM:number; preserveY:boolean; }
export interface SnapResult { position:{x:number;y:number;z:number}; snapped:boolean; targetId?:string; axis?:'x'|'z'; distance:number; reason:string; }
function nearest(values:number[],target:number){ let best:number|undefined; let d=Infinity; for(const v of values){const nd=Math.abs(v-target); if(nd<d){d=nd;best=v;}} return {value:best,distance:d}; }
export function snapPlacement(position:{x:number;y:number;z:number},plan:LayoutPlan,config:SnapConfig):SnapResult{
 if(config.mode==='off') return {position,snapped:false,distance:0,reason:'Snapping disabled'};
 const points:number[]=[]; for(const p of plan.placements){points.push(p.position.x,p.position.x-.5,p.position.x+.5);}
 if(config.mode==='grid'){ const x=Math.round(position.x/config.gridM)*config.gridM,z=Math.round(position.z/config.gridM)*config.gridM; const d=Math.hypot(x-position.x,z-position.z); return d<=config.thresholdM?{position:{x,y:config.preserveY?position.y:0,z},snapped:true,distance:d,reason:'Grid snap'}:{position,snapped:false,distance:d,reason:'Outside snap threshold'}; }
 const nx=nearest(points,position.x); if(nx.value!==undefined&&nx.distance<=config.thresholdM) return {position:{x:nx.value,y:position.y,z:position.z},snapped:true,axis:'x',distance:nx.distance,reason:'Object alignment'};
 return {position,snapped:false,distance:nx.distance,reason:'No alignment target within threshold'};
}
