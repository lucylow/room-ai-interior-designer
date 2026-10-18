
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_client_readiness(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.45+concept.confidence*.3+concept.score*.25);
 return {id:'analysis-creative-client-readiness',label:'Estimate Side-By-Side Review Readiness',score,confidence:.72,source:'creative-analysis',explanation:'estimate side-by-side review readiness'};
}
export function creative_client_readinessBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_client_readiness(room,c));}
