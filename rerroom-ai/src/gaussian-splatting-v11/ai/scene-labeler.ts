import type { Gaussian3D } from '../core/types';
const LABELS=['wall','floor','ceiling','door','window','sofa','chair','table','cabinet','plant','light','art','rug','counter','appliance'];
export function labelGaussian(g:Gaussian3D):string{if(g.semanticLabel)return g.semanticLabel;const [x,y,z]=g.mean;if(y<0.05)return 'floor';if(y>2.5)return 'ceiling';const idx=Math.abs(Math.floor((x*17+z*31)*10))%LABELS.length;return LABELS[idx];}
export function enrichSemantics(splats:Gaussian3D[]):Gaussian3D[]{return splats.map(g=>({...g,semanticLabel:labelGaussian(g),confidence:Math.min(1,g.confidence*1.05)}));}
