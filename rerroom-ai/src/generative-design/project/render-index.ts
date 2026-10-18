import type {DesignConcept,DesignFeedback} from '../core/types';
export const buildRenderIndex=(concepts:DesignConcept[],feedback:DesignFeedback[])=>({
 title:'Render Index',count:concepts.length,accepted:feedback.filter(x=>x.action==='accept').length,saved:feedback.filter(x=>x.action==='save').length,conceptIds:concepts.map(x=>x.id)
});
