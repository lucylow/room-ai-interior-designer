import { RenderResult } from '../core/types';
export type NovelViewCase={id:string;reference:number[];render:RenderResult;mask:number[]};
export function mse(a:number[],b:number[]){const n=Math.min(a.length,b.length);if(!n)return 0;let s=0;for(let i=0;i<n;i++)s+=(a[i]-b[i])**2;return s/n}
export function psnr(a:number[],b:number[]){const m=mse(a,b);return m===0?99:10*Math.log10(1/m)}
export function maskedScore(c:NovelViewCase){const n=Math.min(c.reference.length,c.render.pixels.length,c.mask.length);let s=0,w=0;for(let i=0;i<n;i++){if(!c.mask[i])continue;s+=(c.reference[i]-c.render.pixels[i])**2;w++}const err=s/(w||1);return err===0?99:10*Math.log10(1/err)}
