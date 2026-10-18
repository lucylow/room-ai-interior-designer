import type {RoomContext,UserPreferences,Recommendation,Insight,Category} from '../core/types';
import type {SignalBundle} from '../engine/context';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
import * as rule from '../rules/style';
export interface AgentResult {agentId:string;recommendations:Recommendation[];insights:Insight[];signals:SignalBundle[];notes:string[];confidence:number;}
const id='critic-agent';
const category:Category='style';
export const run=async(room:RoomContext,prefs:UserPreferences):Promise<AgentResult>=>{
 const recommendations=rule.generateRecommendations(room,prefs);const insight=rule.generateInsight(room);
 const primaryMetric=Number(room['visualBalanceScore']);
 const signal:SignalBundle={name:'visualBalanceScore',value:primaryMetric,confidence:room.measurements.confidence,category,evidence:[makeEvidence('model','critic agent',primaryMetric.toFixed(2),room.measurements.confidence,id)]};
 const confidence=clamp(.55+room.measurements.confidence*.35);
 const adjusted=recommendations.map((r,i)=>({...r,score:clamp(r.score*(.94+i*.015)*(confidence/.85))}));
 return {agentId:id,recommendations:adjusted,insights:[insight],signals:[signal],notes:['Independent specialist signal; combine with other agents before applying actions.'],confidence};
};
