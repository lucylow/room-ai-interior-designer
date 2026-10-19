import { Gaussian, SpatialAnchor } from '../core/types';
import { distance } from '../core/utils';
export type SurfaceFit={anchorId:string;gaussianIds:string[];coverage:number;normalError:number};
export function fitWall(anchor:SpatialAnchor,gaussians:Gaussian[]):SurfaceFit{const inside=gaussians.filter(g=>distance(g.mean,anchor.position)<=Math.max(anchor.dimensions.x,anchor.dimensions.y)*.6 && (g.semantic==='wall'||g.semantic==='unknown'));const normalError=inside.reduce((s,g)=>s+Math.abs(g.mean.z-anchor.position.z),0)/(inside.length||1);return{anchorId:anchor.id,gaussianIds:inside.map(g=>g.id),coverage:Math.min(1,inside.length/50),normalError}}
