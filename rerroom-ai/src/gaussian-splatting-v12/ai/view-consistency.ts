import { Gaussian, CameraPose } from '../core/types';
import { projectApprox } from '../core/utils';
export type ViewCheck={cameraId:string;coverage:number;semanticStability:number;depthStability:number};
export function checkViews(gaussians:Gaussian[],cameras:CameraPose[]):ViewCheck[]{return cameras.map((camera,i)=>{const visible=gaussians.filter(g=>{const p=projectApprox(g.mean,camera);return p.x>=0&&p.x<camera.width&&p.y>=0&&p.y<camera.height&&p.z>0});const depthVar=visible.reduce((s,g)=>{const p=projectApprox(g.mean,camera);return s+p.z},0)/(visible.length||1);const stable=visible.filter(g=>(g.confidence??1)>.5).length/(visible.length||1);return{cameraId:`camera-${i}`,coverage:visible.length/(gaussians.length||1),semanticStability:stable,depthStability:1/(1+depthVar)}})}
