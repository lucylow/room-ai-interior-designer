import type { Mat3, Vec3 } from '../core/types';

export function mat3Mul(a:Mat3,b:Mat3):Mat3 {
  return [a[0]*b[0]+a[1]*b[3]+a[2]*b[6],a[0]*b[1]+a[1]*b[4]+a[2]*b[7],a[0]*b[2]+a[1]*b[5]+a[2]*b[8],a[3]*b[0]+a[4]*b[3]+a[5]*b[6],a[3]*b[1]+a[4]*b[4]+a[5]*b[7],a[3]*b[2]+a[4]*b[5]+a[5]*b[8],a[6]*b[0]+a[7]*b[3]+a[8]*b[6],a[6]*b[1]+a[7]*b[4]+a[8]*b[7],a[6]*b[2]+a[7]*b[5]+a[8]*b[8]];
}

export function mat3Transpose(a:Mat3):Mat3 { return [a[0],a[3],a[6],a[1],a[4],a[7],a[2],a[5],a[8]]; }
export function mat3Vec(a:Mat3,v:Vec3):Vec3 { return [a[0]*v[0]+a[1]*v[1]+a[2]*v[2],a[3]*v[0]+a[4]*v[1]+a[5]*v[2],a[6]*v[0]+a[7]*v[1]+a[8]*v[2]]; }
export function mat3Diag(v:Vec3):Mat3 { return [v[0],0,0,0,v[1],0,0,0,v[2]]; }
export function mat3Det(a:Mat3):number { return a[0]*(a[4]*a[8]-a[5]*a[7])-a[1]*(a[3]*a[8]-a[5]*a[6])+a[2]*(a[3]*a[7]-a[4]*a[6]); }
export function mat3Inverse(a:Mat3):Mat3 {
  const d=mat3Det(a); if(Math.abs(d)<1e-9) throw new Error('Singular matrix');
  const id=1/d;
  return [(a[4]*a[8]-a[5]*a[7])*id,(a[2]*a[7]-a[1]*a[8])*id,(a[1]*a[5]-a[2]*a[4])*id,(a[5]*a[6]-a[3]*a[8])*id,(a[0]*a[8]-a[2]*a[6])*id,(a[2]*a[3]-a[0]*a[5])*id,(a[3]*a[7]-a[4]*a[6])*id,(a[1]*a[6]-a[0]*a[7])*id,(a[0]*a[4]-a[1]*a[3])*id];
}
