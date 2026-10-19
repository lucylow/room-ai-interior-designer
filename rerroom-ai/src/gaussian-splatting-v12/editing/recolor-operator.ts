import { Gaussian, EditRegion, Color } from '../core/types';
import { softSelection } from './gaussian-selection';
export function recolor(scene:Gaussian[],region:EditRegion,color:Color,strength=.8){const selected=softSelection(scene,region);const weights=new Map(selected.map(x=>[x.gaussian.id,x.weight]));return scene.map(g=>{const w=weights.get(g.id);if(w===undefined)return g;const t=Math.max(0,Math.min(1,w*strength));return{...g,color:{r:g.color.r*(1-t)+color.r*t,g:g.color.g*(1-t)+color.g*t,b:g.color.b*(1-t)+color.b*t,a:g.color.a},}})}
