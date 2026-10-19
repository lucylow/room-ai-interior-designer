import type { CameraPose, Vec3, Quat, CameraIntrinsics } from '../core/types';
import { quatConjugate, quatRotate } from './quat';
import { vec3 } from './vec3';

export function worldToCamera(position:Vec3, pose:CameraPose):Vec3 {
  return quatRotate(quatConjugate(pose.rotation), vec3.sub(position,pose.position));
}

export function cameraForward(pose:CameraPose):Vec3 { return quatRotate(pose.rotation,[0,0,1]); }
export function cameraUp(pose:CameraPose):Vec3 { return quatRotate(pose.rotation,[0,-1,0]); }
export function lookAt(position:Vec3,target:Vec3,up:Vec3=[0,1,0]):CameraPose {
  const z=vec3.normalize(vec3.sub(target,position));
  const x=vec3.normalize(vec3.cross(up,z));
  const y=vec3.cross(z,x);
  const trace=x[0]+y[1]+z[2];
  let q:Quat;
  if(trace>0){const s=Math.sqrt(trace+1)*2;q=[0.25*s,(y[2]-z[1])/s,(z[0]-x[2])/s,(x[1]-y[0])/s];}
  else {q=[1,0,0,0];}
  return {position,rotation:q};
}

export function defaultIntrinsics(width:number,height:number,fovYDeg=60):CameraIntrinsics {
  const fy=height/(2*Math.tan((fovYDeg*Math.PI/180)/2));
  return {fx:fy,fy,cx:width/2,cy:height/2,width,height,near:0.01,far:100};
}
