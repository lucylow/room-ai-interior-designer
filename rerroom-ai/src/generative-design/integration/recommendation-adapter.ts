import type {RecommendationSet,Recommendation} from '../../core/types';
import type {DesignConcept} from '../core/types';
export const conceptsToRecommendations=(concepts:DesignConcept[],base:RecommendationSet):RecommendationSet=>{
 const rows:Recommendation[]=concepts.map((c,_i)=>({id:`gen-${c.id}`,category:'style',title:c.title,summary:c.conceptText,rationale:`AI concept combines ${c.styleId} style cues, ${c.paletteId??'a coordinated palette'}, and reusable layout advice.`,score:c.score,confidence:c.confidence,effort:'moderate',estimatedCost:0,currency:'CAD',expectedImpact:c.score,evidence:c.evidence.map((x,j)=>({id:`${c.id}-ev-${j}`,kind:'model',label:'Generative design evidence',value:x,confidence:c.confidence,sourceId:c.id})),actions:[{type:'none',payload:{conceptId:c.id,geometryLock:c.render.geometryLock}}],tradeoffs:c.tradeoffs,alternatives:c.nextPrompts,tags:[c.styleId,c.paletteId??'palette'],createdAt:c.createdAt,modelVersion:'generative-design-1.0'}));
 return {...base,recommendations:[...rows,...base.recommendations].slice(0,Math.max(base.recommendations.length,rows.length,12)),engineVersion:`${base.engineVersion}+generative-design-1.0`};
};
