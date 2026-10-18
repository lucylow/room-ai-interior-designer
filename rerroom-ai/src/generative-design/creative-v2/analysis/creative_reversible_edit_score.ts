
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_reversible_edit_score(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(concept.render.geometryLock?.95:.55);
 return {id:'analysis-creative-reversible-edit-score',label:'Estimate How Reversible A Concept Edit Is',score,confidence:.72,source:'creative-analysis',explanation:'estimate how reversible a concept edit is'};
}
export function creative_reversible_edit_scoreBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_reversible_edit_score(room,c));}
