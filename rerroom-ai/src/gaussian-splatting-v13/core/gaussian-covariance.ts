// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.

import {Gaussian,Vec3,Quat,Mat3} from './types';
import {quatNormalize,quatRotate} from './math';
export function rotationMatrix(q:Quat):Mat3{const n=quatNormalize(q);const {w,x,y,z}=n;return[1-2*(y*y+z*z),2*(x*y-w*z),2*(x*z+w*y),2*(x*y+w*z),1-2*(x*x+z*z),2*(y*z-w*x),2*(x*z-w*y),2*(y*z+w*x),1-2*(x*x+y*y)];}
export function covarianceFromGaussian(g:Gaussian):Mat3{const r=rotationMatrix(g.rotation);const sx=g.scale.x,sy=g.scale.y,sz=g.scale.z;const s=[sx*sx,sy*sy,sz*sz];const out:number[]=[];for(let row=0;row<3;row++)for(let col=0;col<3;col++){const a=row*3,c=col;out.push(r[a]*s[0]*r[c]+r[a+1]*s[1]*r[c+1]+r[a+2]*s[2]*r[c+2]);}return out as Mat3;}
export function principalScales(c:Mat3):Vec3{return{x:Math.sqrt(Math.max(0,c[0])),y:Math.sqrt(Math.max(0,c[4])),z:Math.sqrt(Math.max(0,c[8]))};}
export function gaussianVolume(g:Gaussian){return Math.max(0,8*Math.PI**1.5*g.scale.x*g.scale.y*g.scale.z);}
export function gaussianWorldRadius(g:Gaussian){return Math.max(g.scale.x,g.scale.y,g.scale.z)*3;}
export function transformedCenter(g:Gaussian,t:Vec3){return quatRotate(g.rotation,{x:g.mean.x+t.x,y:g.mean.y+t.y,z:g.mean.z+t.z});}
