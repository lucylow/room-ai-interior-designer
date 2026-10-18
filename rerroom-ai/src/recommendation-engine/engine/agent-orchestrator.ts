import type {RoomContext,UserPreferences,Recommendation,Insight} from '../core/types';
import type {AgentResult} from '../agents/style-agent';
import {run as vision} from '../agents/vision-agent';import {run as spatial} from '../agents/spatial-agent';import {run as style} from '../agents/style-agent';
import {run as layout} from '../agents/layout-agent';import {run as lighting} from '../agents/lighting-agent';import {run as storage} from '../agents/storage-agent';
import {run as comfort} from '../agents/comfort-agent';import {run as accessibility} from '../agents/accessibility-agent';import {run as safety} from '../agents/safety-agent';
import {run as sustainability} from '../agents/sustainability-agent';import {run as maintenance} from '../agents/maintenance-agent';import {run as workflow} from '../agents/workflow-agent';
export interface AgentOrchestration {recommendations:Recommendation[];insights:Insight[];signals:AgentResult['signals'];notes:string[];confidence:number;}
export const runAgents=async(room:RoomContext,prefs:UserPreferences):Promise<AgentOrchestration>=>{
 const results=await Promise.all([vision(room,prefs),spatial(room,prefs),style(room,prefs),layout(room,prefs),lighting(room,prefs),storage(room,prefs),comfort(room,prefs),accessibility(room,prefs),safety(room,prefs),sustainability(room,prefs),maintenance(room,prefs),workflow(room,prefs)]);
 return {recommendations:results.flatMap(r=>r.recommendations),insights:results.flatMap(r=>r.insights),signals:results.flatMap(r=>r.signals),notes:results.flatMap(r=>r.notes),confidence:results.reduce((s,r)=>s+r.confidence,0)/results.length};
};
