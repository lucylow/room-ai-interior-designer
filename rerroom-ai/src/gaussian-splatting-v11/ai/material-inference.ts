import type { Gaussian3D } from '../core/types';
const MATERIALS=['paint','wood','metal','stone','glass','textile','ceramic','plant'];
export function inferMaterial(g:Gaussian3D):string{if(g.materialClass)return g.materialClass;const seed=Math.abs(Math.floor((g.mean[0]*13+g.mean[1]*7+g.mean[2]*19)*100));return MATERIALS[seed%MATERIALS.length];}
export function enrichMaterials(splats:Gaussian3D[]):Gaussian3D[]{return splats.map(g=>({...g,materialClass:inferMaterial(g)}));}
