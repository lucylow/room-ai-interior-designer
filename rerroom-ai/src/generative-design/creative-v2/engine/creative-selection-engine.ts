
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp,stableSort} from '../../core/utils';

export interface SelectionPolicy {minConfidence:number;minScore:number;maxCandidates:number;preferNovelty:number;preferFit:number;}
export const defaultSelectionPolicy:SelectionPolicy={minConfidence:.5,minScore:.45,maxCandidates:8,preferNovelty:.22,preferFit:.62};
export function scoreCreativeConcept(room:RoomContext,concept:DesignConcept,signals:CreativeSignal[]):number{
 const signalScore=signals.reduce((sum,s)=>sum+s.score*s.confidence,0)/Math.max(1,signals.length);
 const fit=clamp((concept.score*.55+concept.confidence*.25+signalScore*.2));
 const scalePenalty=concept.furniture.some(f=>f.confidence<.5)?.08:0;
 return clamp(fit-scalePenalty);
}
export function selectCreativeConcepts(room:RoomContext,concepts:DesignConcept[],signals:CreativeSignal[],policy=defaultSelectionPolicy):DesignConcept[]{
 return stableSort(concepts.filter(c=>c.confidence>=policy.minConfidence),c=>scoreCreativeConcept(room,c,signals)).filter(c=>scoreCreativeConcept(room,c,signals)>=policy.minScore).slice(0,policy.maxCandidates);
}
export function selectionInsight(selected:DesignConcept[]):DesignInsight{
 const confidence=selected.length?selected.reduce((a,b)=>a+b.confidence,0)/selected.length:0;
 return {id:'creative-selection',kind:'style',title:'Creative option set',summary:`${selected.length} concepts survived the creative quality gates.`,confidence,metric:selected.length,unit:'concepts',evidence:selected.slice(0,5).map(x=>`${x.styleId}/${x.paletteId??'no-palette'}:${x.score.toFixed(2)}`),actions:['Compare the same room from the same camera','Refine only one variable at a time']};
}
