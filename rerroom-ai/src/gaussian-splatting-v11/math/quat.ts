import type { Quat, Vec3 } from '../core/types';

export function quatNormalize(q: Quat): Quat {
  const l=Math.sqrt(q[0]**2+q[1]**2+q[2]**2+q[3]**2)||1;
  return [q[0]/l,q[1]/l,q[2]/l,q[3]/l];
}

export function quatMultiply(a: Quat,b: Quat): Quat {
  const [aw,ax,ay,az]=a,[bw,bx,by,bz]=b;
  return [aw*bw-ax*bx-ay*by-az*bz,aw*bx+ax*bw+ay*bz-az*by,aw*by-ax*bz+ay*bw+az*bx,aw*bz+ax*by-ay*bx+az*bw];
}

export function quatConjugate(q: Quat): Quat { return [q[0],-q[1],-q[2],-q[3]]; }

export function quatRotate(q0: Quat,v: Vec3): Vec3 {
  const q=quatNormalize(q0), p:Quat=[0,v[0],v[1],v[2]];
  const r=quatMultiply(quatMultiply(q,p),quatConjugate(q));
  return [r[1],r[2],r[3]];
}

export function quatToMatrix(q0: Quat): [number,number,number,number,number,number,number,number,number] {
  const q=quatNormalize(q0),[w,x,y,z]=q;
  return [1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w),2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w),2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)];
}

export function quatFromYawPitchRoll(yaw:number,pitch:number,roll:number):Quat {
  const cy=Math.cos(yaw/2),sy=Math.sin(yaw/2),cp=Math.cos(pitch/2),sp=Math.sin(pitch/2),cr=Math.cos(roll/2),sr=Math.sin(roll/2);
  return [cr*cp*cy+sr*sp*sy,sr*cp*cy-cr*sp*sy,cr*sp*cy+sr*cp*sy,cr*cp*sy-sr*sp*cy];
}
