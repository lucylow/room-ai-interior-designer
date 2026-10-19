import type { Vec3 } from '../core/types';
export interface Plane {normal:Vec3;offset:number;rmse:number;}
export function fitHorizontalPlane(points:Vec3[]):Plane{if(!points.length)return {normal:[0,1,0],offset:0,rmse:0};const y=points.reduce((a,p)=>a+p[1],0)/points.length;const rmse=Math.sqrt(points.reduce((a,p)=>a+(p[1]-y)**2,0)/points.length);return {normal:[0,1,0],offset:y,rmse};}
