
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp,stableSort} from '../../core/utils';
import {evaluatestyle_fit,cardstyle_fit} from '../insights/style_fit';
import {evaluatelayout_flow,cardlayout_flow} from '../insights/layout_flow';
import {evaluatedecision_readiness,carddecision_readiness} from '../insights/decision_readiness';
import {evaluatepalette_balance,cardpalette_balance} from '../insights/palette_balance';
import {evaluaterevision_risk} from '../insights/revision_risk';
import {evaluateprompt_coverage} from '../insights/prompt_coverage';

export function generateCreativeInsights(room:RoomContext,concept:DesignConcept):DesignInsight[]{
 const list=[evaluatestyle_fit(room,concept),evaluatelayout_flow(room,concept),evaluatedecision_readiness(room,concept),evaluatepalette_balance(room,concept),evaluaterevision_risk(room,concept),evaluateprompt_coverage(room,concept)];
 return stableSort(list,i=>i.confidence*(i.metric??.5));
}
export function insightCards(room:RoomContext,concept:DesignConcept):CreativeInsightCard[]{return [cardstyle_fit(room,concept),cardlayout_flow(room,concept),carddecision_readiness(room,concept),cardpalette_balance(room,concept)].sort((a,b)=>b.confidence-a.confidence);}
export function summarizeInsights(insights:DesignInsight[]):string{return insights.slice(0,4).map(i=>`${i.title}: ${i.summary}`).join(' ');}
export function insightHealth(insights:DesignInsight):number{return clamp(insights.confidence+(insights.metric??.5)*.25);}
