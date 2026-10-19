import { Gaussian, SpatialAnchor } from '../core/types';
import { distance } from '../core/utils';
export type MeasuredSpan={id:string;from:string;to:string;meters:number;confidence:number;source:'cad-bim'|'observed'};
export function measureAnchors(a:SpatialAnchor,b:SpatialAnchor):MeasuredSpan{return{id:`span-${a.id}-${b.id}`,from:a.id,to:b.id,meters:distance(a.position,b.position),confidence:Math.min(a.tolerance,b.tolerance)<.03?.95:.8,source:'cad-bim'}}
export function measureObserved(points:Gaussian[],id='observed-span'):MeasuredSpan{const a=points[0],b=points[points.length-1];if(!a||!b)return{id,from:'',to:'',meters:0,confidence:0,source:'observed'};return{id,from:a.id,to:b.id,meters:distance(a.mean,b.mean),confidence:points.reduce((s,g)=>s+(g.confidence??1),0)/points.length,source:'observed'}}
