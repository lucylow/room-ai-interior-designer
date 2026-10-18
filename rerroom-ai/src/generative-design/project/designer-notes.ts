import type {DesignConcept,DesignFeedback} from '../core/types';
export const buildDesignerNotes=(concepts:DesignConcept[],feedback:DesignFeedback[])=>({
 title:'Designer Notes',count:concepts.length,accepted:feedback.filter(x=>x.action==='accept').length,saved:feedback.filter(x=>x.action==='save').length,conceptIds:concepts.map(x=>x.id)
});
