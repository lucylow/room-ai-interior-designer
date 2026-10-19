import type { CameraIntrinsics, CameraPose, Gaussian3D, Mat3, ProjectedSplat, Vec3 } from '../core/types';
import { worldToCamera } from './camera';
import { covarianceFromGaussian, regularizeCovariance } from './covariance';
import { mat3Vec } from './mat3';

function projectPoint(p:Vec3,K:CameraIntrinsics){return [K.fx*p[0]/p[2]+K.cx,K.fy*p[1]/p[2]+K.cy] as [number,number];}

function projectCovariance(c:Mat3,p:Vec3,K:CameraIntrinsics):[number,number,number] {
  const z=Math.max(1e-4,p[2]), x=p[0],y=p[1];
  const J:Mat3=[K.fx/z,0,-K.fx*x/(z*z),0,K.fy/z,-K.fy*y/(z*z),0,0,0];
  const A=[c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8]] as Mat3;
  const JA:Mat3=[J[0]*A[0]+J[1]*A[3]+J[2]*A[6],J[0]*A[1]+J[1]*A[4]+J[2]*A[7],J[0]*A[2]+J[1]*A[5]+J[2]*A[8],J[3]*A[0]+J[4]*A[3]+J[5]*A[6],J[3]*A[1]+J[4]*A[4]+J[5]*A[7],J[3]*A[2]+J[4]*A[5]+J[5]*A[8],0,0,0];
  const JT=[J[0],J[3],J[6],J[1],J[4],J[7],J[2],J[5],J[8]] as Mat3;
  const C:[number,number,number]=[JA[0]*JT[0]+JA[1]*JT[3]+JA[2]*JT[6],JA[0]*JT[1]+JA[1]*JT[4]+JA[2]*JT[7],JA[3]*JT[0]+JA[4]*JT[3]+JA[5]*JT[6]];
  return C;
}

function sh0ToRgb(sh:number[]):[number,number,number] {
  const c=0.28209479177387814;
  return [Math.max(0,Math.min(1,0.5+c*(sh[0]||0))),Math.max(0,Math.min(1,0.5+c*(sh[1]||0))),Math.max(0,Math.min(1,0.5+c*(sh[2]||0)))];
}

export function projectGaussian(g:Gaussian3D,pose:CameraPose,K:CameraIntrinsics,tileSize=16):ProjectedSplat|null {
  const pc=worldToCamera(g.mean,pose); if(pc[2]<=K.near||pc[2]>=K.far) return null;
  const uv=projectPoint(pc,K); const c=projectCovariance(regularizeCovariance(covarianceFromGaussian(g)),pc,K);
  const a=Math.max(c[0],1e-6),b=c[1],d=Math.max(c[2],1e-6); const det=Math.max(1e-8,a*d-b*b);
  const trace=a+d,disc=Math.sqrt(Math.max(0,trace*trace-4*det));
  const lambda=Math.max((trace+disc)/2,1e-6); const radius=Math.min(96,3*Math.sqrt(lambda));
  return {id:g.id,center:uv,depth:pc[2],radiusPx:radius,conic:[d/det,-b/det,a/det],opacity:g.opacity,color:sh0ToRgb(g.sh),semanticLabel:g.semanticLabel,confidence:g.confidence,tileX:Math.floor(uv[0]/tileSize),tileY:Math.floor(uv[1]/tileSize)};
}
