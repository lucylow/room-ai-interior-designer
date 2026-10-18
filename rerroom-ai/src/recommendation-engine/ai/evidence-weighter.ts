import type {Evidence} from '../core/types';
import {clamp,round} from '../core/math';

const kindWeight:Record<Evidence['kind'],number>={measurement:1,object:.92,opening:.95,style:.78,preference:.9,budget:.95,history:.72,catalog:.75,rule:.65,model:.68,simulation:.98};
export const evidenceWeight=(e:Evidence):number=>round(clamp((e.weight??1)*kindWeight[e.kind]*e.confidence,0,1),4);
export const weighEvidence=(items:Evidence[]):Evidence[]=>items.map(e=>({...e,weight:evidenceWeight(e)}));
export const aggregateEvidence=(items:Evidence[]):number=>{if(!items.length)return 0;const total=items.reduce((s,e)=>s+evidenceWeight(e),0);return clamp(total/items.length,0,1);};
export const strongestEvidence=(items:Evidence[],limit=4):Evidence[]=>weighEvidence(items).sort((a,b)=>(b.weight??0)-(a.weight??0)).slice(0,limit);
