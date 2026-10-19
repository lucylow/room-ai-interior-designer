import type { Vec3 } from '../core/types';

export const SH_C0 = 0.28209479177387814;
export const SH_C1 = 0.4886025119029199;

export function evalDegree0(coeffs:number[]):[number,number,number]{
  return [0.5 + SH_C0*(coeffs[0]||0),0.5 + SH_C0*(coeffs[1]||0),0.5 + SH_C0*(coeffs[2]||0)];
}

export function evalDegree1(coeffs:number[],dir:Vec3):[number,number,number]{
  const base=evalDegree0(coeffs); const x=dir[0],y=dir[1],z=dir[2];
  return [base[0]+SH_C1*(coeffs[3]||0)*x+SH_C1*(coeffs[6]||0)*y+SH_C1*(coeffs[9]||0)*z,
          base[1]+SH_C1*(coeffs[4]||0)*x+SH_C1*(coeffs[7]||0)*y+SH_C1*(coeffs[10]||0)*z,
          base[2]+SH_C1*(coeffs[5]||0)*x+SH_C1*(coeffs[8]||0)*y+SH_C1*(coeffs[11]||0)*z];
}

export function clampRgb(c:[number,number,number]):[number,number,number]{return c.map(v=>Math.max(0,Math.min(1,v))) as [number,number,number];}
export function viewDependentColor(coeffs:number[],dir:Vec3,degree:number){return clampRgb(degree<=0?evalDegree0(coeffs):evalDegree1(coeffs,dir));}
