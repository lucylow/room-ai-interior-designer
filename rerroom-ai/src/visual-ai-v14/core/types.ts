export type Vec2 = { x:number; y:number };
export type Vec3 = { x:number; y:number; z:number };
export type Color = { r:number; g:number; b:number; a?:number };
export type RectTwoD = { x:number; y:number; width:number; height:number };
export type AABBThreeD = { min:Vec3; max:Vec3 };
export type Score = { value:number; confidence:number; reasons:string[] };
export type VisualStyle = 'modern'|'minimalist'|'scandinavian'|'industrial'|'japandi'|'mid-century'|'organic-modern'|'contemporary'|'warm-minimal'|'eclectic-modern';
export type RoomType = 'living-room'|'bedroom'|'kitchen'|'bathroom'|'dining'|'office'|'entryway'|'nursery';
export type VisualSampleKind = 'photo'|'video-frame'|'floorplan-2d'|'render-3d'|'splat-view'|'cad-overlay'|'bim-overlay';
export interface VisualAsset { id:string; kind:VisualSampleKind; width:number; height:number; sourceUri?:string; roomId:string; style?:VisualStyle; };
export interface CameraState { position:Vec3; target:Vec3; up:Vec3; fov:number; near:number; far:number; aspect:number; };
export interface Splat { id:string; mean:Vec3; scale:Vec3; opacity:number; color:Color; semantic?:string; material?:string; confidence:number; };
export interface FloorplanSegment { id:string; a:Vec2; b:Vec2; class:'wall'|'door'|'window'|'furniture'|'boundary'; confidence:number; };
export interface FurnitureTwoD { id:string; role:string; center:Vec2; size:{w:number;d:number}; rotation:number; style?:VisualStyle; };
export interface SceneTwoD { id:string; width:number; height:number; segments:FloorplanSegment[]; furniture:FurnitureTwoD[]; };
export interface SceneThreeD { id:string; bounds:AABBThreeD; splats:Splat[]; camera:CameraState; semanticLabels:Record<string,number>; };
export interface DatasetRecord { id:string; sample:VisualAsset; prompt:string; scene2d?:SceneTwoD; scene3d?:SceneThreeD; labels:string[]; quality:number; split:'train'|'validation'|'test'|'challenge'; metadata:Record<string,string|number|boolean>; };
export interface VisualInsight { id:string; title:string; message:string; severity:'info'|'warning'|'critical'; confidence:number; evidence:string[]; };
export interface VisualMetrics { sharpness:number; composition:number; geometry:number; lighting:number; material:number; consistency:number; overall:number; };
export interface VisualPatch { id:string; target:string; operation:'move'|'rotate'|'recolor'|'rematerialize'|'relight'|'mask'|'hide'|'show'; before:string; after:string; confidence:number; };
export function clamp(v:number,min=0,max=1){ return Math.max(min,max===undefined?v:Math.min(max,v)); }
export function distance2(a:Vec2,b:Vec2){ const dx=a.x-b.x,dy=a.y-b.y; return Math.hypot(dx,dy); }
export function distance3(a:Vec3,b:Vec3){ const dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z; return Math.hypot(dx,dy,dz); }
export function avg(xs:number[]){ return xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:0; }

export interface RGBAFrame { width:number; height:number; data:Uint8ClampedArray; }
