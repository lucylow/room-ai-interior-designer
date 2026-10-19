import { Gaussian, EditRegion } from '../core/types';
import { selectRegion } from './gaussian-selection';
export function deleteRegion(scene:Gaussian[],region:EditRegion,fade=.1){const targets=new Set(selectRegion(scene,region).map(g=>g.id));return scene.map(g=>targets.has(g.id)?{...g,opacity:g.opacity*(1-fade),confidence:Math.max(0,(g.confidence??1)-.1)}:g)}
export function tombstoneIds(scene:Gaussian[],region:EditRegion){return selectRegion(scene,region).map(g=>g.id)}
