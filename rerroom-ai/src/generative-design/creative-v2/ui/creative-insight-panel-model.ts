
import type {DesignInsight} from '../../core/types';
export interface InsightPanelModel {title:string;items:Array<{title:string;summary:string;confidence:number;metric?:number;unit?:string}>;footer:string;}
export function buildInsightPanel(insights:DesignInsight[]):InsightPanelModel{return {title:'AI creative insights',items:insights.slice(0,6).map(i=>({title:i.title,summary:i.summary,confidence:i.confidence,metric:i.metric,unit:i.unit})),footer:'Use one refinement at a time so the concept remains attributable and reversible.'};}
