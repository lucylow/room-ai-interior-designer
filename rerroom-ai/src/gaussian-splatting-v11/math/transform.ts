import type { Mat4, Vec3 } from '../core/types';
import { vec3 } from './vec3';

export function identity4():Mat4{return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];}
export function translate4(t:Vec3):Mat4{return [1,0,0,t[0],0,1,0,t[1],0,0,1,t[2],0,0,0,1];}
export function scale4(s:Vec3):Mat4{return [s[0],0,0,0,0,s[1],0,0,0,0,s[2],0,0,0,0,1];}
export function transformPoint(m:Mat4,p:Vec3):Vec3{const w=m[12]*p[0]+m[13]*p[1]+m[14]*p[2]+m[15];const q=[m[0]*p[0]+m[1]*p[1]+m[2]*p[2]+m[3],m[4]*p[0]+m[5]*p[1]+m[6]*p[2]+m[7],m[8]*p[0]+m[9]*p[1]+m[10]*p[2]+m[11]] as Vec3;return w===0?q:vec3.mul(q,1/w);}
export function compose(a:Mat4,b:Mat4):Mat4{const out:number[]=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++)out.push(a[r*4]*b[c]+a[r*4+1]*b[c+4]+a[r*4+2]*b[c+8]+a[r*4+3]*b[c+12]);return out as Mat4;}
