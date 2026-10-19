import { CameraPose } from '../core/types';
export type Reprojection={x:number;y:number;weight:number};
export function motionVector(a:CameraPose,b:CameraPose){return {x:b.position.x-a.position.x,y:b.position.y-a.position.y,z:b.position.z-a.position.z}}
export function reproject(pixel:{x:number;y:number},motion:{x:number;y:number;z:number},confidence:number):Reprojection{return{x:pixel.x+motion.x*20,y:pixel.y+motion.y*20,weight:Math.max(0,Math.min(1,confidence*Math.exp(-Math.abs(motion.z))))}}
export function disocclusionRisk(depth:number,motion:{x:number;y:number;z:number}){return Math.min(1,Math.abs(motion.x)+Math.abs(motion.y)+Math.abs(motion.z)*2>Math.max(.02,depth*.01)?1:.1)}
