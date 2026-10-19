import type { Vec3 } from '../core/types';

export const vec3 = {
  add(a: Vec3, b: Vec3): Vec3 { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; },
  sub(a: Vec3, b: Vec3): Vec3 { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; },
  mul(a: Vec3, s: number): Vec3 { return [a[0]*s, a[1]*s, a[2]*s]; },
  dot(a: Vec3, b: Vec3): number { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; },
  cross(a: Vec3, b: Vec3): Vec3 { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; },
  len(a: Vec3): number { return Math.sqrt(a[0]**2+a[1]**2+a[2]**2); },
  normalize(a: Vec3): Vec3 { const l=Math.max(this.len(a),1e-9); return [a[0]/l,a[1]/l,a[2]/l]; },
  distance(a: Vec3,b: Vec3): number { return this.len(this.sub(a,b)); },
  lerp(a:Vec3,b:Vec3,t:number):Vec3 { return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]; },
  min(a:Vec3,b:Vec3):Vec3 { return [Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.min(a[2],b[2])]; },
  max(a:Vec3,b:Vec3):Vec3 { return [Math.max(a[0],b[0]),Math.max(a[1],b[1]),Math.max(a[2],b[2])]; }
};
