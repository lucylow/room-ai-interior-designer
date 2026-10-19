import { Gaussian, EditRegion } from '../core/types';
import { distance } from '../core/utils';
export function selectRegion(gaussians:Gaussian[],region:EditRegion){return gaussians.filter(g=>distance(g.mean,region.center)<=Math.max(region.radius.x,region.radius.y,region.radius.z)&&(!region.labels.length||region.labels.includes(g.semantic||'')))}
export function softSelection(gaussians:Gaussian[],region:EditRegion){return selectRegion(gaussians,region).map(g=>({gaussian:g,weight:Math.max(0,1-distance(g.mean,region.center)/Math.max(.001,Math.max(region.radius.x,region.radius.y,region.radius.z)))}))}
export function selectionSummary(items:Gaussian[]){return{count:items.length,opacityMean:items.reduce((s,g)=>s+g.opacity,0)/(items.length||1),semantic:[...new Set(items.map(g=>g.semantic||'unknown'))]}}
