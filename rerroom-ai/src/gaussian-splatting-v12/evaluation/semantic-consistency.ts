import { Gaussian } from '../core/types';
export function labelAgreement(a:Gaussian[],b:Gaussian[]){const map=new Map(b.map(g=>[g.id,g.semantic]));let match=0,total=0;for(const g of a){if(!map.has(g.id))continue;total++;if(g.semantic===map.get(g.id))match++}return match/(total||1)}
export function materialAgreement(a:Gaussian[],b:Gaussian[]){const map=new Map(b.map(g=>[g.id,g.material]));let match=0,total=0;for(const g of a){if(!map.has(g.id))continue;total++;if(g.material===map.get(g.id))match++}return match/(total||1)}
