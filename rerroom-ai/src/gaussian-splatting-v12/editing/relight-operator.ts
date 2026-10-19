import { Gaussian } from '../core/types';
export type LightDelta={intensity:number;warmth:number;contrast:number};
export function relight(scene:Gaussian[],d:LightDelta){return scene.map(g=>{const warm=d.warmth*.15;const c={...g.color};const light=Math.max(.2,1+d.intensity*.25);return{...g,color:{r:Math.min(1,c.r*light*(1+warm)),g:Math.min(1,c.g*light),b:Math.min(1,c.b*light*(1-warm)),a:c.a}}})}
