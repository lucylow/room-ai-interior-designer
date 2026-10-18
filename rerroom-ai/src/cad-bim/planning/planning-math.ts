export interface Point2 { x:number; z:number; }
export interface Size2 { width:number; depth:number; }
export interface Bounds2 { min:Point2; max:Point2; }
export function distance(a:Point2,b:Point2):number{return Math.hypot(a.x-b.x,a.z-b.z);}
export function midpoint(a:Point2,b:Point2):Point2{return {x:(a.x+b.x)/2,z:(a.z+b.z)/2};}
export function clampPlanning(v:number,min:number,max:number):number{return Math.max(min,Math.min(max,v));}
export function lerp(a:number,b:number,t:number):number{return a+(b-a)*clampPlanning(t,0,1);}
export function bounds(points:Point2[]):Bounds2{
 let minX=Infinity,minZ=Infinity,maxX=-Infinity,maxZ=-Infinity;
 for(const p of points){minX=Math.min(minX,p.x);minZ=Math.min(minZ,p.z);maxX=Math.max(maxX,p.x);maxZ=Math.max(maxZ,p.z);}
 return {min:{x:Number.isFinite(minX)?minX:0,z:Number.isFinite(minZ)?minZ:0},max:{x:Number.isFinite(maxX)?maxX:0,z:Number.isFinite(maxZ)?maxZ:0}};
}
export function rectIntersects(a:Bounds2,b:Bounds2,padding=0):boolean{return a.min.x-b.max.x<padding&&b.min.x-a.max.x<padding&&a.min.z-b.max.z<padding&&b.min.z-a.max.z<padding;}
export function pointInRect(p:Point2,b:Bounds2):boolean{return p.x>=b.min.x&&p.x<=b.max.x&&p.z>=b.min.z&&p.z<=b.max.z;}
export function rectArea(b:Bounds2):number{return Math.max(0,b.max.x-b.min.x)*Math.max(0,b.max.z-b.min.z);}
export function rotatePointAround(p:Point2,c:Point2,angle:number):Point2{const s=Math.sin(angle),co=Math.cos(angle),x=p.x-c.x,z=p.z-c.z;return {x:c.x+x*co-z*s,z:c.z+x*s+z*co};}
