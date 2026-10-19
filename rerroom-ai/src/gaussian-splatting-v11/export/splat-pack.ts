import type { Gaussian3D } from '../core/types';
export interface PackedSplat {id:string;bytes:number;offset:number;}
export interface SplatPack {version:string;count:number;bytes:number;items:PackedSplat[];metadata:Record<string,string|number|boolean>;}
export function buildSplatPack(splats:Gaussian3D[]):SplatPack{const bytesPer=64;return {version:'rroom-3dgs-v11',count:splats.length,bytes:splats.length*bytesPer,items:splats.map((s,i)=>({id:s.id,bytes:bytesPer,offset:i*bytesPer})),metadata:{compression:'logical-demo',coordinateSystem:'meters-right-handed',shDegree:Math.max(0,...splats.map(s=>s.shDegree))}};}
