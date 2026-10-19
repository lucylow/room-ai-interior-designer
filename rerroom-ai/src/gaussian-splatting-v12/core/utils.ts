
import { Vec3, CameraPose, Gaussian, clamp, hashString } from './types';
export { clamp, distance, normalize, hashString } from './types';

export const vec3=(x=0,y=0,z=0):Vec3=>({x,y,z});
export const add=(a:Vec3,b:Vec3):Vec3=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z});
export const sub=(a:Vec3,b:Vec3):Vec3=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
export const scale=(a:Vec3,s:number):Vec3=>({x:a.x*s,y:a.y*s,z:a.z*s});
export const dot=(a:Vec3,b:Vec3)=>a.x*b.x+a.y*b.y+a.z*b.z;
export const cross=(a:Vec3,b:Vec3):Vec3=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
export const midpoint=(a:Vec3,b:Vec3)=>scale(add(a,b),0.5);
export const boundsOf=(points:Vec3[])=>{
  const min={x:Infinity,y:Infinity,z:Infinity},max={x:-Infinity,y:-Infinity,z:-Infinity};
  for(const p of points){min.x=Math.min(min.x,p.x);min.y=Math.min(min.y,p.y);min.z=Math.min(min.z,p.z);max.x=Math.max(max.x,p.x);max.y=Math.max(max.y,p.y);max.z=Math.max(max.z,p.z)}
  return {min,max};
};
export const seeded=(seed:number)=>{let x=(seed>>>0)||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296}};
export const gaussianSize=(g:Gaussian)=>Math.max(g.scale.x,g.scale.y,g.scale.z);
export const cameraForward=(_c:CameraPose):Vec3=>({x:0,y:0,z:-1});
export const projectApprox=(p:Vec3,c:CameraPose)=>{const z=Math.max(0.001,p.z-c.position.z);return {x:c.cx+c.fx*(p.x-c.position.x)/z,y:c.cy+c.fy*(p.y-c.position.y)/z,z}};
export const stableId=(prefix:string,value:string)=>`${prefix}-${hashString(value).toString(16).padStart(8,'0')}`;
export const movingAverage=(values:number[],window=5)=>values.map((_,i)=>{const a=values.slice(Math.max(0,i-window+1),i+1);return a.reduce((s,v)=>s+v,0)/a.length});
export const percentile=(values:number[],q:number)=>{if(!values.length)return 0;const a=[...values].sort((x,y)=>x-y);const i=clamp((a.length-1)*q,0,a.length-1);const lo=Math.floor(i),hi=Math.ceil(i);return lo===hi?a[lo]:a[lo]+(a[hi]-a[lo])*(i-lo)};
export const rms=(values:number[])=>Math.sqrt(values.reduce((s,v)=>s+v*v,0)/(values.length||1));
export const covariance=(xs:number[],ys:number[])=>{if(xs.length!==ys.length||!xs.length)return 0;const mx=xs.reduce((a,b)=>a+b,0)/xs.length,my=ys.reduce((a,b)=>a+b,0)/ys.length;return xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0)/(xs.length-1||1)};
