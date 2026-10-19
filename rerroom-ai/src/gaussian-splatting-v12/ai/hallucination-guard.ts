import { Gaussian, SpatialAnchor } from '../core/types';
import { distance } from '../core/utils';
export type GuardFinding={type:'unsupported-object'|'geometry-conflict'|'low-confidence';message:string;severity:number};
export function check(gaussians:Gaussian[],anchors:SpatialAnchor[]):GuardFinding[]{const out:GuardFinding[]=[];for(const g of gaussians){if((g.confidence??1)<.2)out.push({type:'low-confidence',message:`${g.id} has low scene confidence`,severity:.8});for(const a of anchors){if(distance(g.mean,a.position)<Math.max(.05,a.tolerance)&&a.kind==='wall'&&g.semantic==='wall'&&Math.abs(g.scale.x-a.dimensions.x)>.2)out.push({type:'geometry-conflict',message:`${g.id} conflicts with ${a.id}`,severity:.9})}}return out}
export function safeToEdit(findings:GuardFinding[]){return findings.every(f=>f.severity<.8)}
