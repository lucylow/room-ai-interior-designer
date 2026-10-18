import { AABB2, AABB3, Line2, Polygon2, Vec2, Vec3, Size3 } from './types';

export const v2 = (x=0,y=0): Vec2 => ({x,y});
export const v3 = (x=0,y=0,z=0): Vec3 => ({x,y,z});
export function add(a: Vec3, b: Vec3): Vec3 { return v3(a.x+b.x,a.y+b.y,a.z+b.z); }
export function sub(a: Vec3, b: Vec3): Vec3 { return v3(a.x-b.x,a.y-b.y,a.z-b.z); }
export function scale(a: Vec3, s:number): Vec3 { return v3(a.x*s,a.y*s,a.z*s); }
export function length2(a: Vec2): number { return Math.hypot(a.x,a.y); }
export function length3(a: Vec3): number { return Math.hypot(a.x,a.y,a.z); }
export function distance2(a:Vec2,b:Vec2):number { return Math.hypot(a.x-b.x,a.y-b.y); }
export function distance3(a:Vec3,b:Vec3):number { return Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z); }
export function dot2(a:Vec2,b:Vec2):number { return a.x*b.x+a.y*b.y; }
export function cross2(a:Vec2,b:Vec2):number { return a.x*b.y-a.y*b.x; }
export function rotate2(p:Vec2, angle:number, origin:Vec2=v2()):Vec2 {
  const c=Math.cos(angle),s=Math.sin(angle),x=p.x-origin.x,y=p.y-origin.y;
  return v2(origin.x+x*c-y*s, origin.y+x*s+y*c);
}
export function polygonArea(poly:Polygon2):number {
  let sum=0; const pts=poly.points;
  for(let i=0;i<pts.length;i++){ const a=pts[i],b=pts[(i+1)%pts.length]; sum += a.x*b.y-b.x*a.y; }
  return Math.abs(sum)/2;
}
export function polygonCentroid(poly:Polygon2):Vec2 {
  let x=0,y=0; const pts=poly.points; const areaSigned = signedPolygonArea(poly);
  if(Math.abs(areaSigned)<1e-9) return v2();
  for(let i=0;i<pts.length;i++){ const a=pts[i],b=pts[(i+1)%pts.length],f=a.x*b.y-b.x*a.y; x+=(a.x+b.x)*f; y+=(a.y+b.y)*f; }
  return v2(x/(6*areaSigned),y/(6*areaSigned));
}
export function signedPolygonArea(poly:Polygon2):number {
  let sum=0; for(let i=0;i<poly.points.length;i++){ const a=poly.points[i],b=poly.points[(i+1)%poly.points.length]; sum+=a.x*b.y-b.x*a.y; } return sum/2;
}
export function bounds2(points:Vec2[]):AABB2 {
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y); return {min:v2(Math.min(...xs),Math.min(...ys)),max:v2(Math.max(...xs),Math.max(...ys))};
}
export function bounds3(points:Vec3[]):AABB3 {
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y),zs=points.map(p=>p.z); return {min:v3(Math.min(...xs),Math.min(...ys),Math.min(...zs)),max:v3(Math.max(...xs),Math.max(...ys),Math.max(...zs))};
}
export function expandBounds3(b:AABB3,pad:number):AABB3 { return {min:v3(b.min.x-pad,b.min.y-pad,b.min.z-pad),max:v3(b.max.x+pad,b.max.y+pad,b.max.z+pad)}; }
export function lineDistance(point:Vec2,line:Line2):number {
  const ab={x:line.end.x-line.start.x,y:line.end.y-line.start.y}, ap={x:point.x-line.start.x,y:point.y-line.start.y};
  const denom=dot2(ab,ab); const t=denom?Math.max(0,Math.min(1,dot2(ap,ab)/denom)):0; return distance2(point,{x:line.start.x+ab.x*t,y:line.start.y+ab.y*t});
}
export function pointInPolygon(p:Vec2,poly:Polygon2):boolean {
  let inside=false; for(let i=0,j=poly.points.length-1;i<poly.points.length;j=i++){
    const a=poly.points[i],b=poly.points[j]; const hit=((a.y>p.y)!=(b.y>p.y))&&(p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y+Number.EPSILON)+a.x); if(hit) inside=!inside;
  } return inside;
}
export function rectanglePolygon(center:Vec2,size:Size3,rotation=0):Polygon2 {
  const hx=size.width/2,hy=size.depth/2; const pts=[v2(-hx,-hy),v2(hx,-hy),v2(hx,hy),v2(-hx,hy)].map(p=>rotate2(p,rotation)); return {points:pts.map(p=>v2(p.x+center.x,p.y+center.y))};
}
export function intersectsAABB(a:AABB3,b:AABB3):boolean { return a.min.x<=b.max.x&&a.max.x>=b.min.x&&a.min.y<=b.max.y&&a.max.y>=b.min.y&&a.min.z<=b.max.z&&a.max.z>=b.min.z; }
export function clamp(v:number,min:number,max:number):number { return Math.max(min,Math.min(max,v)); }
