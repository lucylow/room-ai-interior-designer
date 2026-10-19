import type { CameraFrame } from '../core/types';
import { vec3 } from '../math/vec3';

export interface OverlapScore {a:string;b:string;angular:number;distance:number;score:number;}
export function pairwiseOverlap(a:CameraFrame,b:CameraFrame):OverlapScore{
  const angular = a.pose && b.pose ? 1/(1+vec3.distance([a.pose.rotation[1],a.pose.rotation[2],a.pose.rotation[3]],[b.pose.rotation[1],b.pose.rotation[2],b.pose.rotation[3]])) : 0.2;
  const distance = a.pose && b.pose ? vec3.distance(a.pose.position,b.pose.position) : 0;
  const distanceScore = 1/(1+distance);
  return {a:a.id,b:b.id,angular,distance,score:0.65*angular+0.35*distanceScore};
}
export function coverageGraph(frames:CameraFrame[]):Map<string,OverlappingEdge[]> { const g=new Map<string,OverlappingEdge[]>(); for(const f of frames)g.set(f.id,[]); for(let i=0;i<frames.length;i++)for(let j=i+1;j<frames.length;j++){const s=pairwiseOverlap(frames[i],frames[j]); if(s.score>0.45){g.get(frames[i].id)!.push({to:frames[j].id,score:s.score});g.get(frames[j].id)!.push({to:frames[i].id,score:s.score});}} return g; }
export interface OverlappingEdge {to:string;score:number;}
