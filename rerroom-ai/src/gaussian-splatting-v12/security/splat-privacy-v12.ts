import { Gaussian } from '../core/types';
export function scrub(gaussians:Gaussian[]){return gaussians.map(g=>({...g,sourceFrame:undefined}))}
export function stripSensitiveSemantics(gaussians:Gaussian[],blocked=['face','screen','document','license-plate']){return gaussians.map(g=>blocked.includes(g.semantic||'')?{...g,semantic:'privacy-redacted',confidence:0}:g)}
