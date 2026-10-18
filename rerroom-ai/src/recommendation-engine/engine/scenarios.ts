import type {Scenario,RoomContext,Recommendation} from '../core/types';
import {simulate} from './simulation';
export interface ScenarioEvaluation {scenario:Scenario;valid:boolean;score:number;notes:string[];}
export const evaluateScenarios=(room:RoomContext,scenarios:Scenario[]):ScenarioEvaluation[]=>scenarios.map(s=>{const x=simulate(room,s);return {scenario:s,valid:x.valid,score:x.circulation+Math.max(0,.35-x.overlap),notes:x.notes};}).sort((a,b)=>Number(b.valid)-Number(a.valid)||b.score-a.score);
export const scenariosFromRecommendations=(items:Recommendation[]):Scenario[]=>items.slice(0,8).map(r=>({id:`scenario-${r.id}`,name:r.title,description:r.summary,deltas:r.actions.filter(a=>a.targetId).map(a=>({objectId:a.targetId,moveX:Number(a.payload.x??0),moveZ:Number(a.payload.z??0),rotate:Number(a.payload.rotation??0)})),expectedOutcome:r.summary}));
