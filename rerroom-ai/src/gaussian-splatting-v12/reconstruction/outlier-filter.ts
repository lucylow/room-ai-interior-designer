import { Gaussian } from '../core/types';
import { distance } from '../core/utils';
export type OutlierReason='low-opacity'|'large-scale'|'isolated'|'low-confidence';
export type Outlier={id:string;reason:OutlierReason;score:number};
export function neighborhoodDensity(target:Gaussian,all:Gaussian[],radius=0.3){let count=0;for(const g of all){if(g.id===target.id)continue;if(distance(g.mean,target.mean)<=radius)count++}return count/(Math.PI*Math.pow(radius,3)*4/3)}
export function detectOutliers(gaussians:Gaussian[]):Outlier[]{const densities=gaussians.map(g=>neighborhoodDensity(g,gaussians));const med=densities.slice().sort((a,b)=>a-b)[Math.floor(densities.length/2)]||1;return gaussians.flatMap((g,i)=>{const d=densities[i];let r:OutlierReason|undefined;if(g.opacity<.05)r='low-opacity';else if(Math.max(g.scale.x,g.scale.y,g.scale.z)>1)r='large-scale';else if(d<med*.2)r='isolated';else if((g.confidence??1)<.25)r='low-confidence';return r?[{id:g.id,reason:r,score:Math.min(1,1-d/(med||1))}]:[]})}
