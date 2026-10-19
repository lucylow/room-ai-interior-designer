import { Gaussian, EditRegion } from '../core/types';
import { softSelection } from './gaussian-selection';
export function replaceMaterial(scene:Gaussian[],region:EditRegion,material:string,roughnessDelta=0){const ids=new Set(softSelection(scene,region).map(x=>x.gaussian.id));return scene.map(g=>ids.has(g.id)?{...g,material,scale:{x:g.scale.x*(1+roughnessDelta*.05),y:g.scale.y*(1+roughnessDelta*.05),z:g.scale.z*(1+roughnessDelta*.05)}}:g)}
