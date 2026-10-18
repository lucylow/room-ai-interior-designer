
import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
export function creative_render_readiness(room:RoomContext,concept:DesignConcept):CreativeSignal{
 const score=clamp(.4+(concept.render.positivePrompt.length/400)+concept.render.negativePrompt.length*.03);
 return {id:'analysis-creative-render-readiness',label:'Estimate Prompt/Render Completeness',score,confidence:.72,source:'creative-analysis',explanation:'estimate prompt/render completeness'};
}
export function creative_render_readinessBatch(room:RoomContext,concepts:DesignConcept[]):CreativeSignal[]{return concepts.map(c=>creative_render_readiness(room,c));}
