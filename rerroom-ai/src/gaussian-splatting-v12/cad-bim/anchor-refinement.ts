import { SpatialAnchor, Vec3 } from '../core/types';
import { distance, sub, add, scale } from '../core/utils';
export type AnchorObservation={anchorId:string;observed:Vec3;confidence:number};
export function refine(anchor:SpatialAnchor,obs:AnchorObservation):SpatialAnchor{const d=distance(anchor.position,obs.observed);const w=Math.max(.05,Math.min(.8,obs.confidence));return{...anchor,position:add(anchor.position,scale(sub(obs.observed,anchor.position),w)),tolerance:Math.max(anchor.tolerance,d*(1-w))}}
export function batchRefine(anchors:SpatialAnchor[],observations:AnchorObservation[]){const map=new Map(observations.map(o=>[o.anchorId,o]));return anchors.map(a=>map.has(a.id)?refine(a,map.get(a.id)!):a)}
