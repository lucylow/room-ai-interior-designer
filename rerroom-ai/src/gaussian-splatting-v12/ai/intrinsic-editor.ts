import { Gaussian } from '../core/types';
export type IntrinsicMap={id:string;albedo:number[];roughness:number;metallic:number;confidence:number};
export function decompose(g:Gaussian):IntrinsicMap{return{id:g.id,albedo:[g.color.r,g.color.g,g.color.b],roughness:Math.max(.05,1-g.opacity),metallic:g.material==='metal'?.8:0,confidence:g.confidence??.5}}
export function recolorIntrinsic(map:IntrinsicMap,color:number[],strength=.8):IntrinsicMap{return{...map,albedo:map.albedo.map((v,i)=>v*(1-strength)+color[i]*strength)}}
export function materialSwap(map:IntrinsicMap,roughness:number,metallic:number):IntrinsicMap{return{...map,roughness,metallic}}
