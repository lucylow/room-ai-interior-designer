import type { Gaussian3D, SceneAnchor } from '../core/types';
import { vec3 } from '../math/vec3';
export interface AnchorConstraint {anchorId:string;maxDeviation:number;violations:string[];}
export function checkAnchorDrift(splats:Gaussian3D[],anchors:SceneAnchor[],maxDeviation=0.05):AnchorConstraint[]{return anchors.map(a=>{const linked=splats.filter(s=>s.anchorId===a.id);const violations=linked.filter(s=>vec3.distance(s.mean,a.position)>maxDeviation).map(s=>s.id);return {anchorId:a.id,maxDeviation,violations};});}
