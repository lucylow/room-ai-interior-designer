
export type Vec3 = { x:number; y:number; z:number };
export type Vec2 = { x:number; y:number };
export type Quaternion = { w:number; x:number; y:number; z:number };
export type Color = { r:number; g:number; b:number; a?:number };
export type CameraPose = { position:Vec3; rotation:Quaternion; fx:number; fy:number; cx:number; cy:number; width:number; height:number };
export type Gaussian = { id:string; mean:Vec3; scale:Vec3; rotation:Quaternion; opacity:number; color:Color; semantic?:string; confidence?:number; timestamp?:number; sourceFrame?:string; dynamic?:boolean; material?:string };
export type SplatScene = { id:string; gaussians:Gaussian[]; cameras:CameraPose[]; bounds:{min:Vec3; max:Vec3}; sourceRevision:string; metersPerUnit:number };
export type FrameRecord = { id:string; timestampMs:number; path:string; blur:number; exposure:number; sharpness:number; coverage:number; motion:number };
export type PoseCandidate = { frameId:string; pose:CameraPose; inliers:number; reprojectionError:number; confidence:number };
export type SpatialAnchor = { id:string; kind:'wall'|'door'|'window'|'floor'|'ceiling'|'object'|'bim'; position:Vec3; normal:Vec3; dimensions:Vec3; sourceId:string; tolerance:number };
export type EditRegion = { id:string; center:Vec3; radius:Vec3; labels:string[]; confidence:number };
export type RenderRequest = { camera:CameraPose; width:number; height:number; quality:'preview'|'balanced'|'high'|'ultra'; semantic?:string; maxGaussians?:number };
export type RenderResult = { pixels:number[]; depth:number[]; alpha:number[]; gaussianCount:number; elapsedMs:number; quality:number };
export type ReconstructionJob = { id:string; stage:string; progress:number; warnings:string[]; metrics:Record<string,number>; artifacts:string[] };
export type DatasetRecord = { id:string; split:'train'|'validation'|'test'|'challenge'; prompt:string; style:string; room:string; sourceRefs:string[]; labels:string[]; expectedSignals:Record<string,number> };
export type EditPlan = { id:string; kind:string; regionIds:string[]; actions:string[]; geometryLocked:boolean; risk:number; confidence:number };

export const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
export const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export const distance=(a:Vec3,b:Vec3)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
export const normalize=(v:Vec3):Vec3=>{const n=Math.hypot(v.x,v.y,v.z)||1;return {x:v.x/n,y:v.y/n,z:v.z/n}};
export const hashString=(s:string)=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
