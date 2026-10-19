import type { Gaussian3D, Vec3 } from '../core/types';
export class SpatialHash {
  private buckets=new Map<string,string[]>();
  constructor(private cell=0.25){}
  private key(p:Vec3){return `${Math.floor(p[0]/this.cell)}:${Math.floor(p[1]/this.cell)}:${Math.floor(p[2]/this.cell)}`;}
  clear(){this.buckets.clear();}
  insert(g:Gaussian3D){const k=this.key(g.mean);const list=this.buckets.get(k)||[];list.push(g.id);this.buckets.set(k,list);}
  insertAll(splats:Gaussian3D[]){this.clear();for(const s of splats)this.insert(s);}
  query(center:Vec3,radius:number):string[]{const out:string[]=[];const span=Math.ceil(radius/this.cell);const c=center.map(v=>Math.floor(v/this.cell)) as Vec3;for(let x=-span;x<=span;x++)for(let y=-span;y<=span;y++)for(let z=-span;z<=span;z++){out.push(...(this.buckets.get(`${c[0]+x}:${c[1]+y}:${c[2]+z}`)||[]));}return [...new Set(out)];}
}
