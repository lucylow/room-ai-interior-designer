import type {Recommendation,Insight} from '../../core/types';
export interface SelectionState{selectedRecommendationId?:string;selectedInsightId?:string;compareIds:string[];}
export const createSelectionState=():SelectionState=>({compareIds:[]});
export const selectRecommendation=(state:SelectionState,id:string):SelectionState=>({...state,selectedRecommendationId:id});
export const selectInsight=(state:SelectionState,id:string):SelectionState=>({...state,selectedInsightId:id});
export const toggleCompare=(state:SelectionState,id:string):SelectionState=>state.compareIds.includes(id)?{...state,compareIds:state.compareIds.filter(x=>x!==id)}:{...state,compareIds:[...state.compareIds,id].slice(-3)};
export const selectionSummary=(state:SelectionState,recs:Recommendation[],insights:Insight[])=>({recommendation:recs.find(r=>r.id===state.selectedRecommendationId),insight:insights.find(i=>i.id===state.selectedInsightId),compare:recs.filter(r=>state.compareIds.includes(r.id))});
