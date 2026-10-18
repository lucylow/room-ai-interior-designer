import type {Evidence,EvidenceKind} from './types';
import {clamp,weightedMean} from './math';
let counter=0;
export const makeEvidence=(kind:EvidenceKind,label:string,value:string,confidence:number,sourceId?:string,weight=1):Evidence=>({id:`ev-${++counter}-${kind}`,kind,label,value,confidence:clamp(confidence),sourceId,weight});
export const combineEvidence=(items:Evidence[]):number=>weightedMean(items.map(e=>({value:e.confidence,weight:e.weight??1})));
export const summarizeEvidence=(items:Evidence[]):string=>items.slice(0,3).map(e=>`${e.label}: ${e.value}`).join(' · ');
export const highQualityEvidence=(items:Evidence[],threshold=.6)=>items.filter(e=>e.confidence>=threshold);
